// app/actions/company.ts
'use server';

import { Prisma, PrismaClient } from '@prisma/client'
import { z } from 'zod';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// Validation schema
const CompanySchema = z.object({
    name: z.string()
      .min(2, 'Company name must be at least 2 characters')
      .max(100, 'Company name must be less than 100 characters'),
    headquarters: z.string()
      .min(2, 'Headquarters location must be at least 2 characters')
      .max(100, 'Headquarters location must be less than 100 characters'),
    industry: z.string()
      .min(2, 'Industry must be selected'),
    size: z.string()
      .min(1, 'Company size must be selected')
      .refine((val) => ['1-10', '10-100', '100-1,000', '1,000-10,000', '10,000+'].includes(val), {
        message: 'Please select a valid company size',
      }),
    website: z.string()
      .url('Please enter a valid URL')
      .max(200, 'Website URL must be less than 200 characters'),
    date_founded: z.string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Please enter a valid date',
      })
  });
  
type FormState = {
  message?: string | null;
  success?: boolean;
  companyId?: string;
  errors?: {
    name?: string[];
    headquarters?: string[];
    industry?: string[];
    size?: string[];
    website?: string[];
    date_founded?: string[];
    _form?: string[];
  };
};

export async function createCompany(prevState: FormState | null, formData: FormData): Promise<FormState> {
  try {
    console.log('Starting company creation process...');
    
    // Get account_id from cookies
    const cookieStore = cookies();
    const accountId = cookieStore.get('account_id')?.value;

    if (!accountId) {
      return {
        errors: {
          _form: ['Authentication required'],
        },
      };
    }

    // Safely get and convert form data
    const rawFormData = {
      name: formData.get('name')?.toString() || '',
      headquarters: formData.get('headquarters')?.toString() || '',
      industry: formData.get('industry')?.toString() || '',
      size: formData.get('size')?.toString() || '',
      website: formData.get('website')?.toString() || '',
      date_founded: formData.get('date_founded')?.toString() || '',
    };

    console.log('Raw form data:', rawFormData);

    // Validate form data
    const validatedFields = CompanySchema.parse(rawFormData);

    console.log('Form data validated, checking for existing company...');

    // Check if company already exists for this account
    const existingCompany = await prisma.company.findFirst({
      where: {
        account_id: accountId,
        name: validatedFields.name,
      },
    });

    if (existingCompany) {
      return {
        errors: {
          _form: ['A company with this name already exists in your account'],
        },
      };
    }

    console.log('Creating new company...');

    // Create new company
    const company = await prisma.company.create({
      data: {
        name: validatedFields.name,
        headquarters: validatedFields.headquarters,
        industry: validatedFields.industry,
        size: validatedFields.size, // Now safely converted to number by Zod
        website: validatedFields.website,
        date_founded: new Date(validatedFields.date_founded),
        account_id: accountId,
      },
    });

    console.log('Company created successfully:', company.id);

    return {
      success: true,
      companyId: company.id,
      message: 'Company created successfully!',
    };

  } catch (error) {
    console.error('Company creation error:', error);

    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string[]> = {};

      error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      });

      return {
        errors: fieldErrors as FormState['errors']
      };
    }

    return {
      errors: {
        _form: ['Something went wrong. Please try again.'],
      },
    };
  }
}
import { auth } from '@/auth';
import { Company } from '@prisma/client';

export type CompaniesTableResponse = {
  data: Pick<Company, 'id' | 'name' | 'industry' | 'headquarters'>[];
  metadata: {
    totalPages: number;
  };
};

export async function fetchCompanies(
  query: string = '',
  page: number = 1,
): Promise<CompaniesTableResponse> {
  try {
    // Get session for authentication
    const session = await auth();
    if (!session?.user) {
      throw new Error('Not authenticated');
    }

    // Get account_id from cookies
    const cookieStore = cookies();
    const account_id = cookieStore.get('account_id')?.value;

    if (!account_id) {
      throw new Error('No account found');
    }

    const ITEMS_PER_PAGE = 10;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    // Create properly typed where clause
    const where: Prisma.CompanyWhereInput = {
      account_id,
      OR: query ? [
        { name: { contains: query, mode: 'insensitive' } },
        { industry: { contains: query, mode: 'insensitive' } },
        { headquarters: { contains: query, mode: 'insensitive' } },
      ] : undefined,
    };

    // Fetch data and count in parallel
    const [companies, totalItems] = await Promise.all([
      prisma.company.findMany({
        where,
        select: {
          id: true,
          name: true,
          industry: true,
          headquarters: true,
        },
        orderBy: {
          name: 'asc',
        },
        take: ITEMS_PER_PAGE,
        skip: offset,
      }),
      prisma.company.count({ where })
    ]);

    return {
      data: companies,
      metadata: {
        totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
      },
    };
  } catch (error) {
    console.error('Error fetching companies:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch companies: ${error.message}`);
    }
    throw new Error('Failed to fetch companies.');
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchCompanyPages(
  query: string = '',
): Promise<number> {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error('Not authenticated');
    }

    const cookieStore = cookies();
    const account_id = cookieStore.get('account_id')?.value;

    if (!account_id) {
      throw new Error('No account found');
    }

    const ITEMS_PER_PAGE = 10;

    // Create properly typed where clause
    const where: Prisma.CompanyWhereInput = {
      account_id,
      OR: query ? [
        { name: { contains: query, mode: 'insensitive' } },
        { industry: { contains: query, mode: 'insensitive' } },
        { headquarters: { contains: query, mode: 'insensitive' } },
      ] : undefined,
    };

    const totalItems = await prisma.company.count({ where });
    
    return Math.ceil(totalItems / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Error fetching company pages:', error);
    throw new Error('Failed to fetch company pages.');
  }
}

// Add this to company.ts

type DeleteFormState = {
  message: string | null;
  success?: boolean;
  errors?: {
    _form?: string[];
  };
};

export async function deleteCompany(
  prevState: DeleteFormState,
  formData: FormData
): Promise<DeleteFormState> {
  try {
    const companyId = formData.get('companyId')?.toString();
    
    if (!companyId) {
      return {
        message: null,
        errors: {
          _form: ['Company ID is required'],
        },
      };
    }

    // Get account_id from cookies for security verification
    const cookieStore = cookies();
    const accountId = cookieStore.get('account_id')?.value;

    if (!accountId) {
      return {
        message: null,
        errors: {
          _form: ['Authentication required'],
        },
      };
    }

    // Verify the company belongs to the account before deletion
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        account_id: accountId,
      },
    });

    if (!company) {
      return {
        message: null,
        errors: {
          _form: ['Company not found or access denied'],
        },
      };
    }

    // Delete the company
    await prisma.company.delete({
      where: {
        id: companyId,
      },
    });

    return {
      message: 'Company deleted successfully',
      success: true
    };

  } catch (error) {
    console.error('Error deleting company:', error);
    return {
      message: null,
      errors: {
        _form: ['Failed to delete company'],
      },
    };
  }
}
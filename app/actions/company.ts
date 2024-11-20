// app/actions/company.ts
'use server';

import { PrismaClient } from '@prisma/client'
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
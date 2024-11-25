// app/actions/applicant.ts
'use server';

import { Applicant, Prisma, PrismaClient } from '@prisma/client'
import { z } from 'zod';
import { cookies } from 'next/headers';
import { auth } from '@/auth';

const prisma = new PrismaClient();

// Validation schema
const ApplicantSchema = z.object({
  first: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  last: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^[+]?[\d\s-()]+$/, 'Please enter a valid phone number'),
  rawResume: z.string()
    .min(10, 'Resume must be at least 10 characters'),
});

type FormState = {
  message?: string | null;
  success?: boolean;
  applicantId?: number;
  errors?: {
    first?: string[];
    last?: string[];
    email?: string[];
    phone?: string[];
    rawResume?: string[];
    _form?: string[];
  };
};

// Helper function to clean resume text
function processResume(rawResume: string): Prisma.InputJsonValue {
  // Remove excessive whitespace and normalize line endings
  const cleaned = rawResume
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Return as Prisma.InputJsonValue
  return {
    resume: cleaned
  } as const;
}

export async function createApplicant(prevState: FormState | null, formData: FormData): Promise<FormState> {
  try {
    const cookieStore = cookies();
    const accountId = cookieStore.get('account_id')?.value;

    if (!accountId) {
      return {
        errors: {
          _form: ['Authentication required'],
        },
      };
    }

    const rawFormData = {
      first: formData.get('first')?.toString() || '',
      last: formData.get('last')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      rawResume: formData.get('rawResume')?.toString() || '',
    };

    const validatedFields = ApplicantSchema.parse(rawFormData);

    const existingApplicant = await prisma.applicant.findUnique({
      where: {
        email: validatedFields.email,
      },
    });

    if (existingApplicant) {
      return {
        errors: {
          _form: ['An applicant with this email already exists'],
        },
      };
    }

    const applicant = await prisma.applicant.create({
      data: {
        first: validatedFields.first,
        last: validatedFields.last,
        email: validatedFields.email,
        phone: validatedFields.phone,
        metadata: processResume(validatedFields.rawResume),
        account_id: accountId,
      },
    });

    return {
      success: true,
      applicantId: applicant.id,
      message: 'Applicant profile created successfully!',
    };

  } catch (error) {
    console.error('Applicant creation error:', error);

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

export type ApplicantsTableResponse = {
  data: Array<Omit<Applicant, 'metadata'> & { metadata: Prisma.JsonValue }>;
  metadata: {
    totalPages: number;
  };
};

export async function fetchApplicants(
  query: string = '',
  page: number = 1,
): Promise<ApplicantsTableResponse> {
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
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const where: Prisma.ApplicantWhereInput = {
      account_id,
      OR: query ? [
        { first: { contains: query, mode: 'insensitive' } },
        { last: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
      ] : undefined,
    };

    const [applicants, totalItems] = await Promise.all([
      prisma.applicant.findMany({
        where,
        select: {
          id: true,
          first: true,
          last: true,
          email: true,
          phone: true,
          metadata: true,
          created_at: true,
          updated_at: true,
          account_id: true
        },
        orderBy: {
          last: 'asc',
        },
        take: ITEMS_PER_PAGE,
        skip: offset,
      }),
      prisma.applicant.count({ where })
    ]);

    return {
      data: applicants as Array<Omit<Applicant, 'metadata'> & { metadata: Prisma.JsonValue }>,
      metadata: {
        totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
      },
    };
  } catch (error) {
    console.error('Error fetching applicants:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch applicants: ${error.message}`);
    }
    throw new Error('Failed to fetch applicants.');
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchApplicantById(id: number): Promise<Applicant | null> {
  try {
    const cookieStore = cookies();
    const accountId = cookieStore.get('account_id')?.value;

    if (!accountId) {
      throw new Error('Authentication required');
    }

    const applicant = await prisma.applicant.findFirst({
      where: {
        id,
        account_id: accountId,
      },
    });

    return applicant;
  } catch (error) {
    console.error('Error fetching applicant:', error);
    return null;
  }
}

export async function fetchApplicantPages(
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
  
      const where: Prisma.ApplicantWhereInput = {
        account_id,
        OR: query ? [
          { first: { contains: query, mode: 'insensitive' } },
          { last: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ] : undefined,
      };
  
      const totalItems = await prisma.applicant.count({ where });
  
      return Math.ceil(totalItems / ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching applicant pages:', error);
      throw new Error('Failed to fetch applicant pages.');
    }
  }
  
export async function updateApplicant(
  id: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const cookieStore = cookies();
    const accountId = cookieStore.get('account_id')?.value;

    if (!accountId) {
      return {
        errors: {
          _form: ['Authentication required'],
        },
      };
    }

    const rawFormData = {
      first: formData.get('first')?.toString() || '',
      last: formData.get('last')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      rawResume: formData.get('rawResume')?.toString() || '',
    };

    const validatedFields = ApplicantSchema.parse(rawFormData);

    const existingApplicant = await prisma.applicant.findFirst({
      where: {
        id,
        account_id: accountId,
      },
    });

    if (!existingApplicant) {
      return {
        errors: {
          _form: ['Applicant not found or access denied'],
        },
      };
    }

    // Check if email is being changed and if it's already in use
    if (existingApplicant.email !== validatedFields.email) {
      const emailExists = await prisma.applicant.findUnique({
        where: {
          email: validatedFields.email,
        },
      });

      if (emailExists) {
        return {
          errors: {
            email: ['This email is already in use'],
          },
        };
      }
    }

    await prisma.applicant.update({
      where: { id },
      data: {
        first: validatedFields.first,
        last: validatedFields.last,
        email: validatedFields.email,
        phone: validatedFields.phone,
        metadata: processResume(validatedFields.rawResume),
        updated_at: new Date(),
      },
    });

    return {
      success: true,
      message: 'Applicant updated successfully!',
    };

  } catch (error) {
    console.error('Applicant update error:', error);

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

type DeleteFormState = {
  message: string | null;
  success?: boolean;
  errors?: {
    _form?: string[];
  };
};

export async function deleteApplicant(
  prevState: DeleteFormState,
  formData: FormData
): Promise<DeleteFormState> {
  try {
    const applicantId = formData.get('applicantId')?.toString();

    if (!applicantId) {
      return {
        message: null,
        errors: {
          _form: ['Applicant ID is required'],
        },
      };
    }

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

    const applicant = await prisma.applicant.findFirst({
      where: {
        id: parseInt(applicantId),
        account_id: accountId,
      },
    });

    if (!applicant) {
      return {
        message: null,
        errors: {
          _form: ['Applicant not found or access denied'],
        },
      };
    }

    await prisma.applicant.delete({
      where: {
        id: parseInt(applicantId),
      },
    });

    return {
      message: 'Applicant deleted successfully',
      success: true
    };

  } catch (error) {
    console.error('Error deleting applicant:', error);
    return {
      message: null,
      errors: {
        _form: ['Failed to delete applicant'],
      },
    };
  }
}
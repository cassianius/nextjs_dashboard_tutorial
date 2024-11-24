// app/actions/job-posting.ts
'use server';

import { Job, Prisma, PrismaClient } from '@prisma/client'
import { z } from 'zod';
import { cookies } from 'next/headers';
import { auth } from '@/auth';

const prisma = new PrismaClient();

// Validation schema
const JobPostingSchema = z.object({
  position: z.string()
    .min(2, 'Position must be at least 2 characters')
    .max(100, 'Position must be less than 100 characters'),
  role: z.string()
    .min(2, 'Role must be at least 2 characters')
    .max(100, 'Role must be less than 100 characters'),
  type: z.string()
    .min(2, 'Job type must be selected')
    .refine((val) => ['full-time', 'part-time', 'contract', 'temporary', 'internship'].includes(val), {
      message: 'Please select a valid job type',
    }),
  rawDescription: z.string()
    .min(10, 'Job description must be at least 10 characters'),
});

type FormState = {
  message?: string | null;
  success?: boolean;
  jobId?: number;
  errors?: {
    position?: string[];
    role?: string[];
    type?: string[];
    rawDescription?: string[];
    _form?: string[];
  };
};

// Helper function to clean description text
function processJobDescription(rawDescription: string): Prisma.InputJsonValue {
    // Remove excessive whitespace and normalize line endings
    const cleaned = rawDescription
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  
    // Return as Prisma.InputJsonValue
    return {
      description: cleaned
    } as const;
  }

export async function createJob(prevState: FormState | null, formData: FormData): Promise<FormState> {
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
      position: formData.get('position')?.toString() || '',
      role: formData.get('role')?.toString() || '',
      type: formData.get('type')?.toString() || '',
      rawDescription: formData.get('rawDescription')?.toString() || '',
    };

    const validatedFields = JobPostingSchema.parse(rawFormData);

    const existingJob = await prisma.job.findFirst({
      where: {
        account_id: accountId,
        position: validatedFields.position,
        role: validatedFields.role,
        type: validatedFields.type,
      },
    });

    if (existingJob) {
      return {
        errors: {
          _form: ['A similar job posting already exists in your account'],
        },
      };
    }

    const job = await prisma.job.create({
        data: {
          position: validatedFields.position,
          role: validatedFields.role,
          type: validatedFields.type,
          metadata: processJobDescription(validatedFields.rawDescription),
          account_id: accountId,
        },
      });

    return {
      success: true,
      jobId: job.id,
      message: 'Job posting created successfully!',
    };

  } catch (error) {
    console.error('Job creation error:', error);

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

export type JobsTableResponse = {
    data: Array<Omit<Job, 'metadata'> & { metadata: Prisma.JsonValue }>;
    metadata: {
      totalPages: number;
    };
  };
  
  
  export async function fetchJobs(
    query: string = '',
    page: number = 1,
  ): Promise<JobsTableResponse> {
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
      const where: Prisma.JobWhereInput = {
        account_id,
        OR: query ? [
          { position: { contains: query, mode: 'insensitive' } },
          { role: { contains: query, mode: 'insensitive' } },
          { type: { contains: query, mode: 'insensitive' } },
        ] : undefined,
      };
  
      // Fetch data and count in parallel
      const [jobs, totalItems] = await Promise.all([
        prisma.job.findMany({
          where,
          select: {
            id: true,
            position: true,
            role: true,
            type: true,
            metadata: true,
            created_at: true,
            updated_at: true,
            account_id: true
          },
          orderBy: {
            position: 'asc',
          },
          take: ITEMS_PER_PAGE,
          skip: offset,
        }),
        prisma.job.count({ where })
      ]);
  
      return {
        data: jobs as Array<Omit<Job, 'metadata'> & { metadata: Prisma.JsonValue }>,
        metadata: {
          totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
        },
      };
    } catch (error) {
      console.error('Error fetching jobs:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch jobs: ${error.message}`);
      }
      throw new Error('Failed to fetch jobs.');
    } finally {
      await prisma.$disconnect();
    }
  }

 export async function fetchJobPages(
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
    const where: Prisma.JobWhereInput = {
      account_id,
      OR: query ? [
        { position: { contains: query, mode: 'insensitive' } },
        { role: { contains: query, mode: 'insensitive' } },
        { type: { contains: query, mode: 'insensitive' } },
      ] : undefined,
    };

    const totalItems = await prisma.job.count({ where });

    return Math.ceil(totalItems / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Error fetching job pages:', error);
    throw new Error('Failed to fetch job pages.');
  }
}


export async function fetchJobById(id: number): Promise<Job | null> {
  try {
    const cookieStore = cookies();
    const accountId = cookieStore.get('account_id')?.value;

    if (!accountId) {
      throw new Error('Authentication required');
    }

    const job = await prisma.job.findFirst({
      where: {
        id,
        account_id: accountId,
      },
    });

    return job;
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

export async function updateJob(
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
      position: formData.get('position')?.toString() || '',
      role: formData.get('role')?.toString() || '',
      type: formData.get('type')?.toString() || '',
      rawDescription: formData.get('rawDescription')?.toString() || '',
    };

    const validatedFields = JobPostingSchema.parse(rawFormData);

    const existingJob = await prisma.job.findFirst({
      where: {
        id,
        account_id: accountId,
      },
    });

    if (!existingJob) {
      return {
        errors: {
          _form: ['Job not found or access denied'],
        },
      };
    }

    await prisma.job.update({
        where: { id },
        data: {
          position: validatedFields.position,
          role: validatedFields.role,
          type: validatedFields.type,
          metadata: processJobDescription(validatedFields.rawDescription),
          updated_at: new Date(),
        },
      });

    return {
      success: true,
      message: 'Job updated successfully!',
    };

  } catch (error) {
    console.error('Job update error:', error);

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

export async function deleteJob(
  prevState: DeleteFormState,
  formData: FormData
): Promise<DeleteFormState> {
  try {
    const jobId = formData.get('jobId')?.toString();

    if (!jobId) {
      return {
        message: null,
        errors: {
          _form: ['Job ID is required'],
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

    const job = await prisma.job.findFirst({
      where: {
        id: parseInt(jobId),
        account_id: accountId,
      },
    });

    if (!job) {
      return {
        message: null,
        errors: {
          _form: ['Job not found or access denied'],
        },
      };
    }

    await prisma.job.delete({
      where: {
        id: parseInt(jobId),
      },
    });

    return {
      message: 'Job deleted successfully',
      success: true
    };

  } catch (error) {
    console.error('Error deleting job:', error);
    return {
      message: null,
      errors: {
        _form: ['Failed to delete job'],
      },
    };
  }
}
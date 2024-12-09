'use server';

import { Prisma, PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function createApplicant(formData: any) {
  try {
    const cookieStore = cookies();
    const account_id = cookieStore.get('account_id')?.value;

    if (!account_id) {
      throw new Error('No account ID found. Please log in again.');
    }

    // First verify the interview exists and belongs to this account
    const interview = await prisma.interview.findFirst({
      where: {
        id: formData.interview_id,
        account_id: account_id,
      },
    });

    if (!interview) {
      throw new Error('Interview not found or access denied.');
    }

    // Create the applicant
    const applicant = await prisma.applicant.create({
      data: {
        interview_id: formData.interview_id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        resume: formData.resume,
      },
    });

    return {
      id: applicant.id,
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
    };

  } catch (error) {
    console.error('Error creating applicant:', error);
    throw error;
  }
}

export interface SearchApplicantResult {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export async function searchApplicants(query: string): Promise<SearchApplicantResult[]> {
  try {
    const cookieStore = cookies();
    const account_id = cookieStore.get('account_id')?.value;

    if (!account_id) {
      throw new Error('No account ID found');
    }

    const applicants = await prisma.applicant.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { phone: { contains: query, mode: 'insensitive' } },
            ],
          },
          {
            interview: {
              account_id: account_id
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
      orderBy: {
        name: 'asc'
      },
      take: 10 // Limit results for performance
    });

    return applicants;
  } catch (error) {
    console.error('Error searching applicants:', error);
    throw error;
  }
}

export interface ApplicantListItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  session_count: number;
}

export interface PaginatedApplicants {
  applicants: ApplicantListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export async function fetchApplicantsByInterview(
  interviewId: number,
  searchParams: { [key: string]: string | string[] | undefined }
): Promise<PaginatedApplicants> {
  try {
    const cookieStore = cookies();
    const account_id = cookieStore.get('account_id')?.value;

    if (!account_id) {
      throw new Error('No account ID found. Please log in again.');
    }

    const search = (searchParams.q || '') as string;
    const page = parseInt(searchParams.page as string || '1');
    const pageSize = parseInt(searchParams.pageSize as string || '10');

    // Calculate pagination
    const skip = (page - 1) * pageSize;

    // Build the where clause
    const where: Prisma.ApplicantWhereInput = {
      interview_id: interviewId,
      interview: {
        account_id
      },
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    // Get total count
    const total = await prisma.applicant.count({ where });

    // Fetch applicants with session counts
    const applicants = await prisma.applicant.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        interview: {
          select: {
            sessions: {
              where: {
                completed: true
              }
            }
          }
        }
      },
      orderBy: [
        { created_at: 'desc' }
      ],
      skip,
      take: pageSize,
    });

    const formattedApplicants: ApplicantListItem[] = applicants.map(applicant => ({
      id: applicant.id,
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
      session_count: applicant.interview.sessions.length
    }));

    return {
      applicants: formattedApplicants,
      total,
      page,
      pageSize
    };
  } catch (error) {
    console.error('Error fetching applicants:', error);
    throw error;
  }
}
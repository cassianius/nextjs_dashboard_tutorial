'use server';

import { PrismaClient } from '@prisma/client';
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
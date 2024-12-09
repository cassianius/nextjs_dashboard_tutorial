'use server';

import { Prisma, PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function createInterview(formData: any) {
  try {
    const cookieStore = cookies();
    const account_id = cookieStore.get('account_id')?.value;

    if (!account_id) {
      throw new Error('No account ID found. Please log in again.');
    }

    // Create the interview
    const interview = await prisma.interview.create({
      data: {
        account_id,
        company_name: formData.company_name,
        company_description: formData.company_description,
        job_name: formData.job_name,
        job_description: formData.job_description,
        focus_areas: formData.focus_areas,
        max_duration: formData.max_duration,
        interviewer_style: formData.interviewer_style,
        status: 'Active',
      },
    });

    // Return exactly what the context expects
    return {
      interview: {
        id: interview.id,
        company_name: interview.company_name,
        job_name: interview.job_name,
        max_duration: interview.max_duration,
        account_id: interview.account_id,
      }
    };

  } catch (error) {
    console.error('Error creating interview:', error);
    throw error;
  }
}

// Types for the response
export interface InterviewListItem {
  id: number;
  company_name: string;
  job_name: string;
  session_count: number;
  applicant_count: number;
  status: string;
  created_at: Date;
}

export interface PaginatedInterviews {
  interviews: InterviewListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export async function getInterviews(
  searchParams: { [key: string]: string | string[] | undefined }
): Promise<PaginatedInterviews> {
  try {
    const cookieStore = cookies();
    const account_id = cookieStore.get('account_id')?.value;

    if (!account_id) {
      throw new Error('No account ID found. Please log in again.');
    }

    // Extract search parameters
    const search = (searchParams.q || '') as string;
    const page = parseInt(searchParams.page as string || '1');
    const pageSize = parseInt(searchParams.pageSize as string || '10');
    const status = (searchParams.status || 'Active') as string;

    // Calculate pagination
    const skip = (page - 1) * pageSize;

    // Build the where clause with proper Prisma typing
    const where: Prisma.InterviewWhereInput = {
      account_id,
      ...(status !== 'All' && { status }),
      ...(search && {
        OR: [
          { company_name: { contains: search, mode: 'insensitive' } },
          { job_name: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    // Get total count for pagination
    const total = await prisma.interview.count({ where });

    // Fetch interviews with session and applicant counts
    const interviews = await prisma.interview.findMany({
      where,
      select: {
        id: true,
        company_name: true,
        job_name: true,
        status: true,
        created_at: true,
        _count: {
          select: {
            sessions: true,
            applicants: true
          }
        }
      },
      orderBy: [
        { created_at: 'desc' }
      ],
      skip,
      take: pageSize,
    });

    // Format the response
    const formattedInterviews: InterviewListItem[] = interviews.map(interview => ({
      id: interview.id,
      company_name: interview.company_name,
      job_name: interview.job_name,
      session_count: interview._count.sessions,
      applicant_count: interview._count.applicants,
      status: interview.status,
      created_at: interview.created_at
    }));

    return {
      interviews: formattedInterviews,
      total,
      page,
      pageSize
    };

  } catch (error) {
    console.error('Error fetching interviews:', error);
    throw error;
  }
}

export interface InterviewDetail {
  company_name: string;
  job_name: string;
  focus_areas: string[];
  max_duration: number;
  interviewer_style: string;
}

export async function fetchInterviewById(id: number): Promise<InterviewDetail> {
  try {
    const cookieStore = cookies();
    const account_id = cookieStore.get('account_id')?.value;

    if (!account_id) {
      throw new Error('No account ID found. Please log in again.');
    }

    const interview = await prisma.interview.findFirst({
      where: {
        id,
        account_id,
      },
      select: {
        company_name: true,
        job_name: true,
        focus_areas: true,
        max_duration: true,
        interviewer_style: true,
      },
    });

    if (!interview) {
      throw new Error('Interview not found');
    }

    return interview;
  } catch (error) {
    console.error('Error fetching interview:', error);
    throw error;
  }
}
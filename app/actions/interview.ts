'use server';

import { PrismaClient } from '@prisma/client';
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
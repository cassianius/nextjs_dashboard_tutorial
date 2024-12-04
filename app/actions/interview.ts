'use server';

import { PrismaClient } from '@prisma/client';
import { addDays } from 'date-fns';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// Helper to generate random codes
const generateAccessCode = () => {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from(
    { length: 6 },
    () => characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
};

const generatePin = () => {
  return Array.from(
    { length: 6 },
    () => Math.floor(Math.random() * 10).toString()
  ).join('');
};

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
        applicant_name: formData.applicant_name,
        applicant_email: formData.applicant_email,
        applicant_phone: formData.applicant_phone,
        applicant_resume: formData.applicant_resume,
        focus_areas: formData.focus_areas,
        max_duration: formData.max_duration,
        interviewer_style: formData.interviewer_style,
        status: 'Active',
      },
    });

    // Create the session access
    const accessCode = generateAccessCode();
    const pin = generatePin();

    const sessionAccess = await prisma.sessionAccess.create({
      data: {
        interview_id: interview.id,
        account_id,
        access_code: accessCode,
        pin: pin,
        expiration: addDays(new Date(), formData.sessionSettings.expirationDays),
      },
    });

    return {
      interview: {
        id: interview.id,
        company_name: interview.company_name,
        job_name: interview.job_name,
        applicant_name: interview.applicant_name,
        max_duration: interview.max_duration,
      },
      sessionAccess: {
        access_code: sessionAccess.access_code,
        pin: sessionAccess.pin,
        expiration: sessionAccess.expiration,
      }
    };

  } catch (error) {
    console.error('Error creating interview:', error);
    throw error;
  }
}
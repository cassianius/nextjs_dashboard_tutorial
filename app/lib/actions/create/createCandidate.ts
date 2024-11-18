'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Candidate, Interview } from '@/app/lib/definitions';

const CandidateSchema = z.object({
  first: z.string().min(1, 'First name is required'),
  last: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  access_code: z.string().min(1, 'Access code is required')
});

type CandidateRow = {
  id: number;
  company_id: string;
  first: string;
  last: string;
  email: string;
  phone: string;
  image_url: string;
};

export async function createCandidate(
  formData: FormData,
): Promise<{ 
  success?: boolean;
  error?: string;
  candidate?: Candidate;
}> {
  try {
    // 1. Validate form data
    const validatedFields = CandidateSchema.parse({
      first: formData.get('first'),
      last: formData.get('last'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      access_code: formData.get('access_code')
    });

    // 2. First, verify the interview exists and is published
    const { rows: interviewRows } = await sql`
      SELECT id, company_id, candidate_ids, status
      FROM interviews
      WHERE access_code_signup = ${validatedFields.access_code}
      AND status = 'published'
      LIMIT 1
    `;

    if (interviewRows.length === 0) {
      return {
        error: 'Invalid access code or interview is not available.'
      };
    }

    const interview = interviewRows[0];

    // 3. Check if candidate already exists for this company
    const { rows: existingCandidates } = await sql<CandidateRow>`
      SELECT id, company_id, first, last, email, phone, image_url
      FROM candidates
      WHERE email = ${validatedFields.email}
      AND company_id = ${interview.company_id}
      LIMIT 1
    `;

    let candidate: Candidate;

    if (existingCandidates.length > 0) {
      // Candidate exists
      candidate = existingCandidates[0];
    } else {
      // Create new candidate
      const { rows } = await sql<CandidateRow>`
        INSERT INTO candidates (
          company_id,
          first,
          last,
          email,
          phone,
          image_url
        ) VALUES (
          ${interview.company_id},
          ${validatedFields.first},
          ${validatedFields.last},
          ${validatedFields.email},
          ${validatedFields.phone},
          ''
        )
        RETURNING id, company_id, first, last, email, phone, image_url
      `;
      candidate = rows[0];
    }

    // 4. Check if candidate is already registered for this interview
    const candidateIds = interview.candidate_ids || [];
    if (!candidateIds.includes(candidate.id)) {
      // Add candidate to the interview
      await sql`
        UPDATE interviews
        SET candidate_ids = array_append(candidate_ids, ${candidate.id})
        WHERE id = ${interview.id}
      `;
    }

    revalidatePath('/registration');
    return {
      success: true,
      candidate
    };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.errors[0].message
      };
    }

    console.error('Error creating candidate:', error);
    return {
      error: 'Failed to register candidate. Please try again.'
    };
  }
}
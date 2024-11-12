'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Participant, Interview } from '@/app/lib/definitions';

const ParticipantSchema = z.object({
  first: z.string().min(1, 'First name is required'),
  last: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  access_code: z.string().min(1, 'Access code is required')
});

type ParticipantRow = {
  id: number;
  company_id: string;
  first: string;
  last: string;
  email: string;
  phone: string;
  image_url: string;
};

export async function createParticipant(
  formData: FormData,
): Promise<{ 
  success?: boolean;
  error?: string;
  participant?: Participant;
}> {
  try {
    // 1. Validate form data
    const validatedFields = ParticipantSchema.parse({
      first: formData.get('first'),
      last: formData.get('last'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      access_code: formData.get('access_code')
    });

    // 2. First, verify the interview exists and is published
    const { rows: interviewRows } = await sql`
      SELECT id, company_id, participant_ids, status
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

    // 3. Check if participant already exists for this company
    const { rows: existingParticipants } = await sql<ParticipantRow>`
      SELECT id, company_id, first, last, email, phone, image_url
      FROM participants
      WHERE email = ${validatedFields.email}
      AND company_id = ${interview.company_id}
      LIMIT 1
    `;

    let participant: Participant;

    if (existingParticipants.length > 0) {
      // Participant exists
      participant = existingParticipants[0];
    } else {
      // Create new participant
      const { rows } = await sql<ParticipantRow>`
        INSERT INTO participants (
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
      participant = rows[0];
    }

    // 4. Check if participant is already registered for this interview
    const participantIds = interview.participant_ids || [];
    if (!participantIds.includes(participant.id)) {
      // Add participant to the interview
      await sql`
        UPDATE interviews
        SET participant_ids = array_append(participant_ids, ${participant.id})
        WHERE id = ${interview.id}
      `;
    }

    revalidatePath('/registration');
    return {
      success: true,
      participant
    };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: error.errors[0].message
      };
    }

    console.error('Error creating participant:', error);
    return {
      error: 'Failed to register participant. Please try again.'
    };
  }
}
// app/actions.ts
'use server'
import { sql } from '@vercel/postgres';
import { getCompanyId } from '@/auth';
import { FormattedInterviewsTable, FormattedParticipantsTable } from '@/app/lib/definitions';
import { signIn } from '@/auth';
import { Interview } from '@/app/lib/definitions';
import { revalidatePath } from 'next/cache';

const ITEMS_PER_PAGE = 10;

// Fetch interviews
export async function fetchInterviews(
  query: string = '',
  currentPage: number = 1,
): Promise<FormattedInterviewsTable[]> {
  try {
    const company_id = await getCompanyId();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const { rows } = await sql<FormattedInterviewsTable>`
      SELECT 
        id,
        company_id,
        TO_CHAR(date, 'MM-DD-YYYY') as date,
        topic,
        industry,
        status,
        invite_code
      FROM interviews 
      WHERE company_id = ${company_id}
      AND (
        topic ILIKE ${`%${query}%`} OR 
        industry ILIKE ${`%${query}%`} OR 
        status ILIKE ${`%${query}%`} OR
        invite_code ILIKE ${`%${query}%`}
      )
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;

    return rows;
  } catch (error) {
    console.error('Error fetching interviews:', error);
    throw new Error('Failed to fetch interviews.');
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}


// Get total pages for interviews
export async function fetchInterviewPages(query: string = ''): Promise<number> {
  try {
    const company_id = await getCompanyId();
    
    const { rows } = await sql`
      SELECT COUNT(*)::integer
      FROM interviews
      WHERE company_id = ${company_id}
      AND (
        topic ILIKE ${`%${query}%`} OR 
        status ILIKE ${`%${query}%`} OR
        invite_code ILIKE ${`%${query}%`}
      )
    `;

    const totalPages = Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Error fetching interview pages:', error);
    throw new Error('Failed to fetch total pages.');
  }
}

// Fetch participants
export async function fetchParticipants(
  query: string = '',
  currentPage: number = 1,
): Promise<FormattedParticipantsTable[]> {
  try {
    const company_id = await getCompanyId();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const { rows } = await sql<FormattedParticipantsTable>`
      SELECT 
        id,
        company_id,
        first,
        last,
        email,
        phone
      FROM participants 
      WHERE company_id = ${company_id}
      AND (
        first ILIKE ${`%${query}%`} OR 
        last ILIKE ${`%${query}%`} OR 
        email ILIKE ${`%${query}%`} OR
        phone ILIKE ${`%${query}%`}
      )
      ORDER BY last, first
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;

    return rows;
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw new Error('Failed to fetch participants.');
  }
}

// Get total pages for participants
// export async function fetchParticipantPages(query: string = ''): Promise<number> {
//   try {
//     const company_id = await getCompanyId();
    
//     const { rows } = await sql`
//       SELECT COUNT(*)::integer
//       FROM participants
//       WHERE company_id = ${company_id}
//       AND (
//         first ILIKE ${`%${query}%`} OR 
//         last ILIKE ${`%${query}%`} OR 
//         email ILIKE ${`%${query}%`} OR
//         phone ILIKE ${`%${query}%`}
//       )
//     `;

//     const totalPages = Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Error fetching participant pages:', error);
//     throw new Error('Failed to fetch total pages.');
//   }
// }



export async function createInterview(
  formData: FormData,
  action: 'draft' | 'publish'
): Promise<{ error?: string }> {
  try {
    const company_id = await getCompanyId();
    const date = new Date().toISOString();
    
    // Extract and validate form data
    const topic = formData.get('topic') as string;
    const company = formData.get('company') as string;
    const industry = formData.get('industry') as string;
    const other_industry = formData.get('other_industry') as string;
    const duration = parseInt(formData.get('duration') as string);
    const max_participants = parseInt(formData.get('max_participants') as string);
    const interview_style = formData.get('interview_style') as string;
    const response_depth = formData.get('response_depth') as string;
    const bias_mitigation_level = formData.get('bias_mitigation') as string;
    const allow_tangents = formData.get('allow_tangents') === 'on';
    
    // Get questions and outcomes arrays from form data and format for PostgreSQL
    const questionsJSON = formData.get('questions') as string;
    const probingQuestionsJSON = formData.get('probing_questions') as string || '[]'; // Default to empty array
    const outcomesJSON = formData.get('outcomes') as string;
    
    const key_questions = JSON.parse(questionsJSON);
    const probing_questions = JSON.parse(probingQuestionsJSON);
    const desired_outcomes = JSON.parse(outcomesJSON);
    
    // Format arrays for PostgreSQL ARRAY type
    const questionsArray = `{${key_questions.map((q: string) => `"${q.replace(/"/g, '\\"')}"`).join(',')}}`;
    const probingQuestionsArray = `{${probing_questions.map((q: string) => `"${q.replace(/"/g, '\\"')}"`).join(',')}}`;
    const outcomesArray = `{${desired_outcomes.map((o: string) => `"${o.replace(/"/g, '\\"')}"`).join(',')}}`;
    const emptyArray = '{}';
    
    // Generate a unique invite code
    const invite_code = Array.from({length: 6}, () => Math.floor(Math.random() * 10)).join('');
    
    // Insert the interview into the database
    const { rows } = await sql`
      INSERT INTO interviews (
        company_id,
        date,
        topic,
        company,
        industry,
        duration,
        max_participants,
        interviewer_style,
        response_depth,
        bias_migitation_level,
        key_questions,
        probing_questions,
        desired_outcomes,
        allow_tangents,
        participant_ids,
        status,
        invite_code
      ) VALUES (
        ${company_id},
        ${date},
        ${topic},
        ${company},
        ${industry === 'other' ? other_industry : industry},
        ${duration},
        ${max_participants},
        ${interview_style},
        ${response_depth},
        ${bias_mitigation_level},
        ${questionsArray}::text[],
        ${probingQuestionsArray}::text[],
        ${outcomesArray}::text[],
        ${allow_tangents},
        ${emptyArray}::text[],
        ${action},
        ${invite_code}
      )
      RETURNING id
    `;

    revalidatePath('/interviews');
    return { error: undefined };
  } catch (error) {
    console.error('Error creating interview:', error);
    return { error: 'Failed to create interview.' };
  }
}
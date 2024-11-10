// app/actions.ts
'use server'
import { sql } from '@vercel/postgres';
import { getCompanyId } from '@/auth';
import { FormattedInterviewsTable, FormattedParticipantsTable } from '@/app/lib/definitions';
import { signIn } from '@/auth';

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
        date,
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
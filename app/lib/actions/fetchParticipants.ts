'use server'
import { sql } from '@vercel/postgres';
import { getCompanyId } from '@/auth';
import { FormattedParticipantsTable } from '@/app/lib/definitions';

const ITEMS_PER_PAGE = 10;

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






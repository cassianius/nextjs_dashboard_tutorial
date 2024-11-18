// app/actions.ts
'use server'
import { sql } from '@vercel/postgres';
import { getCompanyId } from '@/auth';
import { FormattedInterviewsTable, FormattedApplicantsTable } from '@/app/lib/definitions';

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
        access_code_signup
      FROM interviews 
      WHERE company_id = ${company_id}
      AND (
        topic ILIKE ${`%${query}%`} OR 
        industry ILIKE ${`%${query}%`} OR 
        status ILIKE ${`%${query}%`} OR
        access_code_signup ILIKE ${`%${query}%`}
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
          access_code_signup ILIKE ${`%${query}%`}
        )
      `;
  
      const totalPages = Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Error fetching interview pages:', error);
      throw new Error('Failed to fetch total pages.');
    }
  }
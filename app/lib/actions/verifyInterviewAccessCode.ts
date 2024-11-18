'use server'

import { sql } from '@vercel/postgres';
import { Interview } from '@/app/lib/definitions';

export async function verifyInterviewAccessCode(
    companyId: string,
    interviewId: string,
    accessCode: string
  ): Promise<{
    isValid: boolean;
    interview?: Interview;
    error?: string;
  }> {
    try {
      const { rows } = await sql`
        /* NO CACHE */
        SELECT 
          id,
          company_id,
          date,
          topic,
          company,
          industry,
          duration,
          max_applicants,
          interviewer_style,
          response_depth,
          bias_migitation_level,
          key_questions,
          probing_questions,
          desired_outcomes,
          allow_tangents,
          applicant_ids,
          status,
          access_code_signup,
          access_code_interview
        FROM interviews 
        WHERE company_id = ${companyId}
        AND id = ${interviewId}::integer
        AND access_code_signup = ${accessCode}
        AND status = 'publish'
        AND max_applicants > array_length(applicant_ids, 1)
        LIMIT 1
      `;
  
      if (rows.length === 0) {
        return { 
          isValid: false, 
          error: 'Invalid access code or interview is no longer available.' 
        };
      }
  
      const interviewData: Interview = {
        id: rows[0].id,
        company_id: rows[0].company_id,
        date: rows[0].date,
        topic: rows[0].topic,
        company: rows[0].company,
        industry: rows[0].industry,
        duration: rows[0].duration,
        max_applicants: rows[0].max_applicants,
        interviewer_style: rows[0].interviewer_style,
        response_depth: rows[0].response_depth,
        bias_migitation_level: rows[0].bias_migitation_level,
        key_questions: rows[0].key_questions || [],
        probing_questions: rows[0].probing_questions || [],
        desired_outcomes: rows[0].desired_outcomes || [],
        allow_tangents: rows[0].allow_tangents,
        applicant_ids: rows[0].applicant_ids || [],
        status: rows[0].status,
        access_code_signup: rows[0].access_code_signup,
        access_code_interview: rows[0].access_code_interview
      };
  
      return { 
        isValid: true, 
        interview: interviewData 
      };
  
    } catch (error) {
      console.error('Error verifying access code:', error);
      return { 
        isValid: false, 
        error: 'Failed to verify access code.' 
      };
    }
  }

'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Applicant, Interview } from '@/app/lib/definitions';
import { getCompanyId } from '@/auth';

export async function createInterview(
    formData: FormData,
    action: 'draft' | 'published'
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
      const max_applicants = parseInt(formData.get('max_applicants') as string);
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
      const access_code_interview = Array.from({length: 6}, () => Math.floor(Math.random() * 10)).join('');
      const access_code_signup = Array.from({length: 6}, () => {
        // Characters to choose from (numbers and uppercase letters)
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }).join('');
      // Insert the interview into the database
      const { rows } = await sql`
        INSERT INTO interviews (
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
          access_code_interview,
        ) VALUES (
          ${company_id},
          ${date},
          ${topic},
          ${company},
          ${industry === 'other' ? other_industry : industry},
          ${duration},
          ${max_applicants},
          ${interview_style},
          ${response_depth},
          ${bias_mitigation_level},
          ${questionsArray}::text[],
          ${probingQuestionsArray}::text[],
          ${outcomesArray}::text[],
          ${allow_tangents},
          ${emptyArray}::text[],
          ${action},
          ${access_code_signup},
          ${access_code_interview}
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
  
  // Use no-store fetch option
  const fetchOptions = {
    cache: 'no-store' as RequestCache,
    next: { revalidate: 0 }
  };
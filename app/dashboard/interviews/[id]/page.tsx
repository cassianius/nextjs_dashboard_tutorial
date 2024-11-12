import { fetchInterviewById } from '../../../lib/actions/fetchInterviewById';
import { getCompanyId } from '@/auth';
import InterviewDetails from './interview-details';
import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';

// Disable all caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InterviewPage({
  params,
}: {
  params: { id: string };
}) {
  // Ensure headers are read to enforce dynamic rendering
  headers();

  const companyId = await getCompanyId();

  if (!companyId) {
    redirect('/login');
  }

  const { data: interview, error } = await fetchInterviewById(companyId, params.id);

  if (error || !interview) {
    notFound();
  }

  return (
    <InterviewDetails
      interview={interview}/>
  );
}


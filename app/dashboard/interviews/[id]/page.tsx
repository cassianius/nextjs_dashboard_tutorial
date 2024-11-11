
import { fetchInterviewById } from '../../../lib/actions';
import { getCompanyId } from '@/auth';
import InterviewDetails from './interview-details';
import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';

// Disable all caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Add cache-control headers
export async function generateMetadata() {
  return {
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  };
}

export default async function InterviewPage({
  params
}: {
  params: { id: string }
}) {
  // Force dynamic behavior by reading headers
  headers();
  
  const companyId = await getCompanyId();
  
  if (!companyId) {
    redirect('/login');
  }

  const { data: interview, error } = await fetchInterviewById(companyId, params.id);

  if (error || !interview) {
    notFound();
  }

  return <InterviewDetails interview={interview} />;
}
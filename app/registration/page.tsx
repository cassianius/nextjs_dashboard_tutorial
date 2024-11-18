// app/registration/page.tsx
import { notFound } from 'next/navigation';
import AcmeLogo from '@/app/ui/acme-logo';
import registrationForm from '@/app/ui/registration/registration-form';
import { fetchInterviewById } from '../lib/actions/fetch/fetchInterviewById';
import { Metadata } from 'next';
import RegistrationForm from '@/app/ui/registration/registration-form';

export const metadata: Metadata = {
  title: 'Sign Up - Interview Platform',
  description: 'Create your account to start the interview process.',
};

type Props = {
  searchParams: {
    cid?: string;
    iid?: string;
  };
};

export default async function registrationPage({ searchParams }: Props) {
  const { cid, iid } = searchParams;

  // // If either parameter is missing, show 404
  if (!cid || !iid) {
    notFound();
  }

  // // Try to fetch the interview using the existing action
  const { data: interview, error } = await fetchInterviewById(cid, iid);

  // // If no interview found or there's an error, show 404
  if (!interview || error) {
    notFound();
  }

  console.log(interview.status)

  // // Only allow access to published interviews
  // if (interview.status !== 'published') {
  //   notFound();
  // }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-gray-900 p-3 md:h-20">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <RegistrationForm/>
      </div>
    </main>
  );
}
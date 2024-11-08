import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import AccountForm from '@/app/ui/account/account-form';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth'
import { lusitana } from '@/app/ui/fonts';
export default async function Page() {
  return (
    <main>
      <div className='flex justify-between items-center h-[48px]'>
      <h1 className={`${lusitana.className} text-2xl text-white`}>My account</h1>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}>
        <button className="flex h-10 gap-2 mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
          <div className="hidden md:block">Sign Out</div>
          <PowerIcon className="w-6 text-white" />
        </button>
      </form>
      </div>

      <AccountForm />

    </main>
  );
}
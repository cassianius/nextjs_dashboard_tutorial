import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import AddApplicantForm from '@/app/ui/applicants/new_applicant_form';
 
export default async function Page() {
//   const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Applicants', href: '/dashboard/applicants' },
          {
            label: 'Add Applicant',
            href: '/dashboard/applicants/create',
            active: true,
          },
        ]}
      />
      <AddApplicantForm/>
    </main>
  );
}
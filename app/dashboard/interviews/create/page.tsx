import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import AddInterviewForm from '@/app/ui/interviews/new_interview_form';
 
export default async function Page() {
//   const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Interviews', href: '/dashboard/interviews' },
          {
            label: 'Create Interview',
            href: '/dashboard/interviews/create',
            active: true,
          },
        ]}
      />
      <AddInterviewForm/>
    </main>
  );
}
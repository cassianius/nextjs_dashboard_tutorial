import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import AddParticipantForm from '@/app/ui/participants/new_participant_form';
 
export default async function Page() {
//   const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Participants', href: '/dashboard/participants' },
          {
            label: 'Add Participant',
            href: '/dashboard/participants/create',
            active: true,
          },
        ]}
      />
      <AddParticipantForm/>
    </main>
  );
}
import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import AccountForm from '@/app/ui/account/account-form';
 
export default async function Page() {
//   const customers = await fetchCustomers();
  return (
    <main>
      <AccountForm/>
    </main>
  );
}
import { headers } from 'next/headers';

export async function getRegistrationUrl() {
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  return `${protocol}://${host}/applicant-signup`;
}
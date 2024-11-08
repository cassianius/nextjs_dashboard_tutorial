import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
 import { cookies } from 'next/headers';

// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * from USERS where email=${email}`;
//     return user.rows[0];
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }
 
// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials);
 
//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;
//           const user = await getUser(email);
//           if (!user) return null;
//           const passwordsMatch = await bcrypt.compare(password, user.password);

//           if (passwordsMatch) return user;
//         }
        
//         console.log('Invalid credentials');
//         return null;
//       },
//     }),
//   ],
// });

// app/auth.ts



// Get user by email
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// Get company by user ID
async function getCompanyByUserId(userId: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM companies 
      WHERE user_ids @> ARRAY[${userId}]
      LIMIT 1;
    `
    return rows[0] || null;
  } catch (error) {
    console.error('Failed to fetch company:', error);
    return null;
  }
}

// Set company ID in cookie
async function setUserCompany(userId: string) {
  try {
    const company = await getCompanyByUserId(userId);
    if (company) {
      cookies().set('company_id', company.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });
      return company.id;
    }
    return null;
  } catch (error) {
    console.error('Error setting company:', error);
    return null;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          
          const passwordsMatch = await bcrypt.compare(password, user.password);
          
          if (passwordsMatch) {
            // Set company ID after successful authentication
            await setUserCompany(user.id);
            return user;
          }
        }
        
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});

// Helper to get company ID (can be used by actions.ts)
export async function getCompanyId() {
  const cookieStore = cookies();
  return cookieStore.get('company_id')?.value;
}
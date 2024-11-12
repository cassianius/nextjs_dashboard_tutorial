import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isregistrationing = nextUrl.pathname.startsWith('/registration');
      
      // Always allow access to registrationing
      if (isregistrationing) {
        return true;
      }
      
      // Protect dashboard routes
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard/interviews', nextUrl));
      }
      
      return true;
    },
  },
} satisfies NextAuthConfig;
// app/actions/user.ts
'use server';

import { PrismaClient } from '@prisma/client'
import { z } from 'zod';
import bcryptjs from 'bcryptjs'
import { signIn } from '@/auth';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

// Validation schema
const SignUpSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must include letters, numbers, and special characters'
    ),
  confirmPassword: z.string(),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormState = {
  message?: string | null;
  success?: boolean;
  userId?: string;
  accountId?: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    terms?: string[];
    _form?: string[];
  };
};

export async function signUp(prevState: FormState | null, formData: FormData): Promise<FormState> {
  try {
    console.log('Starting signup process...');
    const rawFormData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      terms: formData.get('terms') === 'on',
    };


    // Validate form data
    const validatedFields = SignUpSchema.parse(rawFormData);

    console.log('Form data validated, checking for existing user...');

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedFields.email },
    });

    if (existingUser) {
      return {
        errors: {
          _form: ['A user with this email already exists'],
        },
      };
    }
    console.log('Creating new account...');

    // Create new account
    const account = await prisma.account.create({
      data: {
        type: 'personal',
        status: 'active',
        subscription_tier: 'free',
      },
    });

    // Hash password
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(validatedFields.password, salt);

    console.log('Creating new user...');

    // Create new user
    const user = await prisma.user.create({
      data: {
        first: validatedFields.firstName,
        last: validatedFields.lastName,
        email: validatedFields.email,
        password: hashedPassword,
        role: 'owner',
        account_id: account.id,
      },
    });

    console.log('User created successfully:', user.id);

    const cookieStore = cookies();
    
    // Set account ID cookie (HTTP-only for security)
    cookieStore.set('account_id', account.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    // Set user ID cookie if needed
    cookieStore.set('user_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return {
      success: true,
      userId: user.id,
      accountId: account.id,
      message: 'Account created successfully!',
    };

  } catch (error) {
    console.error('Signup error:', error);

    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string[]> = {};

      error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      });

      return {
        errors: fieldErrors as FormState['errors']
      };
    }

    return {
      errors: {
        _form: ['Something went wrong. Please try again.'],
      },
    };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}

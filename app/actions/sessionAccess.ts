'use server';

import { PrismaClient } from '@prisma/client';
import { addDays } from 'date-fns';

const prisma = new PrismaClient();

// Helper to generate random codes
const generateAccessCode = () => {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from(
    { length: 6 },
    () => characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
};

const generatePin = () => {
  return Array.from(
    { length: 6 },
    () => Math.floor(Math.random() * 10).toString()
  ).join('');
};

interface SessionAccessParams {
  interview_id: number;
  account_id: string;
  expiration_days: number;
}

export async function createSessionAccess(params: SessionAccessParams) {
  try {
    const accessCode = generateAccessCode();
    const pin = generatePin();

    const sessionAccess = await prisma.sessionAccess.create({
      data: {
        interview_id: params.interview_id,
        account_id: params.account_id,
        access_code: accessCode,
        pin: pin,
        expiration: addDays(new Date(), params.expiration_days),
      },
    });

    return {
      access_code: sessionAccess.access_code,
      pin: sessionAccess.pin,
      expiration: sessionAccess.expiration,
    };
  } catch (error) {
    console.error('Error creating session access:', error);
    throw error;
  }
}
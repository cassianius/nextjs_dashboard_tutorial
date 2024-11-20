'use server';

import { prisma } from '../lib/prisma';
import { createTransport } from 'nodemailer';
import { hash } from 'bcrypt';
import crypto from 'crypto';

type ForgotPasswordState = {
  message: string;
  success?: boolean;
} | null;

type ResetPasswordState = {
  success?: boolean;
  error?: string;
  message?: string;
};

// Gmail-specific email configuration
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify email configuration on startup
transporter.verify(function (error, success) {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Helper function to send emails
async function sendEmail({ to, subject, html }: { 
  to: string; 
  subject: string; 
  html: string;
}) {
  try {
    console.log('Attempting to send email to:', to);
    const info = await transporter.sendMail({
      from: {
        name: 'Your App Name',
        address: process.env.SMTP_USER || '',
      },
      to,
      subject,
      html,
    });
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Detailed email sending error:', error);
    return false;
  }
}

function getPasswordResetEmailTemplate(resetUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2563eb; margin-bottom: 20px;">Reset Your Password</h1>
        <p>Hello,</p>
        <p>We received a request to reset your password. Click the button below to create a new password. This link will expire in 1 hour.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request this password reset, you can safely ignore this email.</p>
        <p style="color: #666; margin-top: 30px; font-size: 0.9em;">
          If the button above doesn't work, copy and paste this link into your browser:<br>
          <a href="${resetUrl}" style="color: #2563eb; word-break: break-all;">
            ${resetUrl}
          </a>
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 0.8em;">
          This is an automated email. Please do not reply to this message.
        </p>
      </body>
    </html>
  `;
}

export async function forgotPassword(
  prevState: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  try {
    // Debug logs for environment variables
    console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('SMTP_PASSWORD length:', process.env.SMTP_PASSWORD?.length);

    const email = formData.get('email') as string;
    if (!email || typeof email !== 'string') {
      return {
        message: 'Invalid email address',
        success: false,
      };
    }

    // Generate a secure random token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour from now

    // Store the reset token
    await prisma.passwordReset.create({
      data: {
        email,
        token,
        expires,
      },
    });

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    // Send email
    const emailSent = await sendEmail({
      to: email,
      subject: 'Reset Your Password',
      html: getPasswordResetEmailTemplate(resetUrl),
    });

    if (!emailSent) {
      console.error('Failed to send password reset email');
      // Don't expose email sending failure to user
    }

    // Always return the same message for security
    return {
      message: 'If an account exists for this email, you will receive password reset instructions shortly.',
      success: true,
    };
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      message: 'An error occurred while processing your request.',
      success: false,
    };
  }
}

export async function resetPassword(
  prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  try {
    const token = formData.get('token') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!token || !password || !confirmPassword) {
      return {
        error: 'MissingFields',
        message: 'All fields are required',
        success: false,
      };
    }

    if (password !== confirmPassword) {
      return {
        error: 'PasswordMismatch',
        message: 'Passwords do not match',
        success: false,
      };
    }

    // Find valid reset token
    const resetRequest = await prisma.passwordReset.findFirst({
      where: {
        token,
        used: false,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!resetRequest) {
      return {
        error: 'InvalidToken',
        message: 'Invalid or expired reset token',
        success: false,
      };
    }

    // Hash the new password
    const hashedPassword = await hash(password, 10);

    // Update user's password
    await prisma.user.update({
      where: {
        email: resetRequest.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    // Mark token as used
    await prisma.passwordReset.update({
      where: {
        id: resetRequest.id,
      },
      data: {
        used: true,
      },
    });

    return {
      message: 'Password successfully reset. You can now log in with your new password.',
      success: true,
    };
  } catch (error) {
    console.error('Reset password error:', error);
    return {
      error: 'ServerError',
      message: 'An error occurred while resetting your password',
      success: false,
    };
  }
}
'use server';

import { redirect } from 'next/navigation';
import { auth } from '../auth';
import { headers } from 'next/headers';

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const result = await auth.api.signUpEmail({
      body: { email, password, name, callbackURL: '/dashboard' },
    });

    if (result?.user) return { success: true, user: result.user };
    return { success: false, error: 'Failed to create account.' };
  } catch (err: any) {
    if (err?.message === 'NEXT_REDIRECT' || err?.digest?.includes('NEXT_REDIRECT')) throw err;

    console.error('Sign Up Error Log:', err);

    // Dynamic error grabbing: extracts Better-Auth's specific validation message
    const errorMessage = err?.message || err?.body?.message || 'Something went wrong.';

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const signIn = async (email: string, password: string) => {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: '/dashboard',
    },
  });
  // If the sign-in was successful and a user exists, redirect them immediately
  if (result?.user) {
    redirect('/dashboard');
  }
  return result;
};

export const signInSocial = async (provider: 'github' | 'google') => {
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: '/dashboard',
    },
  });

  if (url) {
    redirect(url);
  }
};

export const signOut = async () => {
  const result = await auth.api.signOut({ headers: await headers() });
  return result;
};

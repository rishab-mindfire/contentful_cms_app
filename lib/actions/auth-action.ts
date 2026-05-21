'use server';

import { redirect } from 'next/navigation';
import { auth } from '../auth';
import { headers } from 'next/headers';
import { handleAuthActionError } from '../error-handler';
import { ResultRes } from '@/utils/types';

export const signUp = async (email: string, password: string, name: string): Promise<ResultRes> => {
  try {
    const result = await auth.api.signUpEmail({
      body: { email, password, name, callbackURL: '/dashboard' },
    });

    if (result?.user) return { success: true, user: result.user, error: '' };
    return { success: false, error: 'Failed to create account.' };
  } catch (err) {
    return handleAuthActionError(err);
  }
};

export const signIn = async (email: string, password: string): Promise<ResultRes | undefined> => {
  try {
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
  } catch (err) {
    return handleAuthActionError(err);
  }
};

export const signInSocial = async (provider: 'github' | 'google') => {
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: '/dashboard',
    },
  });
  console.log('url   :::::::', url);
  if (url) {
    redirect(url);
  }
};

export const signOut = async () => {
  const result = await auth.api.signOut({ headers: await headers() });
  return result;
};

'use client';

import { useState } from 'react';
import { SocialAuth } from '@/components/ui/socialAuth';
import { signIn, signInSocial, signUp } from '../../lib/actions/auth-action';
import { Loader } from '@/components/ui/loader';
import { ResultRes } from '@/utils/types';
import Link from 'next/link';
import Image from 'next/image';
import { useGlobal } from '../GlobalContext';
import { getFullUrl } from '@/utils/helperFunctions';

export default function AuthClientPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  //social login
  const handleSocialAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setError('');

    try {
      await signInSocial(provider);
    } catch (err) {
      setError(
        `Error authenticating with ${provider}: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignIn) {
        const result: ResultRes | undefined = await signIn(email, password);
        if (result && !result?.success) {
          setError(result?.error);
        }
      } else {
        const result: ResultRes = await signUp(email, password, name);
        if (!result || result.error.length > 0) {
          setError(result.error);
        }
      }
    } catch (err) {
      setError(`Authentication error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // logo data from the Context
  const { globalData, isDbDown } = useGlobal();
  const loginData = globalData.login;

  if (isDbDown) {
    return (
      <div className="p-4 text-red-600 text-center">
        Configuration currently unavailable. Please check your connection.
      </div>
    );
  }

  return (
    <main className="min-h-screen g-linear-to-b from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 md:p-10">
        {/* Header / Brand Logo Section */}
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="inline-block mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
            aria-label="Go to home page"
          >
            <div className="relative w-24 h-24">
              <Image
                src={getFullUrl(loginData?.logoImage.url)}
                alt={loginData?.mainText || 'Company Logo'}
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignIn ? `${loginData?.mainText || 'Sign In'}` : 'Create Account'}
          </h1>
          <p className="text-gray-600 text-sm">
            {isSignIn
              ? 'Sign in to your account to continue'
              : 'Sign up to get started with CMS tool'}
          </p>
        </div>

        {/* Error Display  */}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="bg-red-50 border border-red-200 rounded-lg p-4 transition-all"
          >
            <div className="flex">
              <div className="shrink-0">
                {/* Fallback basic SVG icon for error context */}
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {!isSignIn && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {loginData?.namelabel || 'Full Name'}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required={!isSignIn}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {loginData?.EmailLabel || 'Email Address'}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {loginData?.passwordlabel || 'Password'}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignIn ? 'current-password' : 'new-password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full btn-signin flex justify-center py-3 px-4 border border-transparent rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader aria-hidden="true" />
                <span>{isSignIn ? 'Signing in...' : 'Creating account...'}</span>
              </span>
            ) : isSignIn ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Toggle between Sign In and Sign Up */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignIn(!isSignIn);
              setError('');
              setName('');
            }}
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium transition-colors focus:outline-none focus:underline"
          >
            {isSignIn ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Authentication Block */}
        <div className="mt-2">
          <SocialAuth handleSocialAuth={handleSocialAuth} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { SocialAuth } from '@/components/ui/socialAuth';
import { signIn, signInSocial, signUp } from '../../lib/actions/auth-action';
import { Loader } from '@/components/ui/loader';
import { ResultRes } from '@/utils/types';

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

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100">
      <div className="flex items-center justify-center p-4 pt-20">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignIn ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600">
              {isSignIn
                ? 'Sign in to your account to continue'
                : 'Sign up to get started with better-auth'}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isSignIn && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
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
                Email address
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
                Password
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

            <button type="submit" disabled={isLoading} className="btn-signin">
              {isLoading ? (
                <div className="flex items-center">
                  <Loader />
                  {isSignIn ? 'Signing in...' : 'Creating account...'}
                </div>
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
                setError(''); // Clear any previous errors
                setName(''); // Clear name when switching modes
              }}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium transition-colors"
            >
              {isSignIn ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-indigo-50 from-blue-50 to-indigo-100 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <SocialAuth handleSocialAuth={handleSocialAuth} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

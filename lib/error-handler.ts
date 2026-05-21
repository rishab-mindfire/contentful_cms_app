// Define the shape for Better-Auth or generic API errors
interface ActionError {
  message?: string;
  body?: {
    message?: string;
  };
  digest?: string; // Next.js specific error digest
}

/**
 * Type guard to check if an error is actually a Next.js Redirect
 */
function isNextRedirect(err: unknown): boolean {
  if (typeof err !== 'object' || err === null) return false;

  const error = err as Record<string, unknown>;
  return (
    error.message === 'NEXT_REDIRECT' ||
    (typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT'))
  );
}

export const handleActionError = (err: unknown) => {
  // 1. Manually check and re-throw redirects
  if (isNextRedirect(err)) throw err;

  console.error('Action Error:', err);

  let message = 'An unexpected error occurred.';

  // 2. Type-safe narrowing without 'any'
  if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === 'object' && err !== null) {
    const errorBody = err as ActionError;
    message = errorBody.body?.message || errorBody.message || message;
  }

  return { success: false, error: message };
};

import * as Sentry from '@sentry/nextjs';

export const handleApiError = (
  context: string,
  error: unknown,
  userMessage?: string,
  severity: Sentry.SeverityLevel = 'error',
) => {
  //  Ensure we have an Error object for Sentry
  const err = error instanceof Error ? error : new Error(String(error));

  //  Log to Sentry with severity and context
  Sentry.withScope((scope) => {
    scope.setTag('context', context);
    scope.setExtra('userMessage', userMessage);
    scope.setLevel(severity);
    Sentry.captureException(err);
  });

  // Log to server console
  console.error(`[${context}] - ${userMessage || 'An error occurred'}:`, err.message);
};

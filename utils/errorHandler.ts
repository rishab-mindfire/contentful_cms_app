import * as Sentry from '@sentry/nextjs';

export const handleApiError = (context: string, error: unknown, userMessage?: string) => {
  //  Log to Sentry
  Sentry.captureException(error, {
    tags: { context },
    extra: { userMessage },
  });

  console.error(`[${context}] - ${userMessage} Error:`, error);
};

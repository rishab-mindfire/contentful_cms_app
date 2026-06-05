import { ErrorWithMessage } from './types';

// Checks if the object conforms to ErrorWithMessage
const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
};

export const handleApiError = (
  context: string,
  error: unknown,
  userMessage?: string,
  level: 'error' | 'warn' = 'error',
) => {
  let displayMessage: string;

  if (error instanceof Error) {
    displayMessage = error.message;
  } else if (isErrorWithMessage(error)) {
    displayMessage = error.message;
  } else {
    // Fallback for non-standard errors
    displayMessage = typeof error === 'string' ? error : JSON.stringify(error);
  }

  const logMessage = `[${context}] - ${userMessage || 'An error occurred'}: ${displayMessage}`;

  if (level === 'warn') {
    console.warn(logMessage, error);
  } else {
    console.error(logMessage, error);
  }
};

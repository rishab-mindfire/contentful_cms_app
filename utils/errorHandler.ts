export const handleApiError = (
  context: string,
  error: unknown,
  userMessage?: string,
  level: 'error' | 'warn' = 'error',
) => {
  const err = error instanceof Error ? error : new Error(String(error));

  const errorMessage = `[${context}] - ${userMessage || 'An error occurred'}: ${err.message}`;

  // Log based on the requested severity level
  switch (level) {
    case 'warn':
      console.warn(errorMessage, err);
      break;
    case 'error':
    default:
      console.error(errorMessage, err);
      break;
  }
};

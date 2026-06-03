'use client';
import { handleApiError } from '@/utils/errorHandler';
import { useEffect } from 'react';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    handleApiError('Error in blog', error);
  }, [error]);

  return (
    <div className="p-6 text-center space-y-4">
      <h2 className="text-xl font-bold text-red-600">Something went wrong!</h2>
      <p className="text-gray-600">{error.message || "We couldn't load this content."}</p>
      <button
        onClick={() => reset()} // Tries to re-render the segment
        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Try again
      </button>
    </div>
  );
}

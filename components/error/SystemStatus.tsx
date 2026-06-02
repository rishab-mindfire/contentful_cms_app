'use client';

interface SystemStatusProps {
  message?: string;
}

export default function SystemStatus({ message }: SystemStatusProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 max-w-xl mx-auto my-12"
      role="alert"
      aria-live="assertive"
    >
      {/* Optional: Error Icon Indicator to add context */}
      <div className="mb-4 text-amber-500" aria-hidden="true">
        <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Strapi Unavailable</h1>

      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-sm text-sm leading-relaxed">
        {message ||
          'We are currently experiencing technical difficulties. Please check back later.'}
      </p>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-6 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-200 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
      >
        Retry Connection
      </button>
    </div>
  );
}

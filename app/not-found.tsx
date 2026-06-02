import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="space-y-6 max-w-md mx-auto">
        {/* Visual 404 Element - Hidden from screen readers to prevent redundant reading */}
        <div className="flex justify-center select-none" aria-hidden="true">
          <span className="text-9xl font-black tracking-tight text-gray-200 dark:text-gray-800 selection:bg-transparent">
            404
          </span>
        </div>

        {/* Informational Text - Promoted to H1 as the primary page landmark */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Page not found!
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            The link you followed might be broken, or the page has been permanently moved. Let's get
            you back on track.
          </p>
        </div>

        {/* Action Callouts */}
        <div className="pt-4 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}

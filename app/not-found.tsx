import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
      <div className="space-y-4">
        {/* Visual 404 Element */}
        <div className="flex justify-center">
          <h1 className="text-9xl font-black tracking-tight text-gray-200 dark:text-gray-800 selection:bg-transparent">
            404
          </h1>
        </div>

        {/* Informational Text */}
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Pge not found !
        </h2>

        <p className="mx-auto max-w-md text-gray-500 dark:text-gray-400">
          The link you followed might be broken, or the page has been permanently moved. Let's get
          you back on track.
        </p>

        {/* Action Callouts */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SystemStatus({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800">System Unavailable</h2>
      <p className="mt-2 text-gray-600 max-w-sm">
        {message ||
          'We are currently experiencing technical difficulties. Please check back later.'}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Retry Connection
      </button>
    </div>
  );
}

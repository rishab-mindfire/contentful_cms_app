export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 animate-pulse">
      <main className="max-w-4xl mx-auto">
        {/* Profile Card Skeleton */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* User Info Skeleton */}
            <div className="flex items-center gap-6 w-full">
              {/* Avatar Placeholder */}
              <div className="w-20 h-20 rounded-full bg-gray-200 shrink-0" />

              {/* Text Placeholders */}
              <div className="space-y-3 w-full max-w-sm">
                <div className="h-8 w-3/4 bg-gray-200 rounded-md" />
                <div className="h-5 w-1/2 bg-gray-200 rounded-md" />
                <div className="w-12 h-1 bg-gray-200 rounded-full" />
              </div>
            </div>

            {/* Button Placeholder */}
            <div className="w-full md:w-32 h-12 bg-gray-200 rounded-xl" />
          </div>
        </section>
      </main>
    </div>
  );
}

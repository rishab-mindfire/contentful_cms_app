export default function Loading() {
  return (
    <main className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto animate-pulse">
        {/* Header Skeleton */}
        <header className="mb-12">
          <div className="h-9 w-32 bg-gray-200 rounded-md mb-4" />
          <div className="w-30 h-1 bg-gray-200 rounded-full" />
        </header>

        {/* Articles Feed Skeleton */}
        <div className="space-y-16">
          {[1, 2, 3].map((item) => (
            <article key={item} className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
              {/* Image Container Skeleton */}
              <div className="md:col-span-2 aspect-4/3 bg-gray-200 rounded-2xl" />

              {/* Content Skeleton */}
              <div className="md:col-span-3 space-y-4">
                <div className="h-4 w-32 bg-gray-200 rounded-full" />
                <div className="h-8 w-full bg-gray-200 rounded-md" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded-md" />
                  <div className="h-4 w-full bg-gray-200 rounded-md" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded-md" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

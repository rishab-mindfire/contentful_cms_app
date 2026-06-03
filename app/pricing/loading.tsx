export default function Loading() {
  return (
    <section className="py-16 px-6 bg-white animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <header className="text-center mb-16">
          <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-4" />
          <div className="w-20 h-1 bg-gray-200 mx-auto rounded-full mb-6" />
          <div className="h-6 w-full max-w-md bg-gray-200 rounded-md mx-auto" />
        </header>

        {/* Pricing Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <article
              key={item}
              className="flex flex-col p-8 border border-gray-100 rounded-2xl shadow-sm h-500px"
            >
              <div className="h-8 w-1/2 bg-gray-200 rounded-md mb-2" />
              <div className="h-4 w-1/4 bg-gray-200 rounded-full mb-6" />
              <div className="h-12 w-3/4 bg-gray-200 rounded-md mb-6" />

              <div className="flex-1 space-y-3 mb-8">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-4/5 bg-gray-200 rounded" />
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                <div className="h-12 w-full bg-gray-200 rounded-xl" />
                <div className="h-12 w-full bg-gray-200 rounded-xl" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

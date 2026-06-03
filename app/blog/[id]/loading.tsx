export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 py-4 px-6 relative animate-pulse">
      {/* Navigation Skeleton */}
      <nav className="sticky top-20 z-10 hidden md:block mb-8">
        <div className="h-4 w-32 bg-gray-200 rounded-md" />
      </nav>

      <article className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        {/* Header Skeleton */}
        <header className="mb-10 text-center flex flex-col items-center">
          <div className="h-4 w-24 bg-gray-200 rounded-full mb-4" />
          <div className="h-12 w-full max-w-2xl bg-gray-200 rounded-lg mb-6" />
          <div className="h-6 w-3/4 bg-gray-200 rounded-md" />
        </header>

        {/* Featured Image Skeleton */}
        <div className="w-full aspect-video bg-gray-200 rounded-3xl mb-12" />

        {/* Content Skeleton */}
        <section className="space-y-4 mb-16">
          <div className="h-5 w-full bg-gray-200 rounded-md" />
          <div className="h-5 w-full bg-gray-200 rounded-md" />
          <div className="h-5 w-[90%] bg-gray-200 rounded-md" />
          <div className="h-5 w-full bg-gray-200 rounded-md" />
          <div className="h-5 w-1/2 bg-gray-200 rounded-md" />
        </section>

        {/* Author Footer Skeleton */}
        <footer className="bg-white border border-gray-100 p-8 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-gray-200 shrink-0" />
          <div className="text-center sm:text-left w-full space-y-2">
            <div className="h-6 w-40 bg-gray-200 rounded-md" />
            <div className="h-4 w-full sm:w-2/3 bg-gray-200 rounded-md" />
          </div>
        </footer>
      </article>
    </main>
  );
}

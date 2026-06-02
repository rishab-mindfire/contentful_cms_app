import Image from 'next/image';
import Link from 'next/link';
import { getArticles } from '@/services/blog.service';
import { getFullUrl } from '@/utils/helperFunctions';

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const response = await getArticles(currentPage);
  const { data: articles, meta } = response;
  const { pageCount } = meta.pagination;

  return (
    <main className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Blogs</h1>
          <div className="w-30 h-1 bg-indigo-600 rounded-full" aria-hidden="true" />
        </header>

        {/* Articles Feed List Container */}
        <div className="space-y-16" role="feed" aria-label="Blog posts feed">
          {articles.map((article, index) => {
            const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <article
                key={article.id}
                className="group"
                // Inform screen reader positions if infinite/paginated list tracking applies
                aria-posinset={index + 1}
                aria-setsize={articles.length}
              >
                <Link
                  href={`/blog/${article.documentId}`}
                  className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-indigo-500"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
                    {/* Image Container */}
                    <div className="md:col-span-2 relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500">
                      <Image
                        src={getFullUrl(article?.featuredImage?.url)}
                        // Decorative fallback since title text is immediately read next door
                        alt=""
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3 space-y-4">
                      <div className="flex items-center gap-3 text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                        <time dateTime={article.createdAt}>{formattedDate}</time>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" aria-hidden="true" />
                      </div>

                      <h2 className="text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {article.title}
                      </h2>

                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {article.description}
                      </p>

                      <div className="pt-2 font-medium text-gray-900 flex items-center gap-1 group-hover:gap-2 transition-all">
                        <span>Read more</span>
                        <span aria-hidden="true">&rarr;</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* Pagination Landmark */}
        {pageCount > 1 && (
          <nav
            className="mt-24 pt-12 border-t border-gray-100 flex justify-between items-center"
            aria-label="Pagination navigation"
          >
            <PaginationLink
              page={currentPage - 1}
              label="Previous page"
              disabled={currentPage <= 1}
            />
            <span className="text-sm font-medium text-gray-500" aria-current="page">
              Page {currentPage} of {pageCount}
            </span>
            <PaginationLink
              page={currentPage + 1}
              label="Next page"
              disabled={currentPage >= pageCount}
            />
          </nav>
        )}
      </div>
    </main>
  );
}

// Helper function pagination
function PaginationLink({
  page,
  label,
  disabled,
}: {
  page: number;
  label: string;
  disabled: boolean;
}) {
  return (
    <Link
      href={`/blog?page=${page}`}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={(e) => disabled && e.preventDefault()}
      className={`px-6 py-3 rounded-xl border border-gray-200 font-semibold transition-all outline-none
    ${
      disabled
        ? 'opacity-30 cursor-not-allowed pointer-events-none'
        : 'hover:border-indigo-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600'
    }`}
    >
      {label}
    </Link>
  );
}

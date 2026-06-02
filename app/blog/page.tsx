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
    <main className="min-h-screen bg-white py-2 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Blogs</h3>
          <div className="w-30 h-1 bg-indigo-600 rounded-full" />
        </header>

        {/* Articles Feed */}
        <div className="space-y-10">
          {articles.map((article) => {
            const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <article key={article.id} className="group">
                <Link href={`/blog/${article.documentId}`} className="block">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
                    {/* Image Container */}
                    <div className="md:col-span-2 relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500">
                      <Image
                        src={getFullUrl(article.featuredImage.url)}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3 space-y-4">
                      <div className="flex items-center gap-3 text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                        <span>{formattedDate}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      </div>

                      <h2 className="text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {article.title}
                      </h2>

                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {article.description}
                      </p>

                      <div className="pt-2 font-medium text-gray-900 flex items-center group-hover:gap-2 transition-all">
                        Read more <span>&rarr;</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <nav className="mt-24 pt-12 border-t border-gray-100 flex justify-between items-center">
            <PaginationLink page={currentPage - 1} label="Previous" disabled={currentPage <= 1} />
            <span className="text-sm font-medium text-gray-500">
              Page {currentPage} of {pageCount}
            </span>
            <PaginationLink
              page={currentPage + 1}
              label="Next"
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
      className={`px-6 py-3 rounded-xl border border-gray-200 font-semibold transition-all ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:border-indigo-600 hover:text-indigo-600'}`}
    >
      {label}
    </Link>
  );
}

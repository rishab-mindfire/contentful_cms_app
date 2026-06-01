import Image from 'next/image';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getArticles } from '@/services/blog.service';
import { getFullUrl } from '@/utils/helperFunctions';

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;

  const response = await getArticles(currentPage);
  const articles = response.data;
  const { pageCount } = response.meta.pagination;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-14 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Latest Articles
          </h1>
        </header>

        {/* Articles Feed */}
        <div className="space-y-12">
          {articles.map((article) => {
            const imageUrl = `${getFullUrl(article.featuredImage.url)}`;
            const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <article
                key={article.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="md:col-span-4 relative h-52 md:h-full min-h-200px w-full rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, 33vw"
                  />
                </div>

                <div className="md:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="text-sm text-gray-400 font-medium mb-2">{formattedDate}</div>

                    <Link href={`/blog/${article.documentId}`}>
                      <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-3">
                        {article.title}
                      </h2>
                    </Link>

                    <p className="text-gray-500 font-medium mb-4 italic">"{article.description}"</p>
                    <div className="border-t border-gray-100 pt-4 mb-4 line-clamp-2 prose prose-sm max-w-none">
                      {article.content && <BlocksRenderer content={article.content.slice(0, 1)} />}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Pagination Section */}
        {pageCount > 1 && (
          <div className="mt-16 flex justify-center items-center space-x-4">
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className={`px-4 py-2 border rounded-lg text-sm font-medium ${currentPage <= 1 ? 'pointer-events-none opacity-40 bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
            >
              Previous
            </Link>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {pageCount}
            </span>
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className={`px-4 py-2 border rounded-lg text-sm font-medium ${currentPage >= pageCount ? 'pointer-events-none opacity-40 bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
            >
              Next
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

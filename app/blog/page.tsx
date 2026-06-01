import Image from 'next/image';
import Link from 'next/link';
import Markdown from '@/components/features-blocks/markDown-Blogs';
import { getArticles } from '@/services/blog.service';
import { getFullUrl } from '@/utils/helperFunctions';

export default async function BlogPage() {
  const response = await getArticles();
  const articles = response.data;

  return (
    <main className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-14 text-center">
          <h3 className="font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Latest Articles
          </h3>
        </header>

        {/* Articles Feed */}
        <div className="space-y-16">
          {articles.map((article) => {
            const imageUrl = `${getFullUrl(article.featuredImage.url)}`;
            const authorImageUrl = `${getFullUrl(article.author.image.url)}`;
            const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <article
                key={article.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-8 p-6 sm:p-8 hover:shadow-md transition-shadow duration-300"
              >
                {/* Feature Image */}
                <div className="md:col-span-4 relative h-52 md:h-full min-h-200px w-full rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="text-sm text-gray-400 font-medium mb-2">{formattedDate}</div>

                    <Link href={`/blog/${article.slug}`}>
                      <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-3">
                        {article.title}
                      </h2>
                    </Link>

                    <p className="text-gray-500 font-medium mb-6 italic">"{article.description}"</p>

                    <div className="border-t border-gray-100 pt-4 mb-6">
                      <Markdown content={article.content} />
                    </div>
                  </div>

                  {/* Author Meta data */}
                  <div className="flex items-center space-x-3 border-t border-gray-50 pt-4 mt-auto">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src={authorImageUrl}
                        alt={article.author.fullName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-gray-900">
                        {article.author.fullName}
                      </span>
                      <span className="block text-xs text-gray-400">{article.author.bio}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

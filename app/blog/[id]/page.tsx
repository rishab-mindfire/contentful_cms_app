import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getArticleByDocumentId } from '@/services/blog.service';
import { getFullUrl } from '@/utils/helperFunctions';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;

  const response = await getArticleByDocumentId(id);
  const article = response?.data;

  if (!article) {
    notFound();
  }

  // 1. Safe Image Resolution with local fallbacks
  const imageUrl = getFullUrl(article.featuredImage.url);

  const authorImageUrl = article.author?.image?.url
    ? `${getFullUrl(article.author.image.url)}`
    : '/default-avatar.png';

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-10">
        <Link
          href="/blog"
          className="text-sm font-medium text-blue-600 hover:underline inline-block mb-6"
        >
          ← Back to articles
        </Link>

        <header className="mb-8">
          <div className="text-sm text-gray-400 font-medium mb-2">{formattedDate}</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-xl text-gray-500 italic">"{article.description}"</p>
          )}
        </header>

        <div className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden bg-gray-100 mb-8">
          <Image
            src={imageUrl}
            alt={article.title || 'Blog featured image'}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose max-w-none border-b border-gray-100 pb-8 mb-8">
          {article.content && <BlocksRenderer content={article.content} />}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
            <Image
              src={authorImageUrl}
              alt={article.author?.fullName || 'Unknown User'}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="block text-base font-semibold text-gray-900">
              {article.author?.fullName || 'Unknown User'}
            </span>
            <span className="block text-sm text-gray-400">
              {article.author?.bio || 'Staff Contributor'}
            </span>
          </div>
        </div>
      </article>
    </main>
  );
}

// @/components/BlogCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/utils/types';
import Markdown from '../landing-blocks/Markdown';
import { formattedDate, getFullUrl } from '@/utils/helperFunctions';

interface BlogCardProps {
  article: Article;
}

export default function BlogCard({ article }: BlogCardProps) {
  // Safe URL mapping using your helper interceptor utility
  const imageUrl = getFullUrl(article.featuredImage.url);
  const authorImageUrl = getFullUrl(article.author.image.url);

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-8 p-6 sm:p-8 hover:shadow-md transition-shadow duration-300">
      {/* Feature Image Column Wrapper */}
      <div className="md:col-span-4 relative h-52 md:h-full min-h-200px w-full rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={article.title || 'Blog post cover image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </div>

      {/* Main Metadata Content Block Column */}
      <div className="md:col-span-8 flex flex-col justify-between">
        <div>
          {/* Post Timing Details */}
          <div className="text-sm text-gray-400 font-medium mb-2">
            {formattedDate(article.createdAt)}
          </div>

          {/* Linked Core Title Header */}
          <Link href={`/blog/${article.slug}`}>
            <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-3">
              {article.title}
            </h2>
          </Link>

          {/* Static Plaintext Excerpt Summary Description */}
          <p className="text-gray-500 font-medium mb-6 italic">"{article.description}"</p>

          {/* Rich Content Engine Parser Intercept Component */}
          <div className="border-t border-gray-100 pt-4 mb-6">
            <Markdown content={article.content} />
          </div>
        </div>

        {/* Dynamic Author Profiler Footer Panel */}
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
}

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

  if (!article) notFound();

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <main className="min-h-screen bg-gray-50 py-4 px-6 relative">
      {/* Navigation */}
      <div className="sticky top-20 z-5 hidden md:block">
        <Link
          href="/blog"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          &larr; Back to articles
        </Link>
      </div>
      <article className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">
            {formattedDate}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 italic">"{article.description}"</p>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12">
          <Image
            src={getFullUrl(article.featuredImage.url)}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content - Using prose-lg for professional readability */}
        <div className="prose prose-lg prose-indigo max-w-none mb-16">
          {article.content && <BlocksRenderer content={article.content} />}
        </div>

        {/* Author Footer Card */}
        <div className="bg-white border border-gray-100 p-8 rounded-2xl flex items-center gap-6 shadow-sm">
          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
            <Image
              src={
                article.author?.image?.url
                  ? getFullUrl(article.author.image.url)
                  : '/default-avatar.png'
              }
              alt={article.author?.fullName || 'Author'}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">
              {article.author?.fullName || 'Staff Writer'}
            </h4>
            <p className="text-gray-500">
              {article.author?.bio || 'Expert contributor at our publication.'}
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}

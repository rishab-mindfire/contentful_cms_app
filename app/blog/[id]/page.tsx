// ISR component
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleByDocumentId, getArticles } from '@/services/blog.service';
import { formattedDate, getFullUrl } from '@/utils/helperFunctions';
import MarkdownBlog from '@/components/features-blocks/markDown-Blogs';

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 10;
export async function generateStaticParams() {
  const response = await getArticles(1, 50);
  const ids = response.data.map((article) => ({
    id: article.documentId,
  }));

  return ids;
}

export const dynamicParams = true;

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const response = await getArticleByDocumentId(id);
  const article = response?.data;

  if (!article) notFound();

  return (
    <main className="min-h-screen bg-gray-50 py-4 px-6 relative">
      {/* Navigation  */}
      <nav className="sticky top-20 z-10 hidden md:block" aria-label="Back navigation">
        <Link
          href="/blog"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span aria-hidden="true">&larr;</span> Back to articles
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        {/* Header Section */}
        <header className="mb-10 text-center">
          <time
            dateTime={article?.createdAt}
            className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 block"
          >
            {formattedDate(article?.createdAt)}
          </time>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-xl text-gray-600 italic">
              <span className="sr-only">Summary: </span>"{article.description}"
            </p>
          )}
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12">
          <Image
            src={article?.featuredImage ? getFullUrl(article?.featuredImage?.url) : '/default.png'}
            alt={article?.title ? `Cover image for ${article.title}` : 'Article cover presentation'}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <section
          aria-label="Article body content"
          className="prose prose-lg prose-indigo max-w-none mb-16"
        >
          {article.content && <MarkdownBlog content={article.content} />}
        </section>

        {/* Author Footer Card */}
        <footer
          aria-label="About the author"
          className="bg-white border border-gray-100 p-8 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-sm"
        >
          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
            <Image
              src={
                article.author?.image?.url
                  ? getFullUrl(article.author.image.url)
                  : '/default-avatar.png'
              }
              alt={
                article.author?.fullName
                  ? `${article.author.fullName} avatar picture`
                  : 'Author default avatar placeholder'
              }
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-bold text-gray-900">
              By {article.author?.fullName || 'Staff Writer'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {article.author?.bio || 'Expert contributor at our publication.'}
            </p>
          </div>
        </footer>
      </article>
    </main>
  );
}

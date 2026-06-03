'use client';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

interface MarkdownProps {
  content: BlocksContent;
}

export default function MarkdownBlog({ content }: MarkdownProps) {
  if (!content) return null;

  return (
    <div className="prose max-w-none dark:prose-invert text-gray-600 leading-relaxed">
      <BlocksRenderer
        content={content}
        blocks={{
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return (
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{children}</h1>
                );
              case 2:
                return (
                  <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                    {children}
                  </h2>
                );
              case 3:
                return (
                  <h3 className="text-2xl font-medium text-gray-800 dark:text-gray-100">
                    {children}
                  </h3>
                );
              case 4:
                return (
                  <h4 className="text-2xl font-medium text-gray-800 dark:text-gray-100">
                    {children}
                  </h4>
                );
              case 5:
                return (
                  <h5 className="text-2xl font-medium text-gray-800 dark:text-gray-100">
                    {children}
                  </h5>
                );
              case 6:
                return (
                  <h6 className="text-2xl font-medium text-gray-800 dark:text-gray-100">
                    {children}
                  </h6>
                );
              default:
                return <h4 className="text-xl font-medium">{children}</h4>;
            }
          },
        }}
      />
    </div>
  );
}

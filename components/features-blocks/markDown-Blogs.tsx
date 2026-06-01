import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

interface MarkdownProps {
  content: BlocksContent;
}

export default function Markdown({ content }: MarkdownProps) {
  if (!content) return null;

  return (
    <div className="prose max-w-none dark:prose-invert text-gray-600 leading-relaxed">
      <BlocksRenderer content={content} />
    </div>
  );
}

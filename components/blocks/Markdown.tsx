import { MarkdownBlock } from '@/utils/types';

interface MarkdownContentBlock {
  children: {
    text: string;
  }[];
}

export default function Markdown({ content }: MarkdownBlock) {
  return (
    <div className="prose max-w-none">
      {content.map((block: MarkdownContentBlock, idx: number) => (
        <p key={idx}>{block.children[0]?.text}</p>
      ))}
    </div>
  );
}

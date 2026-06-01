import { MarkdownBlock } from '@/utils/types';

interface ChildNode {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

interface MarkdownContentBlock {
  type: string;
  children: ChildNode[];
}

export default function Markdown({ content }: MarkdownBlock) {
  if (!content) return null;

  return (
    <div className="prose max-w-none">
      {content.map((block: MarkdownContentBlock, idx: number) => {
        if (block.type === 'paragraph') {
          return (
            <p key={idx}>
              {/* Loop through ALL children  */}
              {block.children.map((child, childIdx) => {
                if (child.bold) return <strong key={childIdx}>{child.text}</strong>;
                if (child.italic) return <em key={childIdx}>{child.text}</em>;
                return child.text;
              })}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}

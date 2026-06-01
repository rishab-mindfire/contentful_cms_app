import { SectionHeadingBlock } from '@/utils/types';
export default function SectionHeading({ heading, subHeading }: SectionHeadingBlock) {
  return (
    <section className="py-12 text-center">
      <h2 className="text-4xl font-bold">{heading}</h2>
      <p className="text-gray-500 mt-2">{subHeading}</p>
    </section>
  );
}

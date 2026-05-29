import { FAQBlock } from '@/utils/types';

export default function Faqs({ Faq }: FAQBlock) {
  return (
    <section className="py-12 max-w-3xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {Faq.map((item) => (
          <div key={item.id} className="border-b border-gray-200 pb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.heading}</h4>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { CardGridBlock } from '@/utils/types';

export default function CardGrid({ cards }: CardGridBlock) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="feature-card">
            <h3 className="text-xl font-bold mb-2 text-gray-900">{card.heading}</h3>
            <p className="text-gray-600">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

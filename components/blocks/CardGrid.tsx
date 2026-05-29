import { CardGridBlock } from '@/utils/types';

export default function CardGrid({ cards }: CardGridBlock) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">{card.heading}</h3>
            <p className="text-gray-600">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

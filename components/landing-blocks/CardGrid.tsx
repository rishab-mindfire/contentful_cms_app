import React from 'react';
import { CardGridBlock } from '@/utils/types';

export default function CardGrid({ cards }: CardGridBlock) {
  return (
    <section className="py-12 bg-gray-50" aria-label="Features or information grid">
      <div
        className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6"
        role="list"
        aria-label="Information cards"
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="feature-card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-md"
            role="listitem"
          >
            <h2 className="text-xl font-bold mb-2 text-gray-900">{card.heading}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

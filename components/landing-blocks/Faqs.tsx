'use client';
import { useState } from 'react';
import { FAQBlock } from '@/utils/types';

export default function Faqs({ Faq }: FAQBlock) {
  // Track which FAQ item ID is currently open
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    // If clicked item is already open, close it otherwise open it
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-12 max-w-3xl mx-auto px-6" aria-label="Frequently Asked Questions">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {Faq.map((item) => {
          const isOpen = openId === item.id;
          const buttonId = `faq-tg-${item.id}`;
          const panelId = `faq-pn-${item.id}`;

          return (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-200"
            >
              {/* Trigger Button Header */}
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-all cursor-pointer outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600"
                >
                  <span className="text-lg pr-4">{item.heading}</span>

                  {/* Accordion Arrow Icon */}
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </h3>

              {/* Animated Collapsible Content Box */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className={`grid transition-all duration-200 ease-in-out ${
                  isOpen
                    ? 'grid-rows-[1fr] opacity-100 border-t border-gray-100'
                    : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="p-5 text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50/50">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

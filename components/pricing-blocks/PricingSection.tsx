import { PricingData } from '@/utils/types';

interface Props {
  data: PricingData;
}

export const PricingSection = ({ data }: Props) => {
  return (
    <section
      className="py-16 px-6 bg-white"
      aria-label={data.mainHeader || 'Subscription pricing options'}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {data.mainHeader}
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full mb-6" aria-hidden="true" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{data.subHeader}</p>
        </header>

        {/* Pricing Cards Grid List container */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          role="list"
          aria-label="Pricing packages"
        >
          {data.priceCard.map((card) => (
            <article
              key={card.id}
              role="listitem"
              className="flex flex-col p-8 bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-900">{card.pricingHeader}</h3>

              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mt-1 mb-4">
                {card.pricingLable}
              </p>

              <div className="text-4xl font-extrabold text-gray-900 mb-6">
                <span className="sr-only">Price: </span>
                {card.PricingRate}
              </div>

              <div
                className="flex-1 text-gray-600 mb-8 whitespace-pre-line leading-relaxed text-sm"
                aria-label={`Benefits included in ${card.pricingHeader}`}
              >
                {card.pricingBenefits}
              </div>

              {/* Call-to-Action Group */}
              <div
                className="flex flex-col gap-3 mt-auto"
                role="group"
                aria-label={`Purchase actions for ${card.pricingHeader}`}
              >
                {card.pricingButton.map((btn) => (
                  <button
                    key={btn.id}
                    type="button"
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      btn.type === 'PRIMARY'
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-600 shadow-sm'
                        : 'border-2 border-gray-200 text-gray-900 hover:border-gray-900 focus-visible:ring-indigo-600'
                    }`}
                  >
                    {btn.lable}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

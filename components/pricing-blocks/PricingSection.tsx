import { PricingData } from '@/utils/types';

interface Props {
  data: PricingData;
}

export const PricingSection = ({ data }: Props) => {
  return (
    <section className="py-10 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{data.mainHeader}</h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{data.subHeader}</p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.priceCard.map((card) => (
            <div
              key={card.id}
              className="flex flex-col p-8 bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900">{card.pricingHeader}</h3>
              <p className="text-sm font-medium text-indigo-600 uppercase tracking-wider mt-1 mb-4">
                {card.pricingLable}
              </p>

              <div className="text-4xl font-extrabold text-gray-900 mb-6">{card.PricingRate}</div>

              <div className="flex-1 text-gray-600 mb-8 whitespace-pre-line leading-relaxed">
                {card.pricingBenefits}
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                {card.pricingButton.map((btn) => (
                  <button
                    key={btn.id}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                      btn.type === 'PRIMARY'
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'border-2 border-gray-200 text-gray-900 hover:border-gray-900'
                    }`}
                  >
                    {btn.lable}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

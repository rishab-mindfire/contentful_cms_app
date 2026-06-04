import { ComponentProps } from 'react';
import { PricingData } from '../types';
import CardGrid from '@/components/landing-blocks/CardGrid';
import ContentWithImage from '@/components/landing-blocks/ContentWithImage';

export const mockArticle = {
  id: 123,
  documentId: 'doc-abc-456',
  title: 'Mastering JavaScript Components',
  description: 'A deep dive into writing clean components.',
  slug: 'mastering-javascript-components',
  createdAt: '2026-06-01',

  //  static literal evaluation
  content: JSON.parse(
    JSON.stringify([
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'This is the main rich-text body content.' }],
      },
    ]),
  ),

  featuredImage: {
    id: 1,
    url: '/uploads/featured-banner.jpg',
    alternativeText: 'Banner',
  },
  author: {
    id: 9,
    fullName: 'Jane Doe',
    bio: 'Writer.',
    image: {
      id: 2,
      url: '/uploads/jane-avatar.jpg',
      alternativeText: 'Avatar',
    },
  },
};

// mock response for article
export const mockResponseArticle = {
  data: [{ id: 1, attributes: { title: 'Test Article' } }],
  meta: { pagination: { page: 1, pageSize: 5, pageCount: 1, total: 1 } },
};

// mock for card details
export const mockProps: ComponentProps<typeof CardGrid> = {
  id: 1,
  __component: 'blocks.card-grid',
  cards: [
    { id: 1, heading: 'Feature One', text: 'This is the first feature description.' },
    { id: 2, heading: 'Feature Two', text: 'This is the second feature description.' },
  ],
};

///
export const baseProps: ComponentProps<typeof ContentWithImage> = {
  id: 1,
  __component: 'blocks.component-content-with-image',
  heading: 'Illustration for Visual Breakdown',
  reversed: false,
  image: {
    id: 1,
    documentId: 'file-doc-xyz-789',
    url: '/mock-graphic.jpg',
    alternativeText: 'Illustration for Visual Breakdown',
  },
  content: [
    {
      type: 'paragraph',
      children: [{ type: 'text', text: '' }],
    },
  ],
  link: {
    id: 1,
    href: '#',
    lable: 'Learn More',
    isExternal: false,
    isButtonLink: false,
    type: 'PRIMARY',
  },
};
// Mock data for PricingData
export const mockPricingData: PricingData = {
  mainHeader: 'Choose the Right Plan',
  subHeader: 'Simple, transparent pricing for everyone.',
  priceCard: [
    {
      id: 1,
      pricingHeader: 'Basic Plan',
      pricingLable: 'Popular',
      PricingRate: '$19/mo',
      pricingBenefits: 'Benefit 1\nBenefit 2\nBenefit 3',
      pricingButton: [
        {
          id: 1,
          lable: 'Get Started',
          type: 'PRIMARY',
          href: '/',
          isExternal: false,
          isButtonLink: false,
        },
      ],
    },
    {
      id: 2,
      pricingHeader: 'Pro Plan',
      pricingLable: 'Best Value',
      PricingRate: '$49/mo',
      pricingBenefits: 'All Basic benefits\nPriority Support',
      pricingButton: [
        {
          id: 2,
          lable: 'Buy Pro',
          type: 'PRIMARY',
          href: '/',
          isExternal: true,
          isButtonLink: false,
        },
        {
          id: 3,
          lable: 'Learn More',
          type: 'SECONDARY',
          href: '',
          isExternal: true,
          isButtonLink: false,
        },
      ],
    },
  ],
  id: 0,
  documentId: '',
};

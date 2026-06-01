import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import React, { ComponentProps } from 'react';
import CardGrid from './CardGrid';
import ContentWithImage from './ContentWithImage';
import Faqs from './Faqs';

//  Globally Typed Mocks
vi.mock('@/utils/helperFunctions', () => ({
  getFullUrl: (url: string): string => `https://strapi-cdn.com${url}`,
}));

// Mock Next.js Image component using React.ComponentProps
vi.mock('next/image', () => ({
  default: (props: ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} data-testid="next-image" />
  ),
}));

// CardGrid Component Tests
describe('CardGrid Component', () => {
  const mockProps: ComponentProps<typeof CardGrid> = {
    id: 1,
    __component: 'blocks.card-grid',
    cards: [
      { id: 1, heading: 'Feature One', text: 'This is the first feature description.' },
      { id: 2, heading: 'Feature Two', text: 'This is the second feature description.' },
    ],
  };

  it('renders all feature items correctly inside the grid layout', () => {
    render(<CardGrid {...mockProps} />);

    expect(screen.getByRole('heading', { level: 3, name: 'Feature One' })).toBeInTheDocument();
    expect(screen.getByText('This is the first feature description.')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 3, name: 'Feature Two' })).toBeInTheDocument();
    expect(screen.getByText('This is the second feature description.')).toBeInTheDocument();
  });
});

// ContentWithImage Component Tests
describe('ContentWithImage Component', () => {
  const baseProps: ComponentProps<typeof ContentWithImage> = {
    id: 1,
    __component: 'blocks.component-content-with-image',
    heading: 'Visual Breakdown',
    reversed: false,
    image: {
      id: 1,
      documentId: 'file-doc-xyz-789',
      url: '/mock-graphic.jpg',
      alternativeText: 'Visual Breakdown',
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

  it('renders standard text heading and resolves asset image urls correctly', () => {
    render(<ContentWithImage {...baseProps} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Visual Breakdown' })).toBeInTheDocument();

    const renderedImg = screen.getByTestId('next-image');
    expect(renderedImg).toBeInTheDocument();
    expect(renderedImg).toHaveAttribute('src', 'https://strapi-cdn.com/mock-graphic.jpg');
    expect(renderedImg).toHaveAttribute('alt', 'Visual Breakdown');
  });

  it('toggles CSS styling class arrays appropriately when structural layout is reversed', () => {
    const { container } = render(<ContentWithImage {...baseProps} reversed={true} />);
    const sectionElement = container.querySelector('section');

    expect(sectionElement).toHaveClass('md:flex-row-reverse');
  });
});

// Faqs Component Tests
describe('Faqs Component Accordion Interactivity', () => {
  const mockProps: ComponentProps<typeof Faqs> = {
    id: 1,
    __component: 'blocks.faqs',
    Faq: [
      {
        id: 10,
        heading: 'What is your refund policy?',
        text: 'We offer a full 30-day money back guarantee.',
      },
      {
        id: 11,
        heading: 'Do you support self-hosting?',
        text: 'Yes, Docker files are ready out of the box.',
      },
    ],
  };

  it('renders a structured question header panel layout in initial closed state', () => {
    render(<Faqs {...mockProps} />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Frequently Asked Questions' }),
    ).toBeInTheDocument();

    const accordionButtons = screen.getAllByRole('button');
    expect(accordionButtons).toHaveLength(2);

    expect(accordionButtons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(accordionButtons[1]).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens panel content and manages active expansion state dynamically on button user click', async () => {
    const user = userEvent.setup();
    render(<Faqs {...mockProps} />);

    const firstQuestionButton = screen.getByRole('button', {
      name: /What is your refund policy?/i,
    });

    // Expand first element
    await user.click(firstQuestionButton);
    expect(firstQuestionButton).toHaveAttribute('aria-expanded', 'true');

    // Collapse first element
    await user.click(firstQuestionButton);
    expect(firstQuestionButton).toHaveAttribute('aria-expanded', 'false');
  });
});

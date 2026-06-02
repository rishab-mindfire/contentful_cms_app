import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import React, { ComponentProps } from 'react';
import CardGrid from './CardGrid';
import Faqs from './Faqs';
import { baseProps, mockProps } from '@/utils/mocks/mocks';
import ContentWithImage from './ContentWithImage';

// Globally Typed Mocks
vi.mock('@/utils/helperFunctions', () => ({
  getFullUrl: (url: string): string => `https://strapi-cdn.com${url}`,
}));

vi.mock('next/image', () => ({
  default: (props: ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} data-testid="next-image" />
  ),
}));

// CardGrid Component Tests
describe('CardGrid Component', () => {
  it('renders all feature items correctly inside the grid layout', () => {
    render(<CardGrid {...mockProps} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Feature One' })).toBeInTheDocument();
    expect(screen.getByText('This is the first feature description.')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Feature Two' })).toBeInTheDocument();
    expect(screen.getByText('This is the second feature description.')).toBeInTheDocument();
  });
});

// ContentWithImage Component Tests
describe('ContentWithImage Component', () => {
  it('renders standard text heading and resolves asset image urls correctly', () => {
    render(<ContentWithImage {...baseProps} />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Illustration for Visual Breakdown' }),
    ).toBeInTheDocument();

    const renderedImg = screen.getByTestId('next-image');
    expect(renderedImg).toBeInTheDocument();

    //  Alt text title to include the contextual helper fallback string
    expect(renderedImg).toHaveAttribute(
      'alt',
      'Illustration for Illustration for Visual Breakdown',
    );
  });

  it('toggles CSS styling class arrays appropriately when structural layout is reversed', () => {
    const { container } = render(<ContentWithImage {...baseProps} reversed={true} />);
    const sectionElement = container.querySelector('section');

    expect(sectionElement).toHaveClass('md:flex-row-reverse');
  });
});

// Faqs Component Tests
describe('Faqs Component Accordion Interactivity', () => {
  const mockFaqProps: ComponentProps<typeof Faqs> = {
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
    render(<Faqs {...mockFaqProps} />);

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
    render(<Faqs {...mockFaqProps} />);

    //test for
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

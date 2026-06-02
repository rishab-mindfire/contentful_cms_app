import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PricingSection } from './PricingSection';
import { mockPricingData } from '@/utils/mocks/mocks';

describe('PricingSection Component', () => {
  it('renders the main header and subheader correctly', () => {
    render(<PricingSection data={mockPricingData} />);

    expect(screen.getByRole('heading', { name: /choose the right plan/i })).toBeInTheDocument();
    expect(screen.getByText(/simple, transparent pricing for everyone\./i)).toBeInTheDocument();
  });

  it('renders the correct number of pricing cards with their details', () => {
    render(<PricingSection data={mockPricingData} />);

    // Verify card content
    expect(screen.getByRole('heading', { name: /basic plan/i })).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.getByText('$19/mo')).toBeInTheDocument();
    expect(screen.getByText(/all basic benefits.*priority support/i)).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /pro plan/i })).toBeInTheDocument();
    expect(screen.getByText('Best Value')).toBeInTheDocument();
    expect(screen.getByText('$49/mo')).toBeInTheDocument();
  });

  it('applies correct styling classes to buttons based on their type', () => {
    render(<PricingSection data={mockPricingData} />);

    const primaryButton = screen.getByRole('button', { name: /get started/i });
    const secondaryButton = screen.getByRole('button', { name: /learn more/i });

    // Assert primary button classes
    expect(primaryButton).toHaveClass('bg-indigo-600', 'text-white');
    expect(primaryButton).not.toHaveClass('border-2', 'border-gray-200');

    // Assert secondary button classes
    expect(secondaryButton).toHaveClass('border-2', 'border-gray-200', 'text-gray-900');
    expect(secondaryButton).not.toHaveClass('bg-indigo-600', 'text-white');
  });

  it('renders multiple buttons within a single card if provided', () => {
    render(<PricingSection data={mockPricingData} />);

    // Pro plan card has 2 buttons
    const proButtons = screen.getAllByRole('button');
    // Total buttons across all cards = 1 (Basic) + 2 (Pro) = 3
    expect(proButtons).toHaveLength(3);

    expect(screen.getByRole('button', { name: /buy pro/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
  });
});

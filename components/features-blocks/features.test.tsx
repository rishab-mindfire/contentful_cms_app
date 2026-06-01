/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BlogCard from './BlogCard';
import { mockArticle } from '@/utils/mocks/mocks';

// Mock the helper utilities
vi.mock('@/utils/helperFunctions', () => ({
  formattedDate: (date: string) => `Formatted: ${date}`,
  getFullUrl: (url: string) => `https://example.com${url}`,
}));

// Mock the Strapi rich-text Markdown renderer component
vi.mock('../landing-blocks/Markdown', () => ({
  default: ({ content }: { content: any }) => (
    <div data-testid="markdown-content">{JSON.stringify(content)}</div>
  ),
}));

// Create mock data strictly mirroring your Article interface
describe('BlogCard Component', () => {
  it('renders all article details and inner components accurately', () => {
    render(<BlogCard article={mockArticle} />);
    // Assert Title and Description are rendered
    expect(screen.getByText('Mastering JavaScript Components')).toBeInTheDocument();
    expect(screen.getByText(/A deep dive into writing clean components/i)).toBeInTheDocument();

    // Assert Author profile name is visible
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    // Assert the routing link targets the correct slug route
    const articleLink = screen.getByRole('link');
    expect(articleLink).toHaveAttribute('href', '/blog/mastering-javascript-components');

    // Assert the Markdown rich text container caught the blocks array data
    const markdownContainer = screen.getByTestId('markdown-content');
    expect(markdownContainer).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import React, { ComponentProps, ReactNode } from 'react';
import { useGlobal } from '../GlobalContext';
import { signIn, signInSocial } from '../../lib/actions/auth-action';
import AuthClientPage from './auth-client';
import { mockGlobalContextValues } from '@/utils/mocks/mocks';

// Module Mocks & Sub-component Stubs
vi.mock('../GlobalContext', () => ({
  useGlobal: vi.fn(),
}));

vi.mock('../../lib/actions/auth-action', () => ({
  signIn: vi.fn(),
  signInSocial: vi.fn(),
  signUp: vi.fn(),
}));

vi.mock('@/utils/helperFunctions', () => ({
  getFullUrl: (url: string): string => `https://strapi-cdn.com${url}`,
}));

vi.mock('next/image', () => ({
  default: (props: ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} data-testid="mock-image" />
  ),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  ),
}));

vi.mock('@/components/ui/loader', () => ({
  Loader: () => <span data-testid="mock-loader">Loading...</span>,
}));

vi.mock('@/components/ui/socialAuth', () => ({
  SocialAuth: ({
    handleSocialAuth,
    isLoading,
  }: {
    handleSocialAuth: (provider: 'google' | 'github') => Promise<void>;
    isLoading: boolean;
  }) => (
    <div data-testid="social-auth">
      <button disabled={isLoading} onClick={() => handleSocialAuth('google')}>
        Google Login
      </button>
    </div>
  ),
}));

// auth compnent tests
describe('AuthClientPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders standard fallback notice layout if the database reports offline status', () => {
    vi.mocked(useGlobal).mockReturnValue({
      ...mockGlobalContextValues,
      isDbDown: true,
    });

    render(<AuthClientPage />);

    expect(screen.getByText(/Configuration {2}unavailable/i)).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('renders initial Sign In form layout alongside localized labels from layout context', () => {
    vi.mocked(useGlobal).mockReturnValue(mockGlobalContextValues);

    render(<AuthClientPage />);

    // Assert localized labels are read properly from context mock
    expect(screen.getByText('My CMS Platform')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Password Secure')).toBeInTheDocument();

    // Name input fields must remain hidden during pure sign-in flows
    expect(screen.queryByText('Full Name')).not.toBeInTheDocument();
  });

  it('toggles contextual fields cleanly when changing view state to Sign Up', async () => {
    const user = userEvent.setup();
    vi.mocked(useGlobal).mockReturnValue(mockGlobalContextValues);

    render(<AuthClientPage />);

    const switchModeButton = screen.getByRole('button', {
      name: /Don't have an account\? Sign up/i,
    });
    await user.click(switchModeButton);

    // Form transforms to register view
    expect(screen.getByText('Full Name')).toBeInTheDocument();
  });

  it('triggers server auth actions on submission with client context credentials', async () => {
    const user = userEvent.setup();
    vi.mocked(useGlobal).mockReturnValue(mockGlobalContextValues);
    vi.mocked(signIn).mockResolvedValue({ success: true, error: '' });

    render(<AuthClientPage />);

    // Capture standard inputs
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitBtn = screen.getByRole('button', { name: 'Sign In' });

    await user.type(emailInput, 'testuser@platform.com');
    await user.type(passwordInput, 'secretPass123');
    await user.click(submitBtn);

    expect(signIn).toHaveBeenCalledWith('testuser@platform.com', 'secretPass123');
  });

  it('toggles contextual fields cleanly when changing view state to Sign Up', async () => {
    const user = userEvent.setup();
    vi.mocked(useGlobal).mockReturnValue(mockGlobalContextValues);

    render(<AuthClientPage />);

    //  Initially, it says "Sign In". Find and click the toggle button.
    // The toggle button text in your code is: "Don't have an account? Sign up"
    const switchModeButton = screen.getByRole('button', {
      name: /Don't have an account\? Sign up/i,
    });
    await user.click(switchModeButton);

    // Now that state has changed, the H1 updates to 'Create Account'
    const signUpHeading = screen.getByRole('heading', { level: 1, name: 'Create Account' });
    expect(signUpHeading).toBeInTheDocument();

    // The submit button text should also now read 'Create Account'
    const submitButton = screen.getByRole('button', { name: 'Create Account' });
    expect(submitButton).toBeInTheDocument();
  });

  it('executes alternative dynamic social integrations via button interaction handlers', async () => {
    const user = userEvent.setup();
    vi.mocked(useGlobal).mockReturnValue(mockGlobalContextValues);
    vi.mocked(signInSocial).mockResolvedValue(undefined);

    render(<AuthClientPage />);

    const providerTriggerButton = screen.getByRole('button', { name: 'Google Login' });
    await user.click(providerTriggerButton);

    expect(signInSocial).toHaveBeenCalledWith('google');
  });
});

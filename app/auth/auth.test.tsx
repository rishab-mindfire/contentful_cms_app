import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import AuthClientPage from './auth-client';
import { signIn, signInSocial, signUp } from '../../lib/actions/auth-action';

// Mock Next.js Navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock Auth Server Actions
vi.mock('../../lib/actions/auth-action', () => ({
  signIn: vi.fn(),
  signInSocial: vi.fn(),
  signUp: vi.fn(),
}));

// Mock Global Context Hook
vi.mock('../GlobalContext', () => ({
  useGlobal: vi.fn(),
}));

// Mock child components to isolate page logic
vi.mock('@/components/ui/loader', () => ({
  Loader: () => <span data-testid="loader">Loading...</span>,
}));

vi.mock('@/components/ui/socialAuth', () => ({
  SocialAuth: ({
    handleSocialAuth,
    isLoading,
  }: {
    handleSocialAuth: (p: 'google' | 'github') => void;
    isLoading: boolean;
  }) => (
    <button
      disabled={isLoading}
      onClick={() => handleSocialAuth('google')}
      data-testid="social-auth-btn"
    >
      Google Login
    </button>
  ),
}));

describe('AuthClientPage Component (Vitest)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the sign-in form by default with contextual fields', () => {
    render(<AuthClientPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sign In');
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Name field should not present during basic Sign-In
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
  });

  it('switches seamlessly to sign-up view when requested', async () => {
    const user = userEvent.setup();
    render(<AuthClientPage />);

    const toggleBtn = screen.getByRole('button', { name: /don't have an account\? sign up/i });
    await user.click(toggleBtn);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Create Account');
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /already have an account\? sign in/i }),
    ).toBeInTheDocument();
  });

  it('submits credentials through the signIn server action successfully', async () => {
    const user = userEvent.setup();
    vi.mocked(signIn).mockResolvedValue({ success: true, error: '' });

    render(<AuthClientPage />);

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'securePassword123');

    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(signIn).toHaveBeenCalledWith('user@example.com', 'securePassword123');
  });

  it('triggers signUp action and redirects on valid registration', async () => {
    const user = userEvent.setup();
    vi.mocked(signUp).mockResolvedValue({ success: true, error: '' });

    render(<AuthClientPage />);

    // Switch to Sign Up
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    // Populate data
    await user.type(screen.getByLabelText(/full name/i), 'Alex Doe');
    await user.type(screen.getByLabelText(/email/i), 'alex@example.com');
    await user.type(screen.getByLabelText(/password/i), 'superPassword');

    await user.click(screen.getByRole('button', { name: 'Create Account' }));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith('alex@example.com', 'superPassword', 'Alex Doe');
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('renders a warning fallback state if backend explicitly sets failure hooks', async () => {
    const user = userEvent.setup();
    vi.mocked(signIn).mockResolvedValue({ success: false, error: 'Invalid password provided.' });

    render(<AuthClientPage />);

    await user.type(screen.getByLabelText(/email/i), 'wrong@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    const errorAlert = await screen.findByRole('alert');
    expect(errorAlert).toHaveTextContent('Invalid password provided.');
  });

  it('triggers the signInSocial runtime method when social links are selected', async () => {
    const user = userEvent.setup();
    render(<AuthClientPage />);

    const socialBtn = screen.getByTestId('social-auth-btn');
    await user.click(socialBtn);

    expect(signInSocial).toHaveBeenCalledWith('google');
  });
});

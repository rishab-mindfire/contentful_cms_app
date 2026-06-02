import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/actions/auth-action';
import { SessionType } from '@/utils/types';
import DashboardClientPage from './dashboard-client';

// Module Mocks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/lib/actions/auth-action', () => ({
  signOut: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: (props: ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} data-testid="mock-avatar" />
  ),
}));

describe('DashboardClientPage Component', () => {
  const mockPush = vi.fn();

  // SessionType data
  const mockSession: SessionType = {
    session: {
      id: 'sess_mock_123456',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-06-01T00:00:00.000Z'),
      userId: 'usr_mock_998877',
      expiresAt: new Date('2026-12-31T23:59:59.000Z'),
      token: 'jwt_mock_token_string_abcxyz',
      ipAddress: '127.0.0.1',
      userAgent: 'Mozilla/5.0 (Vitest JSDOM Engine)',
    },
    user: {
      id: 'usr_mock_998877',
      name: 'Jane Doe',
      email: 'jane.doe@platform.com',
      image: '/custom-avatar.png',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-06-01T00:00:00.000Z'),
      emailVerified: false,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Set up standard useRouter return structure
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      forward: vi.fn(),
      back: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  });

  it('renders user details and profile image from the active session cleanly', () => {
    render(<DashboardClientPage session={mockSession} />);

    // Assert profile header parameters exist
    expect(
      screen.getByRole('heading', { level: 1, name: /welcome,\s*jane doe/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('jane.doe@platform.com')).toBeInTheDocument();

    // Assert image renders custom avatar URL correctly
    const avatarImg = screen.getByTestId('mock-avatar');
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', '/custom-avatar.png');
    expect(avatarImg).toHaveAttribute('alt', "Jane Doe's profile avatar");
  });

  it('falls back to default asset string when user image property is absent or null', () => {
    const sessionWithoutImage: SessionType = {
      ...mockSession,
      user: {
        ...mockSession.user,
        image: null,
      },
    };

    render(<DashboardClientPage session={sessionWithoutImage} />);

    const avatarImg = screen.getByTestId('mock-avatar');
    expect(avatarImg).toHaveAttribute('src', '/default-avatar.png');
    expect(avatarImg).toHaveAttribute('alt', "Jane Doe's profile avatar");
  });

  it('triggers sign out routine and pushes user cleanly to authorization portal route', async () => {
    const user = userEvent.setup();

    vi.mocked(signOut).mockResolvedValue({ success: true });

    render(<DashboardClientPage session={mockSession} />);

    const signOutBtn = screen.getByRole('button', { name: 'Sign Out' });
    await user.click(signOutBtn);

    // Server cleared state, then app handled navigation redirection
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/auth');
  });
});

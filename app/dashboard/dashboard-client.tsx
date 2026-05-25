'use client';
import { signOut } from '@/lib/actions/auth-action';
import { cn } from '@/lib/utils';
import { SessionType } from '@/utils/types';
import { useRouter } from 'next/navigation';

export default function DashboardClientPage({ session }: { session: SessionType }) {
  const router = useRouter();
  const user = session.user;

  // Redirect to auth if not authenticated
  const handleSignOut = async () => {
    await signOut();
    router.push('/auth');
  };

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pt-20">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user.name}</h2>
                <p className="text-gray-600">Explore your account</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <p className="text-gray-900 font-medium">{user.name}</p>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button onClick={handleSignOut} className={cn('btn-secondary')}>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

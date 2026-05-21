'use client';
import { signOut } from '@/lib/actions/auth-action';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardClientPage() {
  const router = useRouter();
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome to Your Dashboard!
                </h2>
                <p className="text-gray-600">Manage your account and explore</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3">
                  {/* <Image
                    alt='profile image'
                    className="h-10 w-10 rounded-full"
                    src={
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
                    }
                  /> */}
                  <div className="text-sm">
                    <p className="text-gray-900 font-medium">John Doe</p>
                    <p className="text-gray-500">email@gmail.com</p>
                  </div>
                </div>
                <button onClick={handleSignOut} className={cn('btn-secondary py-0')}>
                  Sign Out
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/" className="btn-secondary">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

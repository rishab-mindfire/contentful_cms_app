'use client';
import { signOut } from '@/lib/actions/auth-action';
import { SessionType } from '@/utils/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DashboardClientPage({ session }: { session: SessionType }) {
  const router = useRouter();
  const user = session.user;

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <main className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* User Info */}
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-gray-50 shadow-md">
                <Image
                  src={user.image || '/default-avatar.png'}
                  alt={user.name || 'User avatar'}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h2>
                <p className="text-lg text-gray-600">{user.email}</p>
                <div className="w-12 h-1 bg-indigo-600 rounded-full mt-2" />
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full md:w-auto px-6 py-3 font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

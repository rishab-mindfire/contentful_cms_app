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
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Avatar Image */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100">
                <Image
                  src={user.image || '/default-avatar.png'}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

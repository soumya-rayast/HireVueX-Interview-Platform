'use client';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { api } from '../../../../convex/_generated/api';

export default function SelectRolePage() {
  const { user } = useUser();
  const updateUser = useMutation(api.users.updateUserRole);
  const router = useRouter();

  if (!user) {
    return <div>Loading...</div>; // Show loading if user is not available
  }

  const handleSelect = async (role: 'candidate' | 'interviewer') => {
    try {
      await updateUser({ clerkId: user!.id, role });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error during role selection:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6  p-6">
      <h1 className="text-3xl font-semibold text-white mb-8">Select Your Role</h1>
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={() => handleSelect('candidate')}
          className="px-8 py-3 text-lg font-semibold text-white border border-gray-300 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Candidate
        </button>
        <button
          onClick={() => handleSelect('interviewer')}
          className="px-8 py-3 text-lg font-semibold text-white border border-gray-300 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Interviewer
        </button>
      </div>
    </div>
  );
}
 
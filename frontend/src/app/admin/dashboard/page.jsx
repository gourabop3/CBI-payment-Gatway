"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { axiosClient } from '@/utils/AxiosClient';
import { toast } from 'react-toastify';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin-login');
      return;
    }
    const fetchStats = async () => {
      try {
        const res = await axiosClient.get('/admin/stats', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        setStats(await res.data);
      } catch (error) {
        toast.error('Session expired, please login again');
        localStorage.removeItem('admin_token');
        router.push('/admin-login');
      }
    };
    fetchStats();
  }, []);

  if (!stats) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-xl">{stats.msg}</p>
        <p className="text-lg mt-2">User count: {stats.userCount}</p>
      </div>
    </div>
  );
}
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { axiosClient } from '@/utils/AxiosClient';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState([]);
  const [users, setUsers] = useState([]);

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

        // fetch pending kyc
        const kycRes = await axiosClient.get('/kyc/pending', {
          headers: { Authorization: 'Bearer ' + token },
        });
        setPending(await kycRes.data);

        // fetch users
        const userRes = await axiosClient.get('/admin/users', {
          headers: { Authorization: 'Bearer ' + token },
        });
        setUsers(await userRes.data);
      } catch (error) {
        toast.error('Session expired, please login again');
        localStorage.removeItem('admin_token');
        router.push('/admin-login');
      }
    };
    fetchStats();
  }, []);

  const adminLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin-login';
  };

  if (!stats) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={adminLogout} className="bg-rose-600 text-white px-4 py-1 rounded">Logout</button>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-xl">{stats.msg}</p>
        <p className="text-lg mt-2">User count: {stats.userCount}</p>
      </div>

      <h2 className="text-2xl font-bold my-6">Pending KYC Applications</h2>
      {pending.length === 0 ? <p>No pending applications.</p> : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full text-sm text-left">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Aadhaar</th>
                <th className="px-4 py-2">PAN</th>
                <th className="px-4 py-2">Docs</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((app) => (
                <tr key={app._id} className="border-b">
                  <td className="px-4 py-2">{app.user?.name}<br/><span className="text-xs text-gray-500">{app.user?.email}</span></td>
                  <td className="px-4 py-2">{app.aadhaarNumber}</td>
                  <td className="px-4 py-2">{app.panNumber}</td>
                  <td className="px-4 py-2 space-x-2">
                    <a href={app.documents?.aadhaarImage} target="_blank" className="text-blue-600 underline">Aadhaar</a>
                    <a href={app.documents?.panImage} target="_blank" className="text-blue-600 underline">PAN</a>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleApprove(app._id)} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
                    <button onClick={() => handleReject(app._id)} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Users table */}
      <h2 className="text-2xl font-bold my-6">Users</h2>
      {users.length === 0 ? <p>No users.</p> : (
        <div className="overflow-x-auto bg-white shadow rounded mb-6">
          <table className="min-w-full text-sm text-left">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Active</th>
                <th className="px-4 py-2">Joined</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-b">
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.isActive ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => toggleActivation(u)} className="px-3 py-1 bg-indigo-600 text-white rounded">{u.isActive ? 'Deactivate' : 'Activate'}</button>
                    <button onClick={() => editProfile(u)} className="px-3 py-1 bg-amber-600 text-white rounded">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

async function adminAction(id, type) {
  const token = localStorage.getItem('admin_token');
  if (!token) return;
  const url = type === 'approve' ? `/kyc/approve/${id}` : `/kyc/reject/${id}`;
  await axiosClient.post(url, {}, { headers: { Authorization: 'Bearer ' + token } });
}

function handleApprove(id) {
  adminAction(id, 'approve')
    .then(() => {
      toast.success('Approved');
      window.location.reload();
    })
    .catch((err) => toast.error(err.response?.data?.msg || err.message));
}

function handleReject(id) {
  const reason = prompt('Enter reason for rejection (optional)');
  const token = localStorage.getItem('admin_token');
  axiosClient.post(`/kyc/reject/${id}`, { reason }, { headers: { Authorization: 'Bearer ' + token } })
    .then(() => {
      toast.info('Rejected');
      window.location.reload();
    })
    .catch((err) => toast.error(err.response?.data?.msg || err.message));
}

function toggleActivation(user) {
  const token = localStorage.getItem('admin_token');
  axiosClient.post(`/admin/user/${user._id}/activation`, { state: !user.isActive }, { headers: { Authorization: 'Bearer ' + token } })
    .then(() => {
      toast.success('Status changed');
      window.location.reload();
    })
    .catch(err => toast.error(err.response?.data?.msg || err.message));
}

function editProfile(user) {
  const name = prompt('Name', user.name);
  if (name === null) return;
  const email = prompt('Email', user.email);
  if (email === null) return;
  const mobile = prompt('Mobile (leave blank to keep)', '');
  const bio = prompt('Bio (leave blank to keep)', '');
  const token = localStorage.getItem('admin_token');
  axiosClient.post(`/admin/user/${user._id}/update-profile`, { name, email, mobile_no: mobile, bio }, { headers: { Authorization: 'Bearer ' + token } })
    .then(() => {
      toast.success('Profile updated');
      window.location.reload();
    })
    .catch(err => toast.error(err.response?.data?.msg || err.message));
}
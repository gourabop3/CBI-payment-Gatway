"use client";
import { useEffect, useState } from 'react';
import { axiosClient } from '@/utils/AxiosClient';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function AdminTransactionsPage(){
  const router = useRouter();
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const token = localStorage.getItem('admin_token');
    if(!token){
      router.push('/admin-login');
      return;
    }
    axiosClient.get('/admin/transactions',{ headers:{ Authorization:'Bearer '+token }})
      .then(res=> setData(res.data.data))
      .catch(err=> toast.error(err.response?.data?.msg || err.message))
      .finally(()=> setLoading(false));
  },[]);

  if(loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Transactions</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2">User</th>
            <th className="px-3 py-2">Amount</th>
            <th className="px-3 py-2">Type</th>
            <th className="px-3 py-2">Remark</th>
            <th className="px-3 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(txn=> (
            <tr key={txn._id} className="border-b hover:bg-gray-50">
              <td className="px-3 py-2">{txn.user?.name}</td>
              <td className="px-3 py-2">₹{txn.amount}</td>
              <td className="px-3 py-2 capitalize">{txn.type}</td>
              <td className="px-3 py-2">{txn.remark?.slice(0,40)}</td>
              <td className="px-3 py-2">{new Date(txn.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
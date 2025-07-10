"use client";
import { useEffect, useState } from 'react';
import { axiosClient } from '@/utils/AxiosClient';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function DiscountsPage(){
  const router = useRouter();
  const [list,setList] = useState([]);
  const [form,setForm] = useState({ code:'', discountType:'percent', value:0, minAmount:0, validTo:''});
  const token = typeof window!=='undefined'? localStorage.getItem('admin_token'):null;

  const fetchData = ()=>{
    if(!token){ router.push('/admin-login'); return; }
    axiosClient.get('/admin/discounts',{ headers:{ Authorization:'Bearer '+token }})
      .then(res=> setList(res.data))
      .catch(err=> toast.error(err.response?.data?.msg || err.message));
  }
  useEffect(fetchData,[]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    axiosClient.post('/admin/discount',{...form},{ headers:{ Authorization:'Bearer '+token }})
      .then(()=>{ toast.success('Saved'); fetchData(); })
      .catch(err=> toast.error(err.response?.data?.msg || err.message));
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Discount Codes</h1>
      {/* form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-4 max-w-3xl">
        <input placeholder="CODE" value={form.code} onChange={e=>setForm({...form, code:e.target.value.toUpperCase()})} className="border p-2" required />
        <select value={form.discountType} onChange={e=>setForm({...form, discountType:e.target.value})} className="border p-2">
          <option value="percent">Percent %</option><option value="flat">Flat ₹</option>
        </select>
        <input type="number" placeholder="Value" value={form.value} onChange={e=>setForm({...form, value:e.target.value})} className="border p-2" required />
        <input type="number" placeholder="Min Amount" value={form.minAmount} onChange={e=>setForm({...form, minAmount:e.target.value})} className="border p-2" />
        <input type="date" value={form.validTo} onChange={e=>setForm({...form, validTo:e.target.value})} className="border p-2 col-span-2" required />
        <button className="bg-blue-600 text-white py-2 px-4 rounded col-span-2">Save / Update</button>
      </form>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100"><tr><th className="px-3 py-2">Code</th><th className="px-3 py-2">Type</th><th className="px-3 py-2">Value</th><th className="px-3 py-2">Min</th><th className="px-3 py-2">Used</th><th className="px-3 py-2">Valid Till</th></tr></thead>
          <tbody>
            {list.map(d=> (
              <tr key={d._id} className="border-b hover:bg-gray-50"><td className="px-3 py-2 font-mono">{d.code}</td><td className="px-3 py-2">{d.discountType}</td><td className="px-3 py-2">{d.value}</td><td className="px-3 py-2">{d.minAmount}</td><td className="px-3 py-2">{d.used}/{d.usageLimit}</td><td className="px-3 py-2">{new Date(d.validTo).toLocaleDateString()}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
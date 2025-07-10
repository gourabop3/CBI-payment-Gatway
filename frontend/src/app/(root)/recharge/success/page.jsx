"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function RechargeSuccess(){
  const params = useSearchParams();
  const router = useRouter();

  const txnId = params.get('tx');
  const amount = params.get('amt');
  const mobile = params.get('mob');
  const operator = params.get('op');
  const timestamp = params.get('ts');

  const dateObj = timestamp ? new Date(timestamp) : new Date();
  const dateStr = dateObj.toLocaleDateString();
  const timeStr = dateObj.toLocaleTimeString();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 text-center">
      <FaCheckCircle className="text-green-600 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">Recharge Successful</h1>
      <p className="text-gray-700 mb-6">Your mobile recharge was completed successfully.</p>

      <div className="bg-white shadow rounded-lg w-full max-w-md p-6 text-left">
        <div className="flex justify-between mb-2"><span className="text-gray-500">Transaction ID</span><span className="font-mono font-semibold">{txnId || 'N/A'}</span></div>
        <div className="flex justify-between mb-2"><span className="text-gray-500">Mobile Number</span><span className="font-semibold">{mobile}</span></div>
        {operator && (<div className="flex justify-between mb-2"><span className="text-gray-500">Operator</span><span className="font-semibold capitalize">{operator}</span></div>)}
        <div className="flex justify-between mb-2"><span className="text-gray-500">Amount</span><span className="font-semibold">₹{amount}</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Date &amp; Time</span><span className="font-semibold">{dateStr} {timeStr}</span></div>
      </div>

      <div className="flex gap-3 mt-8">
        <Link href="/recharge" className="px-5 py-2 bg-blue-600 text-white rounded shadow">New Recharge</Link>
        <Link href="/transactions" className="px-5 py-2 border border-blue-600 text-blue-600 rounded shadow">View Transactions</Link>
      </div>
    </div>
  );
}
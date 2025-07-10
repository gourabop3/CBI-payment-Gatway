import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

export default function RechargeSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const txn = searchParams.get('txn');
  const mobile = searchParams.get('mobile');
  const amount = searchParams.get('amount');
  const operator = searchParams.get('operator');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center max-w-md w-full">
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">Recharge Successful</h1>
        <p className="text-gray-600 mb-6">Your mobile recharge was completed successfully!</p>
        <div className="w-full bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Transaction ID:</span>
            <span className="font-mono font-semibold">{txn}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Mobile Number:</span>
            <span className="font-semibold">{mobile}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Operator:</span>
            <span className="font-semibold capitalize">{operator}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Amount:</span>
            <span className="font-bold text-green-700">₹{amount}</span>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => router.push('/recharge')}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition"
          >
            Recharge Again
          </button>
        </div>
      </div>
    </div>
  );
}
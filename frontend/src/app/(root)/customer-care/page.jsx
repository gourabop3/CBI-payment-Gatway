import React from 'react';

export default function CustomerCarePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white rounded-xl shadow p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Customer Care</h1>
        <p className="text-lg text-gray-600 mb-2">For assistance, call our customer care number:</p>
        <div className="text-3xl font-bold text-green-700 mb-4">999999999</div>
      </div>
    </div>
  );
}
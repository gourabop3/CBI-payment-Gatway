"use client";

import React, { useEffect, useState } from 'react';
import HeaderName from '@/components/HeaderName';
import { useMainContext } from '@/context/MainContext';
import { axiosClient } from '@/utils/AxiosClient';
import { FaCode, FaKey, FaPlug } from 'react-icons/fa';

const truncate = (str = '', front = 6, back = 4) => {
  if (str.length <= front + back) return str;
  return `${str.slice(0, front)}...${str.slice(-back)}`;
};

export default function ApiUsePage() {
  const { user } = useMainContext();
  const [keys, setKeys] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchKeys = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axiosClient.get('/api-keys/get-keys', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setKeys(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchKeys();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <HeaderName />

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <FaPlug className="text-blue-600" />
            Developer Integration Guide
          </h2>
          <p className="text-gray-600 mb-6">
            This guide helps you integrate our payment gateway quickly using your API credentials.
          </p>

          {keys?.hasAPIKey ? (
            <>
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaKey className="text-green-600" />
                  Your Credentials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                    <div className="text-sm text-blue-700">API Secret</div>
                    <div className="font-mono break-all text-blue-900">
                      {truncate(keys.api_secret, 8, 8)}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
                    <div className="text-sm text-purple-700">API Hash</div>
                    <div className="font-mono break-all text-purple-900">
                      {truncate(keys.api_hash, 8, 6)}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                    <div className="text-sm text-green-700">Payment Gateway Key</div>
                    <div className="font-mono break-all text-green-900">
                      {truncate(keys.payment_gateway_key, 8, 6)}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
                    <div className="text-sm text-orange-700">Merchant ID</div>
                    <div className="font-mono break-all text-orange-900">
                      {keys.merchant_id}
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <FaCode className="text-indigo-600" />
                  Sample Payment Request
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`curl -X POST ${keys.environment === 'live' ? 'https://api.cbibank.com' : 'https://sandbox.cbibank.com'}/v1/payments \
  -H "Authorization: Bearer ${truncate(keys.api_secret, 8, 8)}" \
  -H "Content-Type: application/json" \
  -H "X-API-Hash: ${truncate(keys.api_hash, 8, 8)}" \
  -d '{
    "merchant_id": "${keys.merchant_id}",
    "amount": 100.00,
    "currency": "INR",
    "callback_url": "https://yoursite.com/callback"
  }'`}
                  </pre>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Steps to Integrate</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Generate or copy your API credentials from the API Keys section.</li>
                  <li>Include the <code className="px-1 py-0.5 bg-gray-100 rounded">Authorization</code> and <code className="px-1 py-0.5 bg-gray-100 rounded">X-API-Hash</code> headers in every request.</li>
                  <li>Use the <code className="px-1 py-0.5 bg-gray-100 rounded">payment_gateway_key</code> in the client-side SDK.</li>
                  <li>Set up your webhook URL in the API Keys section to receive payment status callbacks.</li>
                  <li>Test thoroughly in the <span className="font-medium">{keys.environment}</span> environment before switching to live.</li>
                </ol>
              </section>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
              <p className="text-yellow-700 mb-2 font-medium">No API keys found.</p>
              <p className="text-sm text-yellow-600">Generate your API keys first from the <span className="font-semibold">API Keys</span> section.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
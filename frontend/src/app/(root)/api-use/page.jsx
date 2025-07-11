"use client";

import HeaderName from '@/components/HeaderName';
import React from 'react';
import { FaCode } from 'react-icons/fa';
import { SiNodedotjs, SiReact, SiHtml5 } from 'react-icons/si';

const nodeSample = `const axios = require('axios');

(async () => {
  try {
    const response = await axios.post('https://your-domain.com/api/v1/payment', {
      amount: 5000,
      currency: 'INR',
      order_id: 'ORD-123'
    }, {
      headers: {
        'x-api-key': process.env.API_KEY // replace with your key
      }
    });

    console.log(response.data);
  } catch (err) {
    console.error(err.response?.data || err);
  }
})();`;

const reactSample = `fetch('https://your-domain.com/api/v1/payment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY
  },
  body: JSON.stringify({
    amount: 5000,
    currency: 'INR',
    order_id: 'ORD-123'
  })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);`;

const htmlSample = `<!-- index.html -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
  axios.post('https://your-domain.com/api/v1/payment', {
    amount: 5000,
    currency: 'INR',
    order_id: 'ORD-123'
  }, {
    headers: {
      'x-api-key': 'YOUR_API_KEY'
    }
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
</script>`;

const ApiUse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <HeaderName />
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <FaCode className="text-blue-600" />
            Payment Gateway Integration Guide
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Use your unique API key to start accepting payments instantly. Choose a language/framework below and copy the corresponding example to kick-start your integration.
          </p>

          <div className="space-y-10">
            {/* Node.js */}
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <SiNodedotjs className="text-green-700" /> Node.js (Axios)
              </h3>
              <pre className="bg-gray-100 rounded-lg p-4 text-sm overflow-auto">
                <code>{nodeSample}</code>
              </pre>
            </div>

            {/* React */}
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <SiReact className="text-sky-600" /> React (fetch)
              </h3>
              <pre className="bg-gray-100 rounded-lg p-4 text-sm overflow-auto">
                <code>{reactSample}</code>
              </pre>
            </div>

            {/* HTML */}
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <SiHtml5 className="text-orange-600" /> Plain HTML / JavaScript
              </h3>
              <pre className="bg-gray-100 rounded-lg p-4 text-sm overflow-auto">
                <code>{htmlSample}</code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApiUse;
"use client";
import { useMainContext } from '@/context/MainContext';
import React, { useEffect, useState } from 'react'
import NotValidUser from './+__(components)/NotValidUser';
import HeaderName from '@/components/HeaderName';
import RenGenerateModal from './+__(components)/RenGenerateModal';
import { FaCopy, FaKey, FaShieldAlt, FaCode, FaLock, FaEye, FaEyeSlash, FaSync, FaInfoCircle, FaCreditCard, FaChartLine } from 'react-icons/fa';
import { MdSecurity, MdVpnKey, MdDeveloperMode, MdPayment } from 'react-icons/md';
import { toast } from 'react-toastify';
import { axiosClient } from '@/utils/AxiosClient';
import VerifiedEMailModel from '../profile/+__(components)/VerifiedEMailModel';

// Helper function to truncate long strings like API keys/hashes for cleaner UI
const truncateString = (str, front = 6, back = 4) => {
  if (!str) return '';
  if (str.length <= front + back) return str;
  return `${str.slice(0, front)}...${str.slice(-back)}`;
};

const copy = (text) => {
  if(!text) return;
  navigator.clipboard.writeText(text).then(() => {
    toast.success('Copied to clipboard');
  }).catch(()=>{
    toast.error('Failed to copy');
  });
};

const ApiKeyPage = () => {
  const { user } = useMainContext()
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [apiKeys, setApiKeys] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && user.isEmailVerifed) {
      setIsEmailVerified(true)
      fetchAPIKeys()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchAPIKeys = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      
      if (!token) {
        toast.error('Please login to continue')
        return
      }

      const response = await axiosClient.get('/api-keys/get-keys', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      const data = response.data
      setApiKeys(data)

    } catch (error) {
      console.error('Error fetching API keys:', error)
      const errorMessage = error?.response?.data?.msg || error?.message || 'Failed to fetch API keys'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!isEmailVerified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Please verify your email to access API Keys</h2>
        <VerifiedEMailModel />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading API keys...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <HeaderName/>

        {/* Info/Instruction Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-4">
          <FaInfoCircle className="text-blue-600 text-2xl" />
          <div>
            <h3 className="font-semibold text-blue-800">How to use your API Keys</h3>
            <p className="text-blue-700 text-sm mt-1">
              Use these credentials to integrate with the CBI Bank Payment Gateway. <br/>
              <span className="font-medium">Keep your API Secret and Hash secure.</span> You can copy them using the copy button on each card.
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white bg-opacity-20 p-3 rounded-xl">
              <FaKey className="text-2xl md:text-3xl" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">CBI Payment Gateway</h2>
              <p className="text-indigo-100">Professional API Management & Integration Platform</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <MdSecurity className="text-xl" />
                <span className="text-sm opacity-90">Security</span>
              </div>
              <div className="text-lg font-semibold">Bank Grade</div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaShieldAlt className="text-xl" />
                <span className="text-sm opacity-90">Uptime</span>
              </div>
              <div className="text-lg font-semibold">99.9%</div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <MdDeveloperMode className="text-xl" />
                <span className="text-sm opacity-90">Environment</span>
              </div>
              <div className="text-lg font-semibold">Production</div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaCode className="text-xl" />
                <span className="text-sm opacity-90">API Version</span>
              </div>
              <div className="text-lg font-semibold">v1.0</div>
            </div>
          </div>
        </div>

        {/* API Keys Section */}
        {apiKeys?.hasAPIKey ? (
          <>
            {/* API Usage Statistics */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaChartLine className="text-blue-600" />
                API Usage & Performance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-blue-700">API Calls Today</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-green-700">Success Rate</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">150ms</div>
                  <div className="text-sm text-purple-700">Avg Response</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">10,000</div>
                  <div className="text-sm text-orange-700">Daily Limit</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* API Secret Card */}
              <APICredentialCard
                title="API Secret"
                description="Your private API secret key for authentication"
                value={apiKeys.api_secret}
                icon={<FaLock className="text-2xl text-blue-600" />}
                bgGradient="from-blue-500 to-cyan-500"
                copyLabel="API Secret"
              />

              {/* API Hash Card */}
              <APICredentialCard
                title="API Hash"
                description="Unique hash identifier for your application"
                value={apiKeys.api_hash}
                icon={<FaCode className="text-2xl text-purple-600" />}
                bgGradient="from-purple-500 to-pink-500"
                copyLabel="API Hash"
                truncateFront={8}
                truncateBack={6}
              />

              {/* Payment Gateway Key Card */}
              <APICredentialCard
                title="Payment Gateway Key"
                description="Dedicated key for payment processing"
                value={apiKeys.payment_gateway_key}
                icon={<FaCreditCard className="text-2xl text-green-600" />}
                bgGradient="from-green-500 to-emerald-500"
                copyLabel="Payment Gateway Key"
              />

              {/* Merchant ID Card */}
              <APICredentialCard
                title="Merchant ID"
                description="Your unique merchant identifier"
                value={apiKeys.merchant_id}
                icon={<MdPayment className="text-2xl text-orange-600" />}
                bgGradient="from-orange-500 to-red-500"
                copyLabel="Merchant ID"
              />
            </div>

            {/* Integration Guide Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaCode className="text-green-600" />
                Quick Integration Guide
              </h3>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Basic Payment Request</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`curl -X POST https://api.cbibank.com/v1/payments \\
  -H "Authorization: Bearer YOUR_API_SECRET" \\
  -H "Content-Type: application/json" \\
  -H "X-API-Hash: YOUR_API_HASH" \\
  -d '{
    "merchant_id": "YOUR_MERCHANT_ID",
    "amount": 100.00,
    "currency": "INR",
    "callback_url": "https://yoursite.com/callback"
  }'`}
                    </pre>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2">Base URL</h5>
                    <code className="text-blue-700 text-sm">https://api.cbibank.com/v1</code>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-2">Rate Limit</h5>
                    <code className="text-green-700 text-sm">10,000 requests/day</code>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <div className="text-center">
              <div className="bg-gray-50 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <FaKey className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No API Keys Generated
              </h3>
              <p className="text-gray-600 mb-6">
                Generate your first set of API keys for payment gateway integration
              </p>
            </div>
          </div>
        )}

        {/* Action Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 mb-8">
          <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-50 p-3 rounded-xl">
                <FaSync className="text-2xl text-green-600" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                  API Management
                </h3>
                <p className="text-gray-500 text-sm">
                  {apiKeys?.hasAPIKey ? 'Regenerate your API credentials' : 'Generate your first API credentials'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-amber-600 mt-1" />
                  <div>
                    <p className="text-amber-800 text-sm font-medium">
                      Important Notice
                    </p>
                    <p className="text-amber-700 text-xs mt-1">
                      {apiKeys?.hasAPIKey 
                        ? 'Regenerating will invalidate current keys' 
                        : 'These keys will be required for payment gateway integration'
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <RenGenerateModal onSuccess={fetchAPIKeys} />
            </div>
          </div>
        </div>

        {/* Webhook Configuration Section */}
        {apiKeys?.hasAPIKey && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <MdSecurity className="text-purple-600" />
              Webhook Configuration
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h4 className="font-semibold text-purple-800 mb-3">Payment Webhook URL</h4>
                <div className="flex items-center gap-3 mb-4">
                  <input 
                    type="url" 
                    placeholder="https://yoursite.com/webhook/payment" 
                    className="flex-1 px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Save
                  </button>
                </div>
                <p className="text-purple-700 text-sm">
                  Receive real-time payment status updates and notifications
                </p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h4 className="font-semibold text-orange-800 mb-3">Webhook Security</h4>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-orange-700">HMAC-SHA256 Signature</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-orange-700">SSL/TLS Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-orange-700">IP Whitelist Available</span>
                  </div>
                </div>
                <p className="text-orange-700 text-sm">
                  All webhooks are signed with your API secret for security
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Documentation Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="bg-indigo-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MdVpnKey className="text-2xl text-indigo-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Developer Resources
            </h2>
            <p className="text-gray-600">
              Everything you need to integrate with our payment gateway
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: <FaCode className="text-2xl text-blue-600" />,
                title: "API Documentation",
                description: "Complete documentation for payment processing endpoints",
                link: "#"
              },
              {
                icon: <FaShieldAlt className="text-2xl text-green-600" />,
                title: "Security Guidelines",
                description: "Best practices for secure payment gateway implementation",
                link: "#"
              },
              {
                icon: <MdSecurity className="text-2xl text-purple-600" />,
                title: "Webhook Guide",
                description: "Real-time payment notifications and status updates",
                link: "#"
              },
              {
                icon: <FaInfoCircle className="text-2xl text-orange-600" />,
                title: "SDK Downloads",
                description: "Ready-to-use SDKs for popular programming languages",
                link: "#"
              }
            ].map((resource, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors group cursor-pointer">
                <div className="bg-white p-3 rounded-lg w-fit mb-4 group-hover:shadow-md transition-shadow">
                  {resource.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {resource.description}
                </p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          
          {/* API Status */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-green-800 mb-1">API Status</h4>
                <p className="text-green-700 text-sm">All systems operational</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiKeyPage

const APICredentialCard = ({ 
  title, 
  description, 
  value, 
  icon, 
  bgGradient, 
  copyLabel,
  truncateFront = 6,
  truncateBack = 4 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`h-2 bg-gradient-to-r ${bgGradient}`}></div>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gray-50 p-3 rounded-xl">
            {icon}
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">
              {title}
            </h3>
            <p className="text-gray-500 text-sm">
              {description}
            </p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Credential Value</span>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="text-gray-500 hover:text-gray-700 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
              title={isVisible ? "Hide" : "Show"}
              aria-label={isVisible ? `Hide ${copyLabel}` : `Show ${copyLabel}`}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setIsVisible(!isVisible); }}
            >
              {isVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <code className="bg-white px-3 py-2 rounded border text-gray-800 font-mono text-sm flex-1">
              {isVisible ? value : truncateString(value, truncateFront, truncateBack)}
            </code>
            <button
              onClick={handleCopy}
              className={`bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${copied ? 'ring-2 ring-green-400' : ''}`}
              title={`Copy ${copyLabel}`}
              aria-label={`Copy ${copyLabel}`}
              tabIndex={0}
              onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !copied) handleCopy(); }}
              disabled={copied}
            >
              {copied ? (
                <span className="text-xs font-semibold">Copied!</span>
              ) : (
                <FaCopy />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <FaShieldAlt />
          <span>Secure & Encrypted</span>
        </div>
      </div>
    </div>
  );
};
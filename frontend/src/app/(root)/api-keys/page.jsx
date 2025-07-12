"use client";
import { useMainContext } from '@/context/MainContext';
import React, { useEffect, useState } from 'react'
import NotValidUser from './+__(components)/NotValidUser';
import HeaderName from '@/components/HeaderName';
import RenGenerateModal from './+__(components)/RenGenerateModal';
import { FaCopy, FaKey, FaShieldAlt, FaCode, FaLock, FaEye, FaEyeSlash, FaSync, FaInfoCircle, FaCreditCard, FaChartLine, FaCog, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { MdSecurity, MdVpnKey, MdDeveloperMode, MdPayment, MdSwapHoriz } from 'react-icons/md';
import { toast } from 'react-toastify';
import { axiosClient } from '@/utils/AxiosClient';


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
  const [apiKeys, setApiKeys] = useState(null)
  const [loading, setLoading] = useState(true)
  const [webhookUrl, setWebhookUrl] = useState('')
  const [isUpdatingWebhook, setIsUpdatingWebhook] = useState(false)

  useEffect(() => {
    if (user) {
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
      setWebhookUrl(data.webhook_config?.url || '')

    } catch (error) {
      console.error('Error fetching API keys:', error)
      const errorMessage = error?.response?.data?.msg || error?.message || 'Failed to fetch API keys'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleEnvironmentSwitch = async (environment) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axiosClient.put('/api-keys/environment/switch', 
        { environment }, 
        {
          headers: { 'Authorization': 'Bearer ' + token }
        }
      )
      
      toast.success(response.data.msg)
      fetchAPIKeys()
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Failed to switch environment')
    }
  }

  const handleWebhookSave = async () => {
    try {
      setIsUpdatingWebhook(true)
      const token = localStorage.getItem("token")
      
      const response = await axiosClient.put('/api-keys/webhook/config', 
        { 
          url: webhookUrl,
          events: {
            payment_success: true,
            payment_failed: true,
            refund_processed: true
          }
        }, 
        {
          headers: { 'Authorization': 'Bearer ' + token }
        }
      )
      
      toast.success(response.data.msg)
      fetchAPIKeys()
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Failed to update webhook configuration')
    } finally {
      setIsUpdatingWebhook(false)
    }
  }

  const getBaseUrl = () => {
    return apiKeys?.environment === 'live' 
      ? 'https://api.cbibank.com/v1' 
      : 'https://sandbox.cbibank.com/v1'
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

        {/* Professional Status Bar */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 font-semibold text-sm">All Systems Operational</span>
              </div>
              <div className="hidden md:flex items-center gap-4 text-xs text-green-700">
                <span>API Response Time: <strong>150ms</strong></span>
                <span>Uptime: <strong>99.9%</strong></span>
                <span>Region: <strong>Asia Pacific</strong></span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaInfoCircle className="text-green-600 text-lg" />
              <div className="text-right">
                <div className="text-xs text-green-700">Professional Payment Gateway</div>
                <div className="text-xs text-green-600 font-medium">Ready for Integration</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                <FaKey className="text-2xl md:text-3xl" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold">CBI Payment Gateway</h2>
                <p className="text-indigo-100">Professional API Management & Integration Platform</p>
              </div>
            </div>
            
            {/* Environment Switch */}
            {apiKeys?.hasAPIKey && (
              <div className="flex items-center gap-3">
                <span className="text-sm opacity-90">Environment:</span>
                <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg p-2">
                  <button
                    onClick={() => handleEnvironmentSwitch('test')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      apiKeys.environment === 'test' 
                        ? 'bg-white text-indigo-600' 
                        : 'text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    Test
                  </button>
                  <button
                    onClick={() => handleEnvironmentSwitch('live')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      apiKeys.environment === 'live' 
                        ? 'bg-white text-indigo-600' 
                        : 'text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    Live
                  </button>
                </div>
              </div>
            )}
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
                <span className="text-sm opacity-90">Success Rate</span>
              </div>
              <div className="text-lg font-semibold">
                {apiKeys?.usage_analytics?.success_rate || '100.0'}%
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <MdDeveloperMode className="text-xl" />
                <span className="text-sm opacity-90">Environment</span>
              </div>
              <div className="text-lg font-semibold capitalize">
                {apiKeys?.environment || 'Test'}
              </div>
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
            {/* Real-time API Usage Statistics */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaChartLine className="text-blue-600" />
                API Usage & Performance Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">
                    {apiKeys.usage_analytics?.today_requests || 0}
                  </div>
                  <div className="text-sm text-blue-700">API Calls Today</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">
                    {apiKeys.usage_analytics?.success_rate || '100.0'}%
                  </div>
                  <div className="text-sm text-green-700">Success Rate</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">
                    {apiKeys.usage_analytics?.total_requests || 0}
                  </div>
                  <div className="text-sm text-purple-700">Total Requests</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">
                    {apiKeys.rate_limits?.requests_per_day?.toLocaleString() || '10,000'}
                  </div>
                  <div className="text-sm text-orange-700">Daily Limit</div>
                </div>
              </div>

              {/* Rate Limits Configuration */}
              <div className="mt-6 bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Current Rate Limits</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">
                      {apiKeys.rate_limits?.requests_per_minute?.toLocaleString() || '1,000'}
                    </div>
                    <div className="text-sm text-gray-600">Per Minute</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">
                      {apiKeys.rate_limits?.requests_per_day?.toLocaleString() || '10,000'}
                    </div>
                    <div className="text-sm text-gray-600">Per Day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">
                      {apiKeys.rate_limits?.requests_per_month?.toLocaleString() || '300,000'}
                    </div>
                    <div className="text-sm text-gray-600">Per Month</div>
                  </div>
                </div>
              </div>

              {apiKeys.usage_analytics?.last_used && (
                <div className="mt-4 text-sm text-gray-600">
                  Last API call: {new Date(apiKeys.usage_analytics.last_used).toLocaleString()}
                </div>
              )}
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

            {/* Enhanced Integration Guide Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaCode className="text-green-600" />
                Quick Integration Guide
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  apiKeys.environment === 'live' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {apiKeys.environment === 'live' ? 'LIVE' : 'TEST'}
                </span>
              </h3>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Basic Payment Request</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
{`curl -X POST ${getBaseUrl()}/payments \\
  -H "Authorization: Bearer ${truncateString(apiKeys.api_secret, 8, 8)}" \\
  -H "Content-Type: application/json" \\
  -H "X-API-Hash: ${truncateString(apiKeys.api_hash, 8, 8)}" \\
  -d '{
    "merchant_id": "${apiKeys.merchant_id}",
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
                    <code className="text-blue-700 text-sm">
                      {getBaseUrl()}
                    </code>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-2">Rate Limit</h5>
                    <code className="text-green-700 text-sm">
                      {apiKeys.rate_limits?.requests_per_day?.toLocaleString() || '10,000'} requests/day
                    </code>
                  </div>
                </div>
              </div>

              {/* Link to Full Integration Guide */}
              <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-indigo-800 mb-1">Need Complete Integration Examples?</h4>
                    <p className="text-indigo-700 text-sm">
                      View detailed code examples for React.js, Node.js, HTML/CSS, and JavaScript
                    </p>
                  </div>
                  <a 
                    href="/api-use" 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    View Full Guide
                  </a>
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

        {/* Enhanced Webhook Configuration Section */}
        {apiKeys?.hasAPIKey && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <MdSecurity className="text-purple-600" />
              Webhook Configuration
              {apiKeys.webhook_config?.is_active && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Active
                </span>
              )}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h4 className="font-semibold text-purple-800 mb-3">Payment Webhook URL</h4>
                <div className="flex items-center gap-3 mb-4">
                  <input 
                    type="url" 
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://yoursite.com/webhook/payment" 
                    className="flex-1 px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button 
                    onClick={handleWebhookSave}
                    disabled={isUpdatingWebhook}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-purple-400"
                  >
                    {isUpdatingWebhook ? 'Saving...' : 'Save'}
                  </button>
                </div>
                <p className="text-purple-700 text-sm">
                  Receive real-time payment status updates and notifications
                </p>
                
                <div className="mt-4">
                  <h5 className="font-semibold text-purple-800 mb-2">Webhook Events</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-purple-700">payment.success</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span className="text-purple-700">payment.failed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-purple-700">refund.processed</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Webhook Security</h4>
                <div className="space-y-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <h5 className="font-semibold text-gray-700 text-sm mb-1">Signature Verification</h5>
                    <p className="text-gray-600 text-xs">
                      All webhooks include a signature header for verification
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <h5 className="font-semibold text-gray-700 text-sm mb-1">SSL Required</h5>
                    <p className="text-gray-600 text-xs">
                      Webhook URLs must use HTTPS encryption
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <h5 className="font-semibold text-gray-700 text-sm mb-1">Retry Logic</h5>
                    <p className="text-gray-600 text-xs">
                      Failed webhooks are retried with exponential backoff
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

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
  const [isVisible, setIsVisible] = useState(false)

  const handleCopy = () => {
    copy(value)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className={`h-2 bg-gradient-to-r ${bgGradient}`}></div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
              {icon}
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{title}</h4>
              <p className="text-gray-500 text-sm">{description}</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title={isVisible ? 'Hide' : 'Show'}
          >
            {isVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono text-gray-700 flex-1 mr-3">
              {isVisible ? value : truncateString(value, truncateFront, truncateBack)}
            </code>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-sm transition-colors"
              title={`Copy ${copyLabel}`}
            >
              <FaCopy className="text-xs" />
              Copy
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Environment: Test</span>
          <span>Last regenerated: Never</span>
        </div>
      </div>
    </div>
  )
}

export default ApiKeyPage
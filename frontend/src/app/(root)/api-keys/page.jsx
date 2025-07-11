"use client";
import { useMainContext } from '@/context/MainContext';
import React, { useEffect, useState } from 'react'
import NotValidUser from './+__(components)/NotValidUser';
import HeaderName from '@/components/HeaderName';
import RenGenerateModal from './+__(components)/RenGenerateModal';
import { FaCopy, FaKey, FaShieldAlt, FaCode, FaLock, FaEye, FaEyeSlash, FaSync, FaInfoCircle, FaCreditCard } from 'react-icons/fa';
import { MdSecurity, MdVpnKey, MdDeveloperMode, MdPayment } from 'react-icons/md';
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
    return <NotValidUser/>
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

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white bg-opacity-20 p-3 rounded-xl">
              <FaKey className="text-2xl md:text-3xl" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">API Key Management</h2>
              <p className="text-indigo-100">Secure access to CBI Bank's payment gateway APIs</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaShieldAlt className="text-xl" />
                <span className="text-sm opacity-90">Security Level</span>
              </div>
              <div className="text-lg font-semibold">
                Enterprise Grade
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <MdSecurity className="text-xl" />
                <span className="text-sm opacity-90">Encryption</span>
              </div>
              <div className="text-lg font-semibold">
                256-bit SSL
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <MdPayment className="text-xl" />
                <span className="text-sm opacity-90">Gateway Status</span>
              </div>
              <div className="text-lg font-semibold">
                {apiKeys?.hasAPIKey ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>
        </div>

        {/* API Keys Section */}
        {apiKeys?.hasAPIKey ? (
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaCode className="text-2xl text-blue-600" />,
                title: "Payment Gateway API",
                description: "Complete documentation for payment processing endpoints"
              },
              {
                icon: <FaShieldAlt className="text-2xl text-green-600" />,
                title: "Security Guidelines",
                description: "Best practices for secure payment gateway implementation"
              },
              {
                icon: <MdSecurity className="text-2xl text-purple-600" />,
                title: "Webhook Integration",
                description: "Real-time payment notifications and status updates"
              }
            ].map((resource, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="bg-white p-3 rounded-lg w-fit mb-4">
                  {resource.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {resource.description}
                </p>
              </div>
            ))}
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
              className="text-gray-500 hover:text-gray-700 transition-colors"
              title={isVisible ? "Hide" : "Show"}
            >
              {isVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <code className="bg-white px-3 py-2 rounded border text-gray-800 font-mono text-sm flex-1">
              {isVisible ? value : truncateString(value, truncateFront, truncateBack)}
            </code>
            <button
              onClick={() => copy(value)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
              title={`Copy ${copyLabel}`}
            >
              <FaCopy />
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
import Link from 'next/link'
import React from 'react'
import { MdEmail, MdVerifiedUser } from 'react-icons/md'
import { FaExclamationTriangle } from 'react-icons/fa'

const NotValidUser = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center">
        <div className="bg-amber-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <FaExclamationTriangle className="text-4xl text-amber-600" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Email Verification Required
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          To access API keys for payment gateway integration, you need to verify your email address first. 
          This ensures secure access to your sensitive credentials.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 text-blue-800">
            <MdEmail className="text-xl" />
            <div>
              <p className="text-sm font-medium">Email verification required</p>
              <p className="text-xs text-blue-600 mt-1">
                Go to Profile section and click the "Verify" button to verify your email address
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Link 
            href="/profile" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MdVerifiedUser className="text-lg" />
            Verify Email Address
          </Link>
          
          <p className="text-xs text-gray-500">
            After verification, return here to generate your API credentials
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotValidUser
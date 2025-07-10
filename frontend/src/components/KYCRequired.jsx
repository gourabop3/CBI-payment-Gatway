import React from 'react';
import Link from 'next/link';
import { FaShieldAlt, FaExclamationTriangle, FaUserCheck } from 'react-icons/fa';
import { MdVerifiedUser, MdError } from 'react-icons/md';

const KYCRequired = ({ 
  title = "KYC Verification Required", 
  message = "Complete your KYC verification to access this feature",
  showIcons = true,
  className = ""
}) => {
  return (
    <div className={`min-h-[60vh] flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-red-100">
        {showIcons && (
          <div className="mb-6">
            <div className="relative inline-flex">
              <FaShieldAlt className="text-6xl text-red-500 mb-4" />
              <MdError className="absolute -top-1 -right-1 text-2xl text-red-600 bg-white rounded-full" />
            </div>
          </div>
        )}
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-amber-500 text-lg mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm text-amber-800 font-medium mb-1">Security Notice</p>
              <p className="text-xs text-amber-700">
                For your security and compliance with banking regulations, KYC verification is mandatory to access banking features.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/kyc">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg">
              <MdVerifiedUser className="text-xl" />
              Complete KYC Verification
            </button>
          </Link>
          
          <Link href="/dashboard">
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200">
              Back to Dashboard
            </button>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <FaUserCheck className="text-green-500" />
            <span>Secure • Fast • Simple</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCRequired;
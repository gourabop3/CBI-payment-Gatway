"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaCheckCircle, FaPhone, FaMobile, FaCalendarAlt, FaClock, FaReceipt, FaArrowLeft } from 'react-icons/fa';
import { MdOutlineCelebration } from 'react-icons/md';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import moment from 'moment';

const RechargeSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [rechargeDetails, setRechargeDetails] = useState(null);

  // Mobile operators mapping
  const operatorNames = {
    jio: 'Reliance Jio',
    airtel: 'Bharti Airtel',
    vi: 'Vi (Vodafone Idea)',
    bsnl: 'BSNL',
    mtnl: 'MTNL',
    reliance: 'Reliance Communications',
    tata: 'Tata Docomo',
    telenor: 'Telenor'
  };

  const operatorLogos = {
    jio: '🔵',
    airtel: '🔴', 
    vi: '🟣',
    bsnl: '🟡',
    mtnl: '🟠',
    reliance: '🟢',
    tata: '⚫',
    telenor: '🔵'
  };

  useEffect(() => {
    // Get details from URL parameters
    const mobileNumber = searchParams.get('mobile');
    const amount = searchParams.get('amount');
    const operator = searchParams.get('operator');
    const txnId = searchParams.get('txnId');
    const timestamp = searchParams.get('timestamp');

    if (mobileNumber && amount && operator) {
      setRechargeDetails({
        mobileNumber,
        amount: parseFloat(amount),
        operator,
        operatorName: operatorNames[operator] || operator,
        operatorLogo: operatorLogos[operator] || '📱',
        txnId: txnId || 'N/A',
        timestamp: timestamp ? parseInt(timestamp) : Date.now()
      });
    } else {
      // If no details found, redirect to recharge page
      router.push('/recharge');
    }
  }, [searchParams, router]);

  const handleGoBack = () => {
    router.push('/recharge');
  };

  const handleGoToTransactions = () => {
    router.push('/transactions');
  };

  if (!rechargeDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const formattedDate = moment(rechargeDetails.timestamp).format('DD MMM YYYY');
  const formattedTime = moment(rechargeDetails.timestamp).format('hh:mm A');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4 animate-pulse">
            <FaCheckCircle className="text-white text-4xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            <MdOutlineCelebration className="inline mr-2 text-green-600" />
            Recharge Successful!
          </h1>
          <p className="text-gray-600">Your mobile recharge has been completed successfully</p>
        </div>

        {/* Receipt Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-200">
          
          {/* Header with operator */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{rechargeDetails.operatorLogo}</span>
                <div>
                  <h2 className="font-semibold text-lg">{rechargeDetails.operatorName}</h2>
                  <p className="text-green-100 text-sm">Mobile Recharge</p>
                </div>
              </div>
              <FaReceipt className="text-2xl opacity-80" />
            </div>
          </div>

          {/* Receipt Details */}
          <div className="p-6 space-y-4">
            
            {/* Amount */}
            <div className="text-center py-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Recharge Amount</p>
              <p className="text-3xl font-bold text-green-600 flex items-center justify-center">
                <RiMoneyRupeeCircleLine className="mr-1" />
                {rechargeDetails.amount.toLocaleString()}
              </p>
            </div>

            {/* Mobile Number */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <FaMobile className="text-green-600" />
                <span className="text-gray-600">Mobile Number</span>
              </div>
              <span className="font-semibold text-gray-800 font-mono">
                +91 {rechargeDetails.mobileNumber}
              </span>
            </div>

            {/* Transaction ID */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <FaReceipt className="text-green-600" />
                <span className="text-gray-600">Transaction ID</span>
              </div>
              <span className="font-semibold text-gray-800 font-mono text-sm">
                {rechargeDetails.txnId}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-green-600" />
                <span className="text-gray-600">Date</span>
              </div>
              <span className="font-semibold text-gray-800">{formattedDate}</span>
            </div>

            {/* Time */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <FaClock className="text-green-600" />
                <span className="text-gray-600">Time</span>
              </div>
              <span className="font-semibold text-gray-800">{formattedTime}</span>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-600">Status</span>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Completed
              </span>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 px-6 py-4 border-t border-green-200">
            <div className="text-center">
              <p className="text-green-800 font-medium mb-2">
                🎉 Congratulations! Your recharge is successful
              </p>
              <p className="text-green-700 text-sm">
                You will receive SMS confirmation from {rechargeDetails.operatorName} shortly.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleGoToTransactions}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaReceipt />
            View All Transactions
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaArrowLeft />
            Recharge Another Number
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Keep this receipt for your records. For any queries, contact customer support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RechargeSuccessPage;
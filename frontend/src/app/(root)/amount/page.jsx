"use client";
import HeaderName from '@/components/HeaderName'
import React, { Suspense, useState } from 'react'
import AddAmountModel from '@/components/Amount/AddAmountModel'
import { useMainContext } from '@/context/MainContext'
import { FaEye, FaEyeSlash, FaWallet, FaUniversity } from 'react-icons/fa';
import { MdAccountBalance, MdTrendingUp } from 'react-icons/md';

import CustomLoader from '@/components/reuseable/CustomLoader';
import { generateAccountNumber, formatAccountNumber, getAccountTypeDisplayName } from '@/utils/accountUtils';

// Force dynamic rendering to prevent static generation issues with Redux
export const dynamic = 'force-dynamic'

const AmountPage = () => {
  const {user} = useMainContext()

  // Show loading state while user data is being fetched
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container py-6 md:py-10 px-4 md:px-6">
          <HeaderName/>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <CustomLoader />
              <p className="text-gray-600 mt-4">Loading your accounts...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const totalBalance = user?.account_no?.reduce((total, account) => total + account.amount, 0) || 0;
  const hasAccounts = user?.account_no && user.account_no.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <HeaderName/>

        {/* Account Summary Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white bg-opacity-20 p-3 rounded-xl">
              <FaWallet className="text-2xl md:text-3xl" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Account Overview</h2>
              <p className="text-blue-100">Manage your banking accounts</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <MdAccountBalance className="text-xl" />
                <span className="text-sm opacity-90">Total Accounts</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold">
                {user?.account_no?.length || 0}
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <MdTrendingUp className="text-xl" />
                <span className="text-sm opacity-90">Total Balance</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold">
                ₹{totalBalance.toLocaleString()}
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaUniversity className="text-xl" />
                <span className="text-sm opacity-90">Account Type</span>
              </div>
              <div className="text-lg font-semibold">
                CBI Digital Banking
              </div>
            </div>
          </div>
        </div>

        {/* Accounts Grid */}
        {hasAccounts ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {user.account_no.map((cur, i) => (
              <AccountCard key={cur._id || i} cur={cur} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
              <div className="bg-blue-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FaWallet className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Accounts Found
              </h3>
              <p className="text-gray-600 mb-6">
                Contact customer service to create your first banking account
              </p>
            </div>
          </div>
        )}
      </div>       
    </div>
  )
}

export default AmountPage

const AccountCard = ({cur, user}) => {
  const [isShow, setIsShow] = useState(false)
  
  // Handle cases where account data might be incomplete
  if (!cur || !cur._id) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }
  
  // Generate realistic account number
  const accountNumber = generateAccountNumber(user?._id, cur._id, cur.ac_type);
  const formattedAccountNumber = formatAccountNumber(accountNumber);
  const accountTypeDisplay = getAccountTypeDisplayName(cur.ac_type);

  const getAccountTypeIcon = (type) => {
    switch(type) {
      case 'savings': return <FaWallet className="text-green-600" />;
      case 'current': return <MdAccountBalance className="text-blue-600" />;
      default: return <FaUniversity className="text-purple-600" />;
    }
  }

  const getAccountTypeGradient = (type) => {
    switch(type) {
      case 'savings': return 'from-green-500 to-emerald-500';
      case 'current': return 'from-blue-500 to-cyan-500';
      default: return 'from-purple-500 to-pink-500';
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`h-2 bg-gradient-to-r ${getAccountTypeGradient(cur.ac_type)}`}></div>
      
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gray-50 p-3 rounded-xl">
            {getAccountTypeIcon(cur.ac_type)}
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">
              {accountTypeDisplay}
            </h3>
            <p className="text-gray-500 text-sm font-mono">
              {formattedAccountNumber || 'Generating...'}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-2">Available Balance</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-bold text-gray-800">
              ₹{isShow ? (cur.amount || 0).toLocaleString() : '••••••'}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsShow(!isShow)
              }}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
              title={isShow ? "Hide balance" : "Show balance"}
            >
              {!isShow ? <FaEye className="text-gray-600" /> : <FaEyeSlash className="text-gray-600" />}
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <AddAmountModel id={cur._id} />
          <span className="text-gray-500 text-sm flex items-center">
            Add funds to your account
          </span>
        </div>
      </div>
    </div>
  )
}


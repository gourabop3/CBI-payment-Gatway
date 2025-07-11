"use client";
import React, { useState } from 'react'
// Using Tailwind CSS for styling; removed external CSS import
import { useMainContext } from '@/context/MainContext'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import UseCardModel from './UseCard';
import { generateAccountNumber, formatAccountNumber } from '@/utils/accountUtils';

const AllATMCards = () => {
  const { user } = useMainContext()
  const [visibleCVVs, setVisibleCVVs] = useState({})
  const [visibleNumbers, setVisibleNumbers] = useState({})

  // Defensive: Ensure user, user.atms, and user.account_no are arrays
  const atms = Array.isArray(user?.atms) ? user.atms : [];
  const accountNos = Array.isArray(user?.account_no) ? user.account_no : [];

  const toggleCVV = (cardId) => {
    setVisibleCVVs(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  const toggleNumber = (cardId) => {
    setVisibleNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  // Helper to get formatted account number for an ATM record
  const getFormattedAccountNumber = (atmItem) => {
    if (!user) return atmItem.account;
    const accountObj = accountNos.find(acc => acc._id === atmItem.account);
    if (!accountObj) return atmItem.account;
    const accNum = generateAccountNumber(user._id, accountObj._id, accountObj.ac_type);
    return formatAccountNumber(accNum);
  }

  // Filter out invalid cards
  const validAtms = atms.filter(atm => atm && atm._id && atm.card_type && atm.card_no && atm.card_no.length >= 16 && atm.cvv && atm.expiry && atm.account);

  if (!user || validAtms.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
          <img src="/noData.png" alt="No ATM Cards" className="w-16 h-16 object-contain" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No ATM Cards Found
        </h3>
        <p className="text-gray-600">
          {user ? 'No valid ATM cards available. Please request a new card or contact support.' : 'User data not available. Please log in.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {validAtms.map((atm, index) => {
        const circl1 = atm.card_type === "basic" ? "bg-teal-500" : atm.card_type === "classic" ? "bg-indigo-500" : "bg-rose-500"
        const circl2 = atm.card_type === "basic" ? "bg-amber-500" : atm.card_type === "classic" ? "bg-rose-500" : "bg-indigo-500"
        const isShowCVV = visibleCVVs[atm._id] || false

        return (
          <div key={atm._id} className="flex flex-col items-center">
            {/* Account Info */}
            <div className="mb-4 text-center">
              <h4 className="text-lg font-semibold text-gray-800 capitalize">
                {atm.card_type} Card
              </h4>
              <p className="text-sm text-gray-600">
                Account: {getFormattedAccountNumber(atm)}
              </p>
            </div>

            {/* ATM Card Display */}
            <div className="relative w-full max-w-sm aspect-[16/9] bg-gradient-to-br from-white to-slate-100 rounded-xl shadow-lg p-6 mb-4 overflow-hidden">
              {/* Decorative circles */}
              <div className={`absolute w-64 h-64 rounded-full -top-20 -right-20 opacity-30 ${circl1}`} />
              <div className={`absolute w-24 h-24 rounded-full -bottom-10 -right-10 opacity-30 ${circl2}`} />

              {/* Header */}
              <div className="flex items-center justify-between text-lg font-semibold text-gray-800 z-10">
                <i className="fa-solid fa-credit-card text-2xl" />
                <span className="capitalize">{atm.card_type} Card</span>
              </div>

              {/* Card Number */}
              <div className="mt-auto mb-3 text-2xl font-mono tracking-widest text-indigo-700 flex items-center gap-2 z-10">
                {visibleNumbers[atm._id] ? (
                  <>{atm.card_no.slice(0,4)} {atm.card_no.slice(4,8)} {atm.card_no.slice(8,12)} {atm.card_no.slice(12,16)}</>
                ) : (
                  <>**** **** **** {atm.card_no.slice(12,16)}</>
                )}
                <button onClick={() => toggleNumber(atm._id)} className="text-base text-gray-600 hover:text-gray-800">
                  {visibleNumbers[atm._id] ? <FaEyeSlash/> : <FaEye/>}
                </button>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-gray-700 z-10">
                <span className='capitalize font-medium'>Cardholder</span>
                <div className='flex items-center gap-2'>
                  <span className="font-medium">CVV: {isShowCVV ? atm.cvv : '***'}</span>
                  <button
                    onClick={() => toggleCVV(atm._id)}
                    className='text-base text-gray-600 hover:text-gray-800 transition-colors'
                  >
                    {isShowCVV ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <span>
                  Exp:&nbsp;
                  {new Date(atm.expiry).getMonth() + 1}/{new Date(atm.expiry).getUTCFullYear().toString().slice(-2)}
                </span>
              </div>
            </div>

            {/* Use Card Button */}
            <div className="flex justify-center">
              <UseCardModel type={atm.card_type} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AllATMCards
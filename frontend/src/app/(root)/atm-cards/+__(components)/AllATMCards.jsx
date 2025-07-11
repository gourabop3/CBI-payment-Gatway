"use client";
import React, { useState } from 'react'
import './Card.css'
import { useMainContext } from '@/context/MainContext'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import UseCardModel from './UseCard';
import { generateAccountNumber, formatAccountNumber } from '@/utils/accountUtils';

const AllATMCards = () => {
  const { user } = useMainContext()
  const [visibleCVVs, setVisibleCVVs] = useState({})

  // Defensive: Ensure user, user.atms, and user.account_no are arrays
  const atms = Array.isArray(user?.atms) ? user.atms : [];
  const accountNos = Array.isArray(user?.account_no) ? user.account_no : [];

  const toggleCVV = (cardId) => {
    setVisibleCVVs(prev => ({
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
      {validAtms.slice(0,3).map((atm, index) => {
        const circl1 = atm.card_type === "basic" ? "bg-teal-600" : atm.card_type === "classic" ? "bg-indigo-600" : "bg-rose-600"
        const circl2 = atm.card_type === "basic" ? "bg-amber-600" : atm.card_type === "classic" ? "bg-rose-600" : "bg-indigo-600"
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
            <div className="credit-card bg-zinc-950 mb-4">
              <div className={`circle1 ${circl1}`} />
              <div className={`circle2 ${circl2}`} />
              <div className="head">
                <div>
                  <i className="fa-solid fa-credit-card fa-2xl" />
                </div>
                <div className='capitalize text-white'>{atm.card_type} Card</div>
              </div>
              <div className="number text-white">
                <div>{atm.card_no.slice(0, 4)}</div>
                <div>****</div>
                <div>****</div>
                <div>{atm.card_no.slice(12, 16)}</div>
              </div>
              <div className="tail">
                <div className='capitalize text-white'>Cardholder</div>
                <div className='flex items-center justify-center gap-x-2 text-white'>
                  <span>CVV: {isShowCVV ? atm.cvv : ``.padStart(3, 'x')}</span>
                  <button 
                    onClick={() => toggleCVV(atm._id)} 
                    className='text-xl text-white cursor-pointer hover:text-gray-300 transition-colors'
                  >
                    {isShowCVV ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="exp text-white">
                  Exp: &nbsp;
                  <span className="exp-date">
                    {new Date(atm.expiry).getMonth() + 1}/{new Date(atm.expiry).getUTCFullYear().toString().slice(-2)}
                  </span>
                </div>
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
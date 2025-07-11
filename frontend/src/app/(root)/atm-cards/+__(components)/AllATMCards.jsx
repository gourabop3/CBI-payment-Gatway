"use client";
import React, { useState } from 'react';
import { useMainContext } from '@/context/MainContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import UseCardModel from './UseCard';
import { generateAccountNumber, formatAccountNumber } from '@/utils/accountUtils';

const AllATMCards = () => {
  const { user } = useMainContext();
  const [visibleCVVs, setVisibleCVVs] = useState({});
  const [visibleNumbers, setVisibleNumbers] = useState({});

  const atms = Array.isArray(user?.atms) ? user.atms : [];
  const accountNos = Array.isArray(user?.account_no) ? user.account_no : [];

  const toggleCVV = (cardId) => {
    setVisibleCVVs(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const toggleNumber = (cardId) => {
    setVisibleNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const getFormattedAccountNumber = (atmItem) => {
    if (!user) return atmItem.account;
    const accountObj = accountNos.find(acc => acc._id === atmItem.account);
    if (!accountObj) return atmItem.account;
    const accNum = generateAccountNumber(user._id, accountObj._id, accountObj.ac_type);
    return formatAccountNumber(accNum);
  };

  const formatExpiry = (expiry) => {
    const date = new Date(expiry);
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
  };

  const getCardStyles = (type) => {
    switch (type.toLowerCase()) {
      case 'basic':
        return 'bg-gradient-to-br from-cyan-800 via-gray-900 to-cyan-950';
      case 'classic':
        return 'bg-gradient-to-br from-indigo-800 via-gray-900 to-indigo-950';
      case 'platinum':
        return 'bg-gradient-to-br from-slate-700 via-black to-gray-900';
      default:
        return 'bg-gradient-to-br from-gray-700 via-gray-900 to-gray-950';
    }
  };

  const validAtms = atms.filter(atm =>
    atm && atm._id && atm.card_type && atm.card_no &&
    atm.card_no.length >= 16 && atm.cvv && atm.expiry && atm.account
  );

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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {validAtms.map((atm) => {
        const isShowCVV = visibleCVVs[atm._id] || false;
        const isShowNumber = visibleNumbers[atm._id] || false;
        const cardBg = getCardStyles(atm.card_type);

        return (
          <div key={atm._id} className="flex flex-col items-center">
            {/* Account Info */}
            <div className="mb-4 text-center">
              <h4 className="text-lg font-semibold text-gray-800 capitalize drop-shadow-md">
                {atm.card_type} Card
              </h4>
              <p className="text-sm text-gray-600 drop-shadow-sm">
                Account: {getFormattedAccountNumber(atm)}
              </p>
            </div>

            {/* Card UI */}
            <div className={`relative w-full max-w-sm aspect-[16/9] rounded-xl shadow-lg p-6 mb-4 overflow-hidden text-white ${cardBg}`}>
              {/* Card Header */}
              <div className="flex items-center justify-between text-lg font-semibold mb-4 drop-shadow-md">
                <i className="fa-solid fa-credit-card text-2xl" />
                <span className="capitalize drop-shadow-md">{atm.card_type} Card</span>
              </div>

              {/* Card Number */}
              <div className="flex items-center gap-3 text-2xl font-mono font-extrabold tracking-widest mb-6 drop-shadow-lg">
                {isShowNumber ? (
                  <>
                    {atm.card_no.slice(0, 4)} {atm.card_no.slice(4, 8)} {atm.card_no.slice(8, 12)} {atm.card_no.slice(12, 16)}
                  </>
                ) : (
                  <>**** **** **** {atm.card_no.slice(12, 16)}</>
                )}
                <button
                  onClick={() => toggleNumber(atm._id)}
                  aria-label="Toggle card number visibility"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isShowNumber ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between text-sm font-semibold drop-shadow-md">
                <span className="capitalize drop-shadow-sm">Cardholder</span>
                <div className="flex items-center gap-2">
                  <span className="drop-shadow-sm">CVV: {isShowCVV ? atm.cvv : '***'}</span>
                  <button
                    onClick={() => toggleCVV(atm._id)}
                    aria-label="Toggle CVV visibility"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {isShowCVV ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <span className="drop-shadow-sm">Exp: {formatExpiry(atm.expiry)}</span>
              </div>

              {/* Warm highlight for Basic card */}
              {atm.card_type.toLowerCase() === 'basic' && (
                <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-orange-600 to-transparent opacity-30 rounded-b-xl pointer-events-none" />
              )}
            </div>

            {/* Use Card Button */}
            <div className="flex justify-center">
              <UseCardModel type={atm.card_type} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllATMCards;

"use client";
import React, { useState } from 'react';
import { useMainContext } from '@/context/MainContext';
import { FaEye, FaEyeSlash, FaCreditCard, FaShieldAlt } from 'react-icons/fa';
import { MdContactless } from 'react-icons/md';
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



  const getCardIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'basic':
        return '💳';
      case 'classic':
        return '💎';
      case 'platinum':
        return '👑';
      default:
        return '💳';
    }
  };

  const getCardTitle = (type) => {
    switch (type.toLowerCase()) {
      case 'basic':
        return 'BASIC';
      case 'classic':
        return 'CLASSIC';
      case 'platinum':
        return 'PLATINUM';
      default:
        return type.toUpperCase();
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {validAtms.map((atm) => {
        const isShowCVV = visibleCVVs[atm._id] || false;
        const isShowNumber = visibleNumbers[atm._id] || false;


        return (
          <div key={atm._id} className="flex flex-col items-center group">
            {/* Account Info */}
            <div className="mb-6 text-center">
              <h4 className="text-xl font-bold text-gray-800 capitalize mb-2">
                {atm.card_type} Card
              </h4>
              <p className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                Account: {getFormattedAccountNumber(atm)}
              </p>
            </div>

            {/* Professional Card UI */}
            <div 
              className={`atm-card atm-card-${atm.card_type.toLowerCase()} card-entrance relative w-full max-w-sm aspect-[1.586] rounded-2xl p-6 mb-6 overflow-hidden text-white`}
            >
              {/* Card Background Pattern */}
              <div className="card-pattern">
                <div className="card-pattern-circle-1"></div>
                <div className="card-pattern-circle-2"></div>
              </div>

              {/* Card Header */}
              <div className="relative flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{getCardIcon(atm.card_type)}</div>
                  <div>
                    <div className="card-label">Bank Name</div>
                    <div className="card-title">DEBIT CARD</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="card-label">Card Type</div>
                  <div className="card-type-badge">{getCardTitle(atm.card_type)}</div>
                </div>
              </div>

              {/* Chip and Contactless */}
              <div className="relative flex items-center justify-between mb-8">
                <div className="card-chip"></div>
                <MdContactless className="text-3xl text-white/90" />
              </div>

              {/* Card Number */}
              <div className="relative mb-8">
                <div className="card-label">Card Number</div>
                <div className="flex items-center gap-3">
                  <div className="card-number text-xl">
                    {isShowNumber ? (
                      <>
                        {atm.card_no.slice(0, 4)} {atm.card_no.slice(4, 8)} {atm.card_no.slice(8, 12)} {atm.card_no.slice(12, 16)}
                      </>
                    ) : (
                      <>**** **** **** {atm.card_no.slice(12, 16)}</>
                    )}
                  </div>
                  <button
                    onClick={() => toggleNumber(atm._id)}
                    aria-label="Toggle card number visibility"
                    className="card-toggle-btn text-white/80 hover:text-white"
                  >
                    {isShowNumber ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>

              {/* Card Footer */}
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="card-label">Cardholder</div>
                  <div className="card-value">{user?.name || 'CARDHOLDER'}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="card-label">CVV</div>
                    <div className="flex items-center gap-2">
                      <span className="card-value">{isShowCVV ? atm.cvv : '***'}</span>
                      <button
                        onClick={() => toggleCVV(atm._id)}
                        aria-label="Toggle CVV visibility"
                        className="card-toggle-btn text-white/80 hover:text-white"
                      >
                        {isShowCVV ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="card-label">Expires</div>
                    <div className="card-value">{formatExpiry(atm.expiry)}</div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="card-security-badge">
                <FaShieldAlt className="text-lg" />
              </div>
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

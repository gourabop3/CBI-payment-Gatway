"use client";
import React, { useState } from 'react';
import { useMainContext } from '@/context/MainContext';
import { FaEye, FaEyeSlash, FaCreditCard, FaShieldAlt, FaPlus } from 'react-icons/fa';
import { MdContactless } from 'react-icons/md';
import UseCardModel from './UseCard';
import AddNewCard from './AddNewCard';
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
        {/* Empty State with Add Card Option */}
        <div className="empty-state-container">
          <div className="empty-state-icon">
            <FaCreditCard className="text-3xl text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            No ATM Cards Yet
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {user ? 'You haven\'t created any ATM cards yet. Create your first card to start making secure transactions.' : 'User data not available. Please log in.'}
          </p>
          
          {user && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaPlus className="text-2xl text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Add Your First Card</h4>
                <p className="text-sm text-gray-600 mb-4">Create a new ATM card for secure transactions</p>
                <AddNewCard />
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FaShieldAlt className="text-2xl text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Secure & Protected</h4>
                <p className="text-sm text-gray-600">Advanced encryption and fraud protection</p>
              </div>
            </div>
          )}
        </div>
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
              className={`atm-card atm-card-${atm.card_type.toLowerCase()} card-entrance relative w-full max-w-sm rounded-2xl p-6 mb-6 overflow-hidden text-white`}
            >
              {/* Card Background Pattern */}
              <div className="card-pattern">
                <div className="card-pattern-circle-1"></div>
                <div className="card-pattern-circle-2"></div>
              </div>

              {/* Card Content Container */}
              <div className="relative flex flex-col h-full">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
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
                <div className="flex items-center justify-between mb-6">
                  <div className="card-chip"></div>
                  <MdContactless className="text-3xl text-white/90" />
                </div>

                {/* Card Number */}
                <div className="mb-6">
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

                {/* Spacer to push footer to bottom */}
                <div className="flex-1"></div>

                {/* Card Footer - CVV and Expiry */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="card-label">Cardholder</div>
                    <div className="card-value">{user?.name || 'CARDHOLDER'}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="card-label">CVV</div>
                      <div className="flex items-center gap-2">
                        <span className="card-value font-mono bg-white/10 px-2 py-1 rounded">{isShowCVV ? atm.cvv : '***'}</span>
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
                      <div className="card-value font-mono bg-white/10 px-2 py-1 rounded">{formatExpiry(atm.expiry)}</div>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="card-security-badge">
                  <FaShieldAlt className="text-lg" />
                </div>
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

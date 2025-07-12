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
  const [visibleCardDetails, setVisibleCardDetails] = useState({});

  const atms = Array.isArray(user?.atms) ? user.atms : [];
  const accountNos = Array.isArray(user?.account_no) ? user.account_no : [];

  const toggleCVV = (cardId) => {
    setVisibleCVVs(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const toggleCardDetails = (cardId) => {
    setVisibleCardDetails(prev => ({
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

  const getCardTitle = (type) => {
    switch (type.toLowerCase()) {
      case 'basic':
        return 'Basic Card';
      case 'classic':
        return 'Classic Card';
      case 'platinum':
        return 'Platinum Card';
      default:
        return `${type} Card`;
    }
  };

  const getCardGradient = (type) => {
    switch (type.toLowerCase()) {
      case 'basic':
        return 'from-emerald-700 to-teal-900';
      case 'classic':
        return 'from-purple-700 to-indigo-900';
      case 'platinum':
        return 'from-slate-800 to-gray-900';
      default:
        return 'from-emerald-700 to-teal-900';
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
        const isShowCardDetails = visibleCardDetails[atm._id] || false;

        return (
          <div key={atm._id} className="flex flex-col items-center group">
            {/* Account Info */}
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-600">
                Account: {getFormattedAccountNumber(atm)}
              </p>
            </div>

            {/* ATM Card - Exact Same Design as Reference */}
            <div 
              className={`relative w-full max-w-sm h-48 rounded-2xl p-6 mb-6 overflow-hidden text-white shadow-xl transform transition-all duration-300 hover:scale-105 bg-gradient-to-br ${getCardGradient(atm.card_type)}`}
            >
              {/* Card Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full transform translate-x-12 -translate-y-12"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full transform -translate-x-8 translate-y-8"></div>
              </div>

              {/* Card Content */}
              <div className="relative h-full flex flex-col justify-between">
                {/* Card Type at Top Center */}
                <div className="text-center">
                  <h3 className="text-lg font-bold tracking-wide">
                    {getCardTitle(atm.card_type)}
                  </h3>
                </div>

                {/* Card Number in Center */}
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold tracking-widest">
                    {`${atm.card_no.slice(0, 4)} **** **** ${atm.card_no.slice(12, 16)}`}
                  </div>
                </div>

                {/* Bottom Row: Cardholder, CVV, Expiry */}
                <div className="flex items-center justify-between text-sm">
                  {/* Cardholder */}
                  <div className="flex-1">
                    <div className="text-xs opacity-80 mb-1">Cardholder</div>
                    <div className="font-medium text-xs uppercase truncate">
                      {user?.name || 'CARDHOLDER'}
                    </div>
                  </div>

                  {/* CVV */}
                  <div className="flex-1 text-center">
                    <div className="text-xs opacity-80 mb-1">CVV:</div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-mono font-bold">
                        {isShowCVV ? atm.cvv : 'xxx'}
                      </span>
                      <button
                        onClick={() => toggleCVV(atm._id)}
                        className="text-white opacity-70 hover:opacity-100 transition-opacity ml-1"
                        title={isShowCVV ? 'Hide CVV' : 'Show CVV'}
                      >
                        {isShowCVV ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                      </button>
                    </div>
                  </div>

                  {/* Expiry */}
                  <div className="flex-1 text-right">
                    <div className="text-xs opacity-80 mb-1">Exp:</div>
                    <div className="font-mono font-bold">
                      {formatExpiry(atm.expiry)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* View Card Details Button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={() => toggleCardDetails(atm._id)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                {isShowCardDetails ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                {isShowCardDetails ? 'Hide Card Details' : 'View Card Details'}
              </button>
            </div>

            {/* Card Details Section */}
            {isShowCardDetails && (
              <div className="w-full max-w-sm mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Card Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Full Card Number:</span>
                    <span className="font-mono font-semibold text-gray-800">
                      {`${atm.card_no.slice(0, 4)} ${atm.card_no.slice(4, 8)} ${atm.card_no.slice(8, 12)} ${atm.card_no.slice(12, 16)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CVV:</span>
                    <span className="font-mono font-semibold text-gray-800">{atm.cvv}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expiry Date:</span>
                    <span className="font-mono font-semibold text-gray-800">{formatExpiry(atm.expiry)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cardholder:</span>
                    <span className="font-semibold text-gray-800 uppercase">{user?.name || 'CARDHOLDER'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Card Type:</span>
                    <span className="font-semibold text-gray-800 capitalize">{atm.card_type}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Use Card Button */}
            <div className="flex justify-center">
              <UseCardModel type={atm.card_type} atmCard={atm} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllATMCards;

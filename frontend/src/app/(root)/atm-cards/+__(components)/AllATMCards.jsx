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

  const atms = Array.isArray(user?.atms) ? user.atms : [];
  const accountNos = Array.isArray(user?.account_no) ? user.account_no : [];

  const toggleCVV = (cardId) => {
    setVisibleCVVs(prev => ({
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

  const getCardGradient = (type) => {
    switch (type.toLowerCase()) {
      case 'basic':
        return 'from-blue-500 to-purple-600';
      case 'classic':
        return 'from-pink-500 to-rose-600';
      case 'platinum':
        return 'from-gray-600 to-gray-800';
      default:
        return 'from-blue-500 to-purple-600';
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

        return (
          <div key={atm._id} className="flex flex-col items-center group">
            {/* Account Info */}
            <div className="mb-4 text-center">
              <h4 className="text-xl font-bold text-gray-800 capitalize mb-2">
                {atm.card_type} Card
              </h4>
              <p className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                Account: {getFormattedAccountNumber(atm)}
              </p>
            </div>

            {/* Professional ATM Card UI */}
            <div 
              className={`relative w-full max-w-sm h-56 rounded-2xl p-6 mb-6 overflow-hidden text-white shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl bg-gradient-to-r ${getCardGradient(atm.card_type)}`}
            >
              {/* Card Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12"></div>
              </div>

              {/* Card Content */}
              <div className="relative h-full flex flex-col">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getCardIcon(atm.card_type)}</div>
                    <div>
                      <div className="text-xs font-semibold tracking-widest uppercase opacity-90">CBI BANK</div>
                      <div className="text-sm font-bold tracking-wide">DEBIT CARD</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-75 mb-1">Type</div>
                    <div className="bg-white bg-opacity-20 px-2 py-1 rounded-lg text-xs font-bold">
                      {getCardTitle(atm.card_type)}
                    </div>
                  </div>
                </div>

                {/* Chip and Contactless */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-9 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-6 bg-gradient-to-r from-yellow-500 to-yellow-700 rounded"></div>
                  </div>
                  <MdContactless className="text-3xl opacity-90" />
                </div>

                {/* Card Number */}
                <div className="mb-6">
                  <div className="text-xs opacity-75 mb-1">Card Number</div>
                  <div className="text-lg font-mono font-bold tracking-wider">
                    {`${atm.card_no.slice(0, 4)} ${atm.card_no.slice(4, 8)} ${atm.card_no.slice(8, 12)} ${atm.card_no.slice(12, 16)}`}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex-1 flex items-end justify-between">
                  <div>
                    <div className="text-xs opacity-75 mb-1">Cardholder</div>
                    <div className="text-sm font-semibold uppercase">{user?.name || 'CARDHOLDER'}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-xs opacity-75 mb-1">CVV</div>
                      <div className="flex items-center gap-2">
                        <div className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm font-mono">
                          {isShowCVV ? atm.cvv : '***'}
                        </div>
                        <button
                          onClick={() => toggleCVV(atm._id)}
                          className="text-white opacity-75 hover:opacity-100 transition-opacity"
                        >
                          {isShowCVV ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs opacity-75 mb-1">Expires</div>
                      <div className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm font-mono">
                        {formatExpiry(atm.expiry)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="absolute bottom-4 right-4 opacity-60">
                  <FaShieldAlt className="text-lg" />
                </div>
              </div>
            </div>

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

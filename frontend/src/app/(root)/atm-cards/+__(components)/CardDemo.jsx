"use client";
import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import { MdContactless } from 'react-icons/md';

const CardDemo = () => {
  const [visibleCVVs, setVisibleCVVs] = useState({});
  const [visibleNumbers, setVisibleNumbers] = useState({});

  const demoCards = [
    {
      id: 'basic-demo',
      card_type: 'basic',
      card_no: '4532 1234 5678 9012',
      cvv: '123',
      expiry: '2026-12-31',
      account: '1234567890',
      holder: 'John Doe'
    },
    {
      id: 'classic-demo',
      card_type: 'classic',
      card_no: '5555 4444 3333 2222',
      cvv: '456',
      expiry: '2027-06-30',
      account: '0987654321',
      holder: 'Jane Smith'
    },
    {
      id: 'platinum-demo',
      card_type: 'platinum',
      card_no: '4111 1111 1111 1111',
      cvv: '789',
      expiry: '2028-03-15',
      account: '1122334455',
      holder: 'Mike Johnson'
    }
  ];

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

  const getCardDescription = (type) => {
    switch (type.toLowerCase()) {
      case 'basic':
        return 'Perfect for everyday banking with essential features';
      case 'classic':
        return 'Enhanced benefits with premium banking services';
      case 'platinum':
        return 'Ultimate banking experience with exclusive privileges';
      default:
        return 'Standard banking card';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Professional ATM Card Designs</h3>
        <p className="text-gray-600">Experience our premium card designs with distinct colors and features</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {demoCards.map((card) => {
          const isShowCVV = visibleCVVs[card.id] || false;
          const isShowNumber = visibleNumbers[card.id] || false;

          return (
            <div key={card.id} className="flex flex-col items-center group">
              {/* Card Info */}
              <div className="mb-6 text-center">
                <h4 className="text-xl font-bold text-gray-800 capitalize mb-2">
                  {card.card_type} Card
                </h4>
                <p className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full mb-2">
                  Account: {card.account}
                </p>
                <p className="text-xs text-gray-500 max-w-xs">
                  {getCardDescription(card.card_type)}
                </p>
              </div>

              {/* Professional Card UI */}
              <div className={`atm-card atm-card-${card.card_type.toLowerCase()} card-entrance relative w-full max-w-sm aspect-[1.586] rounded-2xl p-6 mb-6 overflow-hidden text-white`}>
                {/* Card Background Pattern */}
                <div className="card-pattern">
                  <div className="card-pattern-circle-1"></div>
                  <div className="card-pattern-circle-2"></div>
                </div>

                {/* Card Header */}
                <div className="relative flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{getCardIcon(card.card_type)}</div>
                    <div>
                      <div className="card-label">Bank Name</div>
                      <div className="card-title">DEBIT CARD</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="card-label">Card Type</div>
                    <div className="card-type-badge">{getCardTitle(card.card_type)}</div>
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
                          {card.card_no.slice(0, 4)} {card.card_no.slice(5, 9)} {card.card_no.slice(10, 14)} {card.card_no.slice(15, 19)}
                        </>
                      ) : (
                        <>**** **** **** {card.card_no.slice(15, 19)}</>
                      )}
                    </div>
                    <button
                      onClick={() => toggleNumber(card.id)}
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
                    <div className="card-value">{card.holder}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="card-label">CVV</div>
                      <div className="flex items-center gap-2">
                        <span className="card-value">{isShowCVV ? card.cvv : '***'}</span>
                        <button
                          onClick={() => toggleCVV(card.id)}
                          aria-label="Toggle CVV visibility"
                          className="card-toggle-btn text-white/80 hover:text-white"
                        >
                          {isShowCVV ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="card-label">Expires</div>
                      <div className="card-value">{formatExpiry(card.expiry)}</div>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="card-security-badge">
                  <FaShieldAlt className="text-lg" />
                </div>
              </div>

              {/* Card Features */}
              <div className="text-center">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">Card Features</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Contactless Payments</li>
                    <li>• 24/7 Security Monitoring</li>
                    <li>• Global Acceptance</li>
                    <li>• Emergency Card Replacement</li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardDemo;
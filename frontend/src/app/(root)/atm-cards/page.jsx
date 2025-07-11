"use client";
import HeaderName from '@/components/HeaderName'
import React from 'react'
import { FaCreditCard, FaPlus, FaShieldAlt } from 'react-icons/fa'
import { MdSecurity, MdContactless } from 'react-icons/md'
import AddNewCardDialog from './components/AddNewCard'
import AllATMCards from './components/AllATMCards'

const AtmCards = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <HeaderName/>
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white bg-opacity-20 p-3 rounded-xl">
              <FaCreditCard className="text-2xl md:text-3xl" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">ATM Card Management</h2>
              <p className="text-purple-100">Manage your debit cards securely</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaShieldAlt className="text-xl" />
                <span className="text-sm opacity-90">Secure Banking</span>
              </div>
              <div className="text-lg font-semibold">
                256-bit Encryption
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <MdContactless className="text-xl" />
                <span className="text-sm opacity-90">Contactless</span>
              </div>
              <div className="text-lg font-semibold">
                Tap & Pay Ready
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <MdSecurity className="text-xl" />
                <span className="text-sm opacity-90">Security</span>
              </div>
              <div className="text-lg font-semibold">
                24/7 Monitoring
              </div>
            </div>
          </div>
        </div>

        {/* Add New Card Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="text-center">
            <div className="bg-blue-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FaPlus className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              Request New ATM Card
            </h3>
            <p className="text-gray-600 mb-6">
              Need a new debit card? Request one instantly
            </p>
            <AddNewCardDialog/>
          </div>
        </div>

        {/* Cards Display Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
              <FaCreditCard className="text-blue-600" />
              Your ATM Cards
            </h2>
            <p className="text-gray-600">
              View and manage all your ATM cards
            </p>
          </div>
          
          <AllATMCards/>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaShieldAlt className="text-2xl text-green-600" />,
              title: "Secure Transactions",
              description: "Advanced encryption and fraud protection for all your transactions"
            },
            {
              icon: <MdContactless className="text-2xl text-blue-600" />,
              title: "Contactless Payments",
              description: "Tap and pay feature for quick and safe transactions"
            },
            {
              icon: <MdSecurity className="text-2xl text-purple-600" />,
              title: "24/7 Monitoring",
              description: "Real-time transaction monitoring and instant alerts"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-gray-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AtmCards
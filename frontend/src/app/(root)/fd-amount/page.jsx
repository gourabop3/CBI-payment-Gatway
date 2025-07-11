"use client";
import HeaderName from '@/components/HeaderName'
import React, { Suspense, useEffect, useState } from 'react'
import { FaCoins, FaCalendarAlt } from 'react-icons/fa'
import { MdSavings, MdTrendingUp } from 'react-icons/md'

import FDCard from './+___compoents/FDCard'
import { axiosClient } from '@/utils/AxiosClient'
import CustomLoader from '@/components/reuseable/CustomLoader'
import { toast } from 'react-toastify';
import { useMainContext } from '@/context/MainContext'

const FDPage = () => {
  const { user } = useMainContext();
  const [deposits, setDeposits] = useState([])
  const [loading, setLoading] = useState(true)
  const [isUpdate, setIsUpdate] = useState(false)
  const [error, setError] = useState(null)

  const fetchAllDeposits = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error('Please login to continue')
        setDeposits([])
        return
      }

      const response = await axiosClient.get('/fd/get-all', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      
      const data = response.data || []
      
      if (Array.isArray(data)) {
        setDeposits(data)
      } else {
        setDeposits([])
      }

    } catch (error) {
      const errorMessage = error?.response?.data?.msg || error?.message || 'Failed to fetch fixed deposits'
      toast.error(errorMessage)
      setError(errorMessage)
      setDeposits([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setDeposits([]);
      setError('Please login to view your fixed deposits.');
      return;
    }
    fetchAllDeposits();
  }, [isUpdate, user]);

  const calculateStats = () => {
    try {
      if (!Array.isArray(deposits) || deposits.length === 0) {
        return {
          totalFDAmount: 0,
          activeFDs: 0,
          totalDeposits: 0
        }
      }

      const totalFDAmount = deposits.reduce((total, deposit) => {
        const amount = deposit?.amount || 0
        return total + (typeof amount === 'number' ? amount : 0)
      }, 0)

      const activeFDs = deposits.filter(deposit => 
        deposit && !deposit.isClaimed
      ).length

      return {
        totalFDAmount,
        activeFDs,
        totalDeposits: deposits.length
      }
    } catch (error) {
      return {
        totalFDAmount: 0,
        activeFDs: 0,
        totalDeposits: 0
      }
    }
  }

  const stats = calculateStats()

  if (!user) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-blue-50">
        <CustomLoader/>
        <p className="mt-4 text-lg text-gray-600">Please login to view your fixed deposits.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-blue-50">
        <CustomLoader/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <HeaderName/>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FaCoins className="text-2xl text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                Unable to Load Fixed Deposits
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={fetchAllDeposits}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* FD Cards Grid */}
        {!error && (
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaCoins className="text-green-600" />
              Your Fixed Deposits
            </h2>
            
            {deposits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <Suspense fallback={<CustomLoader/>}>
                  {deposits.map((deposit, index) => {
                    if (!deposit || !deposit._id) return null;
                    return (
                      <FDCard 
                        key={deposit._id} 
                        isUpdate={isUpdate} 
                        setIsUpdate={setIsUpdate} 
                        data={deposit} 
                      />
                    )
                  })}
                </Suspense>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-50 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <FaCoins className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Fixed Deposits Found
                </h3>
                <p className="text-gray-600">
                  Contact customer service to learn more about fixed deposit options
                </p>
              </div>
            )}
          </div>
        )}

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <MdTrendingUp className="text-2xl text-green-600" />,
              title: "Guaranteed Returns",
              description: "Earn fixed daily interest rate of 0.1% with assured returns"
            },
            {
              icon: <FaCalendarAlt className="text-2xl text-blue-600" />,
              title: "Flexible Claim",
              description: "Claim your FD anytime with accumulated interest calculated daily"
            },
            {
              icon: <MdSavings className="text-2xl text-purple-600" />,
              title: "Compound Growth",
              description: "Watch your money grow with daily compounding interest"
            }
          ].map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-gray-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FDPage
"use client";
import HeaderName from '@/components/HeaderName'
import React, { Suspense, useEffect, useState } from 'react'
import { FaCoins, FaPlus, FaTrendingUp, FaCalendarAlt, FaChartLine } from 'react-icons/fa'
import { MdSavings, MdAccountBalance } from 'react-icons/md'
import AddNewFdModel from './+___compoents/AddNewFdModel'
import FDCard from './+___compoents/FDCard'
import { axiosClient } from '@/utils/AxiosClient'
import CustomLoader from '@/components/reuseable/CustomLoader'
import { toast } from 'react-toastify';

const FDPage = () => {
  const[deposits,setDeposists] = useState([])
  const [loading,setLoading] = useState(true)
  const [isUpdate,setIsUpdate] = useState(false)

  const fetchAllDeposits = async()=>{
    try {
      setLoading(true)
      const response = await axiosClient.get('/fd/get-all',{
        headers:{
          'Authorization':'Bearer '+localStorage.getItem("token")
        }
      })
      const data =await response.data 
      setDeposists(data)
    } catch (error) {
      toast.error(error.data.response.msg || error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAllDeposits()
  },[isUpdate])

  if(loading){
    return <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-blue-50">
      <CustomLoader/>
    </div>
  }

  const totalFDAmount = deposits.reduce((total, deposit) => total + deposit.amount, 0);
  const activeFDs = deposits.filter(deposit => deposit.status !== 'matured').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <HeaderName/>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white bg-opacity-20 p-3 rounded-xl">
              <FaCoins className="text-2xl md:text-3xl" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Fixed Deposit Portfolio</h2>
              <p className="text-green-100">Grow your wealth with guaranteed returns</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <MdAccountBalance className="text-xl" />
                <span className="text-sm opacity-90">Total FDs</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold">
                {deposits.length}
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaTrendingUp className="text-xl" />
                <span className="text-sm opacity-90">Total Amount</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold">
                ₹{totalFDAmount.toLocaleString()}
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaChartLine className="text-xl" />
                <span className="text-sm opacity-90">Active FDs</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold">
                {activeFDs}
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <MdSavings className="text-xl" />
                <span className="text-sm opacity-90">Interest Rate</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold">
                7.5%
              </div>
            </div>
          </div>
        </div>

        {/* Add New FD Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="text-center">
            <div className="bg-green-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FaPlus className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              Create New Fixed Deposit
            </h3>
            <p className="text-gray-600 mb-6">
              Start investing for guaranteed returns with competitive interest rates
            </p>
            <AddNewFdModel isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
          </div>
        </div>

        {/* FD Cards Grid */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FaCoins className="text-green-600" />
            Your Fixed Deposits
          </h2>
          
          {deposits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <Suspense fallback={<CustomLoader/>}>
                {deposits.map((cur, i) => (
                  <FDCard key={i} isUpdate={isUpdate} setIsUpdate={setIsUpdate} data={cur} />
                ))}
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
                Create your first fixed deposit to start earning guaranteed returns
              </p>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaTrendingUp className="text-2xl text-green-600" />,
              title: "Guaranteed Returns",
              description: "Earn fixed interest rates with assured returns on maturity"
            },
            {
              icon: <FaCalendarAlt className="text-2xl text-blue-600" />,
              title: "Flexible Tenure",
              description: "Choose from multiple tenure options ranging from 7 days to 10 years"
            },
            {
              icon: <MdSavings className="text-2xl text-purple-600" />,
              title: "Tax Benefits",
              description: "Enjoy tax benefits under Section 80C up to ₹1.5 lakhs annually"
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


"use client";
import HeaderName from '@/components/HeaderName'
import React, { Suspense, useState } from 'react'

import AddAmountModel from '@/components/Amount/AddAmountModel'
import { useMainContext } from '@/context/MainContext'
import { FaEye, FaEyeSlash, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';
import AddAccountModal from './+__(components)/AddAccountModal';
import CustomLoader from '@/components/reuseable/CustomLoader';
import { generateAccountNumber, formatAccountNumber, getAccountTypeDisplayName, isKYCVerified, getAccountNumberDisplay, getKYCStatusMessage } from '@/utils/accountUtils';
import KYCRequired from '@/components/KYCRequired';
import Link from 'next/link';

// Force dynamic rendering to prevent static generation issues with Redux
export const dynamic = 'force-dynamic'

const AmountPage = () => {

  const {user} = useMainContext()
  
  // Check if KYC is verified
  const kycVerified = isKYCVerified(user);
  
  // If KYC not verified, show KYC required component
  if (!kycVerified) {
    return (
      <div className="container py-10 px-3">
        <HeaderName />
        <KYCRequired
          title="Complete KYC to Access Your Accounts"
          message="Account management and deposit services require KYC verification for security and regulatory compliance."
        />
      </div>
    );
  }

  return (
    <>
    <div className="container py-10 px-3">
    <HeaderName/>

      {/* KYC Status Alert */}
      {!isKYCVerified(user) && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-yellow-600 text-xl mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-yellow-800 font-semibold mb-1">KYC Verification Required</h3>
              <p className="text-yellow-700 text-sm mb-3">
                {getKYCStatusMessage(user)}
              </p>
              <Link 
                href="/kyc" 
                className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <FaShieldAlt />
                Complete KYC Verification
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid  grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-3">
      {
    user && user.account_no && user.account_no.length>0 && user.account_no.map((cur,i)=>{
        return <Card key={i} cur={cur} user={user} />
    
    })
   } 

        <Suspense fallback={<CustomLoader/>}>
          
   <AddAccountModal/>
        </Suspense>

      </div>
    
     </div>       
    
    </>
  )
}

export default AmountPage


const Card =({cur, user})=>{
  const [isShow,setIsShow] = useState(false)
  
  // Check if KYC is verified
  const kycVerified = isKYCVerified(user);
  
  // Get account number display based on KYC status
  const accountNumberDisplay = getAccountNumberDisplay(user?._id, cur._id, cur.ac_type, user);
  const accountTypeDisplay = getAccountTypeDisplayName(cur.ac_type);

  return  <div className="card w-full border border-gray-200 py-6 px-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200">
  <div className="flex flex-col mb-4">
    <h1 className='text-xl font-bold text-gray-800 mb-1'>{accountTypeDisplay}</h1>
    <div className="mb-1 flex items-center gap-2">
      <p className={`text-base font-medium ${kycVerified ? 'text-gray-600' : 'text-yellow-600'}`}>
        {accountNumberDisplay}
      </p>
      {!kycVerified && (
        <FaExclamationTriangle className="text-yellow-500 text-sm" title="KYC verification required" />
      )}
    </div>
    {!kycVerified && (
      <p className="text-xs text-yellow-600 mb-2">
        Complete KYC to view account number
      </p>
    )}
    <p className='text-sm text-gray-500'>Account Holder: {user?.name}</p>
  </div>
  
  <div className='mb-4'>
    <div className='flex items-center gap-x-2 justify-start'> 
      <span className="text-sm text-gray-600">Available Balance</span>
      <button
        onClick={(e)=>{
          e.preventDefault()
          e.stopPropagation()
          setIsShow(!isShow)
        }}
        type='button' 
        className='outline-none cursor-pointer text-gray-600 hover:text-gray-800'
      > 
        { !isShow? <FaEye className="text-sm"/>:<FaEyeSlash className="text-sm"/>} 
      </button>  
    </div>
    <div className="text-2xl font-bold text-green-600 mt-1">
      &#8377; {isShow ? cur.amount.toLocaleString(): `${'*'.repeat(`${cur.amount}`.length)}`}/-
    </div>
  </div>
  
  <div className="flex justify-end">
    {kycVerified ? (
      <AddAmountModel id={cur._id} />
    ) : (
      <Link 
        href="/kyc"
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors duration-200 shadow-md hover:shadow-lg text-sm"
      >
        <FaShieldAlt />
        Verify KYC
      </Link>
    )}
  </div>
</div>
}
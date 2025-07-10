"use client";
import HeaderName from '@/components/HeaderName'
import React, { Suspense, useState } from 'react'

import AddAmountModel from '@/components/Amount/AddAmountModel'
import { useMainContext } from '@/context/MainContext'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AddAccountModal from './+__(components)/AddAccountModal';
import CustomLoader from '@/components/reuseable/CustomLoader';
import { generateAccountNumber, formatAccountNumber, getAccountTypeDisplayName } from '@/utils/accountUtils';

// Force dynamic rendering to prevent static generation issues with Redux
export const dynamic = 'force-dynamic'

const AmountPage = () => {

  const {user} = useMainContext()

  return (
    <>
    <div className="container py-10 px-3">
    <HeaderName/>

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
  
  // Generate realistic account number
  const accountNumber = generateAccountNumber(user?._id, cur._id, cur.ac_type);
  const formattedAccountNumber = formatAccountNumber(accountNumber);
  const accountTypeDisplay = getAccountTypeDisplayName(cur.ac_type);

  return  <div className="card w-full border border-gray-200 py-6 px-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200">
  <div className="flex flex-col mb-4">
    <h1 className='text-xl font-bold text-gray-800 mb-1'>{accountTypeDisplay}</h1>
    <p className='text-base text-gray-600 font-medium mb-1'>{formattedAccountNumber}</p>
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
    <AddAmountModel id={cur._id} />
  </div>
</div>
}
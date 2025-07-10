"use client";
import HeaderName from '@/components/HeaderName'
import React, { Suspense, useState } from 'react'

import AddAmountModel from '@/components/Amount/AddAmountModel'
import { useMainContext } from '@/context/MainContext'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AddAccountModal from './+__(components)/AddAccountModal';
import CustomLoader from '@/components/reuseable/CustomLoader';
import { generateAccountNumber, formatAccountNumber, getAccountTypeDisplayName } from '@/utils/accountUtils';

const AmountPage = () => {
  const context = useMainContext();
  const user = context ? context.user : null;

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

  return  <div className="card w-full border py-5 rounded flex items-center justify-between px-3">
  <div className="flex flex-col">
  <h1 className='text-2xl font-bold'>Add Amount</h1>
  <p className='text-lg text-zinc-500 font-medium'>
    {user.isKycApproved && user.isActive ? (
      formattedAccountNumber
    ) : (
      <span className="text-gray-400 flex items-center gap-2">
        <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0-6v2m-6 4V7a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2z" /></svg>
        Complete KYC to view your account number
      </span>
    )}
  </p>
  <p className='text-sm text-zinc-400 font-medium'>{accountTypeDisplay}</p>
   <div className='text-2xl text-start w-full font-bold text-zinc-950 flex items-center gap-x-2 justify-start'> <span>Total Amount &#8377; {isShow ? cur.amount: ``.padStart(`${cur.amount}`.length,'x')}/-</span> <button
                  onClick={(e)=>{
                      e.preventDefault()
                      e.stopPropagation()
                      setIsShow(!isShow)
                  }}
               type='button' className='outline-none cursor-pointer text-black'> { !isShow? <FaEye/>:<FaEyeSlash/>} </button>  </div> 
  </div>
  
  <AddAmountModel id={cur._id} />
</div>
}
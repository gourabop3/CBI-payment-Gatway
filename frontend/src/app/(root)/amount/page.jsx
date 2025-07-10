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
  const accountNumber = cur.account_number || generateAccountNumber(user?._id, cur._id, cur.ac_type);
  const formattedAccountNumber = formatAccountNumber(accountNumber);
  const accountTypeDisplay = getAccountTypeDisplayName(cur.ac_type);

  return  <div className="card w-full border py-5 rounded flex items-center justify-between px-3">
  <div className="flex flex-col">
  <h1 className='text-2xl font-bold'>Add Amount</h1>
  <p className='text-lg text-zinc-500 font-medium'>{formattedAccountNumber}</p>
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
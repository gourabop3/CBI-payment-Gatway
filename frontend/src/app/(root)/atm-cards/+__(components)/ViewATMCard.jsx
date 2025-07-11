"use client";
import React, { useState } from 'react'
// Using Tailwind CSS for styling; removed external CSS import
import { useMainContext } from '@/context/MainContext'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import UseCardModel from './UseCard';
const ViewATMCard = () => {

  const {atm,user} = useMainContext()
  const [isShowCVV, setIsShowCVV] = useState(false)
  const [isShowNumber, setIsShowNumber] = useState(false)

  if(!atm || !atm.card_no){
    return <>
          <div className=" w-[96%] rounded py-10 px-10 lg:w-1/2  shadow text-xl">
             <img src="/noData.png" className='w-full h-full'  alt="no ATM" />
          </div>
    </>
  }

  const circl1 = atm.card_type ==="basic"? "bg-teal-500": atm.card_type ==="classic"?"bg-indigo-500":"bg-rose-500"
  const circl2 = atm.card_type ==="basic"? "bg-amber-500": atm.card_type ==="classic"?"bg-rose-500":"bg-indigo-500"

  return (
        <>
<div className='flex flex-col'>
  {/* Single card view */}
 
  <div className="relative w-full max-w-sm aspect-[16/9] bg-gradient-to-br from-white to-slate-100 rounded-xl shadow-lg p-6">
    {/* Decorative circles */}
    <div className={`absolute w-64 h-64 rounded-full -top-20 -right-20 opacity-30 ${circl1}`} />
    <div className={`absolute w-24 h-24 rounded-full -bottom-10 -right-10 opacity-30 ${circl2}`} />

    {/* Header */}
    <div className="flex items-center justify-between text-lg font-semibold text-gray-800 z-10">
      <i className="fa-solid fa-credit-card text-2xl" />
      <span className='capitalize'>{atm.card_type} Card</span>
    </div>

    {/* Card Number (masked) */}
    <div className="mt-auto mb-3 text-2xl font-mono tracking-widest text-indigo-700 flex items-center gap-2 z-10">
      {isShowNumber ? (
        <>{atm.card_no.slice(0,4)} {atm.card_no.slice(4,8)} {atm.card_no.slice(8,12)} {atm.card_no.slice(12,16)}</>
      ) : (
        <>**** **** **** {atm.card_no.slice(12,16)}</>
      )}
      <button onClick={()=>setIsShowNumber(!isShowNumber)} className='text-base text-gray-600 hover:text-gray-800'>
        {isShowNumber? <FaEyeSlash/> : <FaEye/>}
      </button>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between text-sm text-gray-700 z-10">
      <span className='capitalize'>Cardholder</span>
      <div className='flex items-center gap-2'>
        <span className='font-medium'>CVV: {isShowCVV? atm.cvv: '***' }</span>
        <button onClick={()=>setIsShowCVV(!isShowCVV)} className='text-base text-gray-600 hover:text-gray-800'> 
         { isShowCVV? <FaEyeSlash/> :<FaEye/>}
        </button>
      </div>
      <span>
        Exp:&nbsp;
        {new Date(atm.expiry).getMonth()+1}/{new Date(atm.expiry).getUTCFullYear().toString().slice(-2)}
      </span>
    </div>
  </div>
  <div className="mb-3 flex justify-center py-3">
      <UseCardModel type={atm.card_type} />
    </div>

</div>

    

    </>
  )
}

export default ViewATMCard

/**
 * account
: 
"680b6bdd386bd07fb5901f82"
card_no
: 
"2759611527357498"
card_type
: 
"classic"
createdAt
: 
"2025-05-03T11:33:26.146Z"
cvv
: 
289
date
: 
"2025-05-03T11:33:26.143Z"
expiry
: 
"2025-08-03T11:33:26.141Z"
updatedAt
: 
"2025-05-03T11:33:26.146Z"
user
: 
"67f9e9d30279b55f3b94d700"
__v
: 
0
_id
: 
"6815ff06b829182eaa9cbf58"
 */
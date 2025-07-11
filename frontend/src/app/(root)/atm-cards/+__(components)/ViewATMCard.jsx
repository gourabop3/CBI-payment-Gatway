"use client";
import React, { useState } from 'react'
// Using Tailwind CSS for styling; removed external CSS import
import { useMainContext } from '@/context/MainContext'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import UseCardModel from './UseCard';
const ViewATMCard = () => {

  const {atm,user} = useMainContext()
  const [isSHow,setISShow] = useState(false)

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
  <h1 className='text-white'> Copied from GeeksforGeeks</h1>
 
  <div className="relative w-full max-w-sm aspect-[16/9] bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl shadow-lg p-6">
    {/* Decorative circles */}
    <div className={`absolute w-64 h-64 rounded-full -top-20 -right-20 opacity-30 ${circl1}`} />
    <div className={`absolute w-24 h-24 rounded-full -bottom-10 -right-10 opacity-30 ${circl2}`} />

    {/* Header */}
    <div className="flex items-center justify-between text-lg font-semibold text-white z-10">
      <i className="fa-solid fa-credit-card text-2xl" />
      <span className='capitalize'>{atm.card_type} Card</span>
    </div>

    {/* Card Number (masked) */}
    <div className="mt-auto mb-3 text-2xl font-mono tracking-widest text-white z-10">
      **** **** **** {atm.card_no.slice(12,16)}
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between text-sm text-gray-300 z-10">
      <span className='capitalize'>Cardholder</span>
      <div className='flex items-center gap-2'>
        <span>CVV: {isSHow? atm.cvv: '***' }</span>
        <button onClick={()=>setISShow(!isSHow)} className='text-base text-white hover:text-gray-400'> 
         { isSHow? <FaEyeSlash/> :<FaEye/>}
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
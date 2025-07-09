"use client";
import { useMainContext } from '@/context/MainContext';
import React, { useEffect, useState } from 'react'
import NotValidUser from './+__(components)/NotValidUser';
import HeaderName from '@/components/HeaderName';
import RenGenerateModal from './+__(components)/RenGenerateModal';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Helper function to truncate long strings like API keys/hashes for cleaner UI
const truncateString = (str, front = 6, back = 4) => {
  if (!str) return '';
  if (str.length <= front + back) return str;
  return `${str.slice(0, front)}...${str.slice(-back)}`;
};

const copy = (text) => {
  if(!text) return;
  navigator.clipboard.writeText(text).then(() => {
    toast.success('Copied to clipboard');
  }).catch(()=>{
    toast.error('Failed to copy');
  });
};

const ApiKeyPage = () => {

        const {user} = useMainContext()
        const [state,setState] = useState(true)

    useEffect(()=>{
        if(user && user.isEmailVerifed){
            setState(false)
        }
    },[user])

        if( !state){
        return <>
                 <NotValidUser/> 
                 </>
    }


  return (
    <>

        <div className="py-10">
              <HeaderName/> 

           <section className="bg-gray-50 py-10 px-10">
             <table className='table w-full table-auto'>
                <thead className='border-b'>
                  <tr>
                    <th className='border-r'>ID</th>
                    <th className='border-r'>API Secret</th>
                    <th className='border-r'>API Hash</th>
                    <th className='border-r'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='py-4'>
                    <td className='py-4 text-center '>1</td>
                    <td className='py-4 text-center flex items-center justify-center gap-x-2'>
                      <span className="font-mono bg-gray-100 px-2 rounded">{truncateString(user?.api_keys?.api_secret)}</span>
                      <button onClick={()=>copy(user?.api_keys?.api_secret)} className="text-gray-600 hover:text-gray-900" title="Copy"><FaCopy/></button>
                    </td>
                    <td className='py-4 text-center flex items-center justify-center gap-x-2'>
                      <span className="font-mono bg-gray-100 px-2 rounded">{truncateString(user?.api_keys?.api_hash,8,6)}</span>
                      <button onClick={()=>copy(user?.api_keys?.api_hash)} className="text-gray-600 hover:text-gray-900" title="Copy"><FaCopy/></button>
                    </td>
                    <td className='border-r text-center py-4'>
                        <RenGenerateModal/>
                    </td>

                  </tr>
                </tbody>
            </table>
           </section>
        </div>
    
    
    </>
  )
}

export default ApiKeyPage
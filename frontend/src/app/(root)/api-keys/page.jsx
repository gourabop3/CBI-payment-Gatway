"use client";
import { useMainContext } from '@/context/MainContext';
import React, { useEffect, useState } from 'react'
import NotValidUser from './+__(components)/NotValidUser';
import HeaderName from '@/components/HeaderName';
import RenGenerateModal from './+__(components)/RenGenerateModal';

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
                    <td className='py-4 text-center '>{user?.api_keys?.api_secret}</td>
                    <td className='py-4 text-center '>{user?.api_keys?.api_hash}</td>
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
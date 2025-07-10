"use client";
import HeaderName from '@/components/HeaderName'
import React, { Suspense, useEffect, useState } from 'react'
import AddNewFdModel from './+___compoents/AddNewFdModel'
import FDCard from './+___compoents/FDCard'
import { axiosClient } from '@/utils/AxiosClient'
import CustomLoader from '@/components/reuseable/CustomLoader'
import { toast } from 'react-toastify';
import { useMainContext } from '@/context/MainContext'
import { isKYCVerified } from '@/utils/accountUtils'
import KYCRequired from '@/components/KYCRequired'

const FDPage = () => {
  const[deposits,setDeposists] = useState([])
  const { user } = useMainContext();

  const [loading,setLoading] = useState(true)
  const [isUpdate,setIsUpdate] = useState(false)
  
  // Check KYC verification
  const kycVerified = isKYCVerified(user);

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
  
  // If KYC not verified, show KYC required component
  if (!kycVerified) {
    return (
      <div className="container py-10">
        <HeaderName />
        <KYCRequired
          title="Complete KYC to Access Fixed Deposits"
          message="Fixed deposit services require KYC verification for security and regulatory compliance."
        />
      </div>
    );
  }
  
  if(loading){
    return <div className="w-full min-h-screen flex justify-center items-center">
      <CustomLoader/>
      </div>
  }

  return (
    <>
            <div className="container py-10">
            <HeaderName/>

            <div className="py-10 grid grid-cols-1  items-start gap-x-4 gap-y-3 lg:grid-cols-2 xl:grid-cols-3">

            <AddNewFdModel isUpdate={isUpdate} setIsUpdate={setIsUpdate} />   
            <Suspense fallback={<CustomLoader/>}>
            {
                 deposits.length>0&&           deposits.map((cur,i)=>{
                                return <FDCard  isUpdate={isUpdate} setIsUpdate={setIsUpdate} key={i} data={cur} />
                            })
                        }  
            </Suspense>

            </div>
            </div>
   
   </>
  )
}

export default FDPage


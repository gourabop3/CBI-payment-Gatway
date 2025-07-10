"use client";
import React, { useEffect, useRef, useState } from 'react'
// import { faker } from '@faker-js/faker';
import { CiCamera } from "react-icons/ci";
import {ErrorMessage,Field,Form,Formik} from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify';
import { onlyInputNumber } from '@/utils/constant';
import CustomAuthButton from '@/components/reuseable/CustomAuthButton';
import VerifiedEMailModel from './+__(components)/VerifiedEMailModel';
import { useMainContext } from '@/context/MainContext';
import { CgSpinner } from 'react-icons/cg';
import { axiosClient } from '@/utils/AxiosClient';

const ProfilePage = () => {
const {user,fetchUserProfile} = useMainContext()
  const [loader,setLoader] = useState(false)



  const validationSchema = yup.object({
    name:yup.string().required("Name is Required"),
    bio:yup.string(),
    mobile_no:yup.string().required("Mobile No is Required").min(10,"Mobile No should be equal to 10 digits").max(10,"Mobile No should be equal to 10 digits")
  })

  const onSubmitHandler =async(values,{resetForm})=>{
    try {
      setLoader(true)
     
      
      const response = await axiosClient.post('/auth/update-basic-details',values,{
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("token")
        }
      })
      const data =await response.data 
      toast.success(data.msg)
      fetchUserProfile()

    } catch (error) {
      toast.error(error.response.data.msg || error.message)
    }finally{
      setLoader(false)
    }
  }



  const [image, setImage] = useState(null)
  const [imageLoading,setImageLoading] = useState(false)

  const imageRef = useRef(null)
  const onFilePickHandler=(e)=>{
    e.preventDefault()
    imageRef.current.click()


  }

  const updateImageAvatar = async()=>{
    try {
      setImageLoading(true)
      const formData = new FormData()
      formData.append("avatar",image)
        const response =await axiosClient.post('/auth/update-avatar',formData,{
          headers:{
            'Authorization':'Bearer '+localStorage.getItem("token") 
          }
        })
        
        const data = await response.data

        toast.success(data.msg)

        await fetchUserProfile()
        setImage(null)

    } catch (error) {
      toast.error(error.response.data.msg || error)
    }finally{
      setImageLoading(false)
    }
  }

  useEffect(()=>{
        if(image){
updateImageAvatar()


        }

  },[image])



  return (
    <>
            <div className="w-full  px-2 py-24 flex flex-col">
                <div className="mb-3 w-[200px] h-[200px] rounded-full  object-cover mx-auto bg-white p-2 shadow-lg relative">
                   {imageLoading ? (
                   <div className="w-[200px] flex justify-center items-center h-[200px]">
                      <CgSpinner className='animate-spin text-7xl text-rose-700' />
                   </div>
                   ) : (
                     (image || user?.image) ? (
                       <img src={ image ? URL.createObjectURL(image) : user?.image } className="border rounded-full shadow-sm w-full h-full" alt="" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full text-gray-400 text-6xl">
                         <CiCamera />
                       </div>
                     )
                   )}
                   <input accept='image/*' onChange={(e)=>{
                      setImage(e.target.files[0])
                    }} ref={imageRef} type="file" className='hidden' />
                    <button disabled={imageLoading} onClick={onFilePickHandler} className="absolute bottom-0 right-[10px] shadow text-black bg-white 
                    rounded-full p-2 text-2xl"> <CiCamera/></button>
                </div>

                <div className="mb-4">
                  <h1 className="font-bold text-2xl lg:text-4xl text-start">Basic Details </h1>
                </div>

              <Formik validationSchema={validationSchema} 
                initialValues={{
                  name:user?.name,
                  mobile_no:user?.mobile_no,
                  bio:user?.bio
                }}
                onSubmit={onSubmitHandler}
              >
                <Form>
                    <div className="mb-3">
                  <label htmlFor="name">Name <span className="text-red-500">*</span> </label>
                  <Field id="name" name={"name"} type="text" 
                  className='w-[96%] lg:w-full mx-auto py-3 px-3 rounded-sm outline-none border' placeholder='Enter Your Name' />
                  <ErrorMessage name="name" className='text-red-500' component={'p'}  />
                </div>


                   <div className="mb-3">
                  <label htmlFor="email">Email <span className="text-red-500">*</span> </label>
                  <input readOnly id="email" value={user.email} type="text" 
                  className='w-[96%] lg:w-full mx-auto py-3 px-3 bg-gray-100 rounded-sm outline-none border' placeholder='Enter Your Email' />
                 
                </div>

                     <div className="mb-3">
                  <label htmlFor="mobile_no">Mobile No <span className="text-red-500">*</span> </label>
                  <Field name={"mobile_no"} type="text"
                  id="mobile_no" 
                  onInput={onlyInputNumber}
                  className='w-[96%] lg:w-full mx-auto py-3 px-3 rounded-sm outline-none border' placeholder='Enter Your Mobile No' />
                  <ErrorMessage name="mobile_no" className='text-red-500' component={'p'}  />
                </div>

   <div className="mb-3">
                  <label htmlFor="bio">Bio <span className="text-red-500">*</span> </label>
                  <Field name={"bio"} as="textarea"
                  id="bio"  row={"5"} 
                  className='w-[96%] lg:w-full mx-auto py-3 px-3 rounded-sm outline-none border' placeholder='Let me know...' />
                  <ErrorMessage name="bio" className='text-red-500' component={'p'}  />
                </div>

                <div className="mb-3">
                  <CustomAuthButton isLoading={loader} text={'Update Profile'} className='' type='submit' />
                </div>


                </Form>
              </Formik>



                 <div className="mb-4">
                  <h1 className="font-bold text-2xl lg:text-4xl text-start">Verification </h1>
                </div>
                  
                <div className="w-full py-2 text-xl flex flex-col items-center gap-y-4 ">
                    {user && user.isEmailVerified ? (
                      <p className="text-green-600 font-semibold">Your email is verified ✔</p>
                    ) : (
                      <VerifiedEMailModel/>
                    )}
                </div>


            </div>
    </>
  )
}

export default ProfilePage

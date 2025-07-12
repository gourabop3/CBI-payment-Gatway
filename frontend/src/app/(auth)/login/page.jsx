"use client";
import { axiosClient } from '@/utils/AxiosClient';
import React, { useState } from 'react'
import {Formik,Form,ErrorMessage,Field} from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify';
import CustomAuthButton from '@/components/reuseable/CustomAuthButton';
import Link from 'next/link';
import { useMainContext } from '@/context/MainContext';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [loading,setLoading] = useState(false)
    const {fetchUserProfile} = useMainContext()
    const router = useRouter()

  const initialValues = {
    email:'',
    password:'' 
  }

  const validationSchema = yup.object({ 
    email:yup.string().email("Email must be a valid Email").required("Email is Required"),
    password: yup.string().required("Password is required"),
   })

  const onSubmitHandler= async(values,helpers)=>{
    try {
        setLoading(true)
      
      const response = await axiosClient.post('/auth/login',values)
      const data = await response.data 

      toast.success(data.msg)
      
      // token
      localStorage.setItem("token",data.token)
      
      await fetchUserProfile()

      router.push("/")
      helpers.resetForm()
    } catch (error) { 
      toast.error(error.response.data.msg || error.message)
      
    }finally{
        setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl flex items-start border rounded-lg overflow-hidden shadow-lg">
          <div className="hidden lg:block lg:w-1/2 bg-white">
            <img 
              src="https://bfsi.eletsonline.com/wp-content/uploads/2023/07/Yono-SBI.jpg" 
              className='h-full w-full object-cover' 
              alt="Banking Login" 
            />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
          >
            <Form className="w-full lg:w-1/2 px-6 py-8 sm:px-10 sm:py-10 bg-white">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to your account</p>
              </div>

              <div className="mb-4">
                <Field 
                  type="email" 
                  name="email"  
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"  
                  placeholder="Enter Your Email"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                />
                <ErrorMessage name="email" className="text-red-500 text-sm mt-1" component={'p'} />
              </div>

              <div className="mb-6">
                <Field 
                  type="password" 
                  name="password"  
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  placeholder="Enter Your Password"
                  autoComplete="current-password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                />
                <ErrorMessage name="password" className="text-red-500 text-sm mt-1" component={'p'} />
              </div>

              <div className="mb-6">
                <CustomAuthButton isLoading={loading} text={'Sign In'} type='submit' />
              </div>

              <div className="space-y-2">
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href={'/register'} className="text-blue-600 hover:text-blue-800 font-medium">
                    Register here
                  </Link>
                </p>
                <p className="text-center text-sm text-gray-600">
                  Admin?{' '}
                  <Link href={'/admin-login'} className="text-blue-600 hover:text-blue-800 font-medium">
                    Login here
                  </Link>
                </p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  )
}

export default LoginPage
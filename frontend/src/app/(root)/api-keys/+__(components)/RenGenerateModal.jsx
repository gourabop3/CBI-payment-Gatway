"use client";
import { onlyInputNumber } from '@/utils/constant';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import * as yup from 'yup'
import {Form,Formik,Field,ErrorMessage} from 'formik'
import { toast } from 'react-toastify';
import CustomAuthButton from '@/components/reuseable/CustomAuthButton';
import { axiosClient } from '@/utils/AxiosClient';
import { useMainContext } from '@/context/MainContext'; 

export default function RenGenerateModal({ onSuccess }) {
  const { fetchUserProfile } = useMainContext()
  let [isOpen, setIsOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const [initialValues, setInitialValues] = useState({
    token: '',
    otp: ''
  })

  const validationSchema = yup.object({
    otp: yup.string().required("OTP is required")
      .min(6, "OTP Should be equal to 6 digit")
      .max(6, "OTP Should be equal to 6 digit")
  })

  const onSubmitHandler = async(e) => {
    try {
      setLoader(true)
      
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error('Please login to continue')
        return
      }

      const response = await axiosClient.post('/api-keys/verify-email-otp', e, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      
      const data = await response.data 
      toast.success(data.msg)
      
      // Refresh user profile
      if (fetchUserProfile && typeof fetchUserProfile === 'function') {
        await fetchUserProfile()
      }
      
      // Call success callback to refresh API keys
      if (onSuccess && typeof onSuccess === 'function') {
        await onSuccess()
      }
      
      closeModal()

    } catch (error) {
      console.error('Error verifying OTP:', error)
      const errorMessage = error?.response?.data?.msg || error?.message || 'Failed to verify OTP'
      toast.error(errorMessage)
    } finally {
      setLoader(false)
    }
  }

  const ClickHandler = async() => {
    try {
      setIsLoading(true)
      
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error('Please login to continue')
        return
      }

      const response = await axiosClient.post('/api-keys/send-email-otp', {}, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      
      const data = await response.data 
      setInitialValues({
        ...initialValues,
        token: data.token
      })

      toast.success('OTP sent to your email')
      openModal()
      
    } catch (error) {
      console.error('Error sending OTP:', error)
      const errorMessage = error?.response?.data?.msg || error?.message || 'Failed to send OTP'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          disabled={isLoading}
          type="button"
          onClick={ClickHandler}
          className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 text-white rounded-lg py-3 px-6 disabled:bg-green-400 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? 'Sending OTP...' : 'Generate API Keys'}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                  >
                    <h3 className="text-xl font-bold text-green-600">Verify Email</h3>
                    <button 
                      onClick={closeModal}
                      className='text-2xl text-green-700 bg-green-50 hover:bg-green-100 rounded-full outline-none p-2 cursor-pointer transition-colors'
                    >
                      <IoMdClose/>
                    </button>
                  </Dialog.Title>
                  
                  <div className="mt-4">
                    <div className="w-full py-3 flex justify-center items-center">
                      <img src="/logo.svg" alt="CBI Bank Logo" className='w-1/2 mx-auto' />
                    </div> 

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-green-800">
                        <strong>Security Notice:</strong> We've sent a 6-digit OTP to your registered email address. 
                        Enter it below to generate your API keys.
                      </p>
                    </div>

                    <Formik 
                      initialValues={initialValues}
                      onSubmit={onSubmitHandler}
                      validationSchema={validationSchema}
                    >
                      <Form className="space-y-4">
                        <div>
                          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter OTP <span className="text-red-500">*</span> 
                          </label>
                          <Field 
                            id="otp"  
                            onInput={onlyInputNumber} 
                            type="text" 
                            className="w-full py-3 text-center text-xl outline-none border border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 px-3 rounded-lg transition-all font-mono tracking-widest" 
                            name="otp" 
                            placeholder='••••••'
                            maxLength="6"
                          />
                          <ErrorMessage name='otp' className='text-red-500 text-sm mt-1' component={'p'} />
                        </div>
                        
                        <div className="pt-2">
                          <CustomAuthButton 
                            isLoading={loader} 
                            text={loader ? 'Verifying...' : 'Generate API Keys'} 
                            className="w-full bg-green-600 hover:bg-green-700"
                          />
                        </div>
                      </Form>
                    </Formik>

                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500">
                        Didn't receive the OTP? Check your spam folder or try again.
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

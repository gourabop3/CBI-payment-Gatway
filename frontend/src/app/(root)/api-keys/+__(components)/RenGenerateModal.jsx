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
export default function RenGenerateModal() {
  const {fetchUserProfile} = useMainContext()
  let [isOpen, setIsOpen] = useState(false)
  const [loader,setLoader] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const [initialValues,setInitialValues] =useState({
    token:'',
    otp:''
  })

  const validationSchema = yup.object({
    otp:yup.string().required("OTP is required")
    .min(6,"OTP Should be equal to 6 digit")
    .max(6,"OTP Should be equal to 6 digit")
  })

  const onSubmitHandler = async(e)=>{
    try {
        
          
      setLoader(true)
      const response =await axiosClient.post('/api-keys/verify-email-otp',e,{
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("token")
        }
      })
      const data  = await response.data 
      toast.success(data.msg)
    console.log(data)
      await fetchUserProfile()
        closeModal()

    } catch (error) {
        toast.error(error.response.data.msg || error.message)
    }finally{
      setLoader(false)

    }
  }

  const ClickHandler = async()=>{

    try {
      setIsLoading(true)
      const response =await axiosClient.post('/api-keys/send-email-otp',{},{
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("token")
        }
      })
      const data = await response.data 
      setInitialValues({
        ...initialValues,
        token:data.token
      })

        openModal()
    } catch (error) {
      toast.error(error.response.data.msg || error.message)
    }finally{
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
          className="bg-rose-700 hover:bg-rose-800 transition-all duration-300 text-white rounded-sm py-3 px-10 disabled:bg-rose-900"
        >
        {isLoading?'loading...':'Regenerate'}
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
                    <h3>Verify Email</h3>

                    <button 
                    onClick={closeModal}
                    className='text-3xl text-rose-700 bg-rose-50 rounded-full outline-none p-2 cursor-pointer'><IoMdClose/></button>

                  </Dialog.Title>
                  <div className="mt-2">

        
                  <div className="w-full py-3 flex justify-center items-center ">
                                <img src="/logo.svg" alt="" className='w-1/2 mx-auto' />
                            </div> 


            <div className="mb-3">


                
                   <Formik 
                   initialValues={initialValues}
                   onSubmit={onSubmitHandler}
                   validationSchema={validationSchema}
                   >
                    <Form>
                       <div className="mb-3">
                        <label htmlFor="otp">OTP <span className="text-red-500">*</span> </label>
                          <Field id="otp"  onInput={onlyInputNumber} type="text" className="w-full py-2 text-xl outline-none border px-3 rounded "  name="otp" placeholder='Enter OTP'  />
                         <ErrorMessage name='otp' className='text-red-500' component={'p'} />
                       </div>
                       <div className="mb-3">
                        <CustomAuthButton className='' isLoading={loader} text={'Submit OTP'} />
                       </div>

                    </Form>
                   </Formik>
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

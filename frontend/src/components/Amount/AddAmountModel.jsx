"use client";
import { useMainContext } from '@/context/MainContext';
import { axiosClient } from '@/utils/AxiosClient';
import { checkout_url, razorpayCallBackUrl } from '@/utils/constant';
import { loadScript } from '@/utils/loadScripts';
import { Dialog, Transition } from '@headlessui/react'
import { Field, Form, Formik } from 'formik';
import { Fragment, useState } from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { SiRazorpay } from "react-icons/si";
import { toast } from 'react-toastify';
import * as yup from 'yup'

export default function AddAmountModel({id}) {

  const {user, fetchUserProfile} = useMainContext()

  let [isOpen, setIsOpen] = useState(false)
  const [loading,setLoading]  = useState(false)
  const initial_state={
    amount:0,
    account_no:id
  }
  const validationSchema = yup.object({
    amount:yup.number().min(1,"Enter Minium Amount 1 INR").required("Amount Is Required")
  })

  // Hit the backend immediately after Razorpay success to verify the payment.
  // The backend now returns a JSON response { success: true/false, url: "..." } when it detects an XHR request.
  // We inspect this response so the frontend can react accordingly.
  const verifyPaymentImmediate = async (txnId, razorResp) => {
    try {
      // Maintain Razorpay’s x-www-form-urlencoded format
      const payload = new URLSearchParams();
      payload.append('razorpay_payment_id', razorResp.razorpay_payment_id);
      payload.append('razorpay_order_id', razorResp.razorpay_order_id);
      payload.append('razorpay_signature', razorResp.razorpay_signature);

      const { data, status } = await axiosClient.post(`/amount/payment/${txnId}`, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json' // make sure we explicitly ask for JSON
        }
      });

      // Treat any non-2xx status or explicit success false as failure
      if (status >= 400 || (data && data.success === false)) {
        console.error('Backend verification responded with failure', data);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Immediate backend verification failed', err?.response || err);
      return false;
    }
  };

  // Function to poll transaction status
  const pollTransactionStatus = async (txnId, maxAttempts = 30, interval = 2000) => {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      try {
        console.log(`Polling attempt ${attempts + 1}/${maxAttempts} for transaction ${txnId}`);
        
        const response = await axiosClient.get(`/amount/status/${txnId}`, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
        });
        
        const transactionData = response.data;
        console.log('Transaction status:', transactionData);
        
        if (transactionData.status === 'completed') {
          console.log('Transaction verified successfully!');
          toast.success("Payment verified! Updating balance...");
          
          // Now fetch updated profile
          await fetchUserProfile();
          toast.success("Account balance updated successfully!");
          return true;
        }
        
        // Check if transaction failed
        if (transactionData.status === 'failed') {
          console.log('Transaction failed');
          toast.error("Payment verification failed. Please contact support.");
          return false;
        }
        
        // Transaction still pending, continue polling
        attempts++;
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, interval));
        }
        
      } catch (error) {
        console.error(`Polling attempt ${attempts + 1} failed:`, error);
        attempts++;
        
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, interval));
        }
      }
    }
    
    // Max attempts reached
    console.log('Max polling attempts reached');
    toast.warning("Payment successful but balance verification is taking longer than expected. Please refresh the page or check transactions.");
    return false;
  };

  const onSubmitHandler =async (values,{resetForm})=>{

    try {
      setLoading(true)
      // console.log(values);
     await loadScript(checkout_url)

     const response = await axiosClient.post('/amount/add-money',values,{
      headers:{
        'Authorization':'Bearer '+ localStorage.getItem("token")
      }
     })
     const data = await response.data 

     const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: (values.amount*100).toString(),
      currency: 'INR',
      name: "CBI Bank",
      description: "Add Money Transaction",
      callback_url: razorpayCallBackUrl(data.txn_id),
      "image": "/logo.svg",
      // image: { logo },
      order_id: data.order_id,
      
      // Enhanced payment handlers
      handler: async function (response) {
        console.log("Payment successful:", response);
        toast.success("Payment completed successfully! Verifying with backend...");

        try {
          const immediateOk = await verifyPaymentImmediate(data.txn_id, response);
          if (immediateOk) {
            toast.success('Payment verified with backend!');
            // Refresh balance instantly
            await fetchUserProfile();
          } else {
            toast.warn('Immediate verification failed, retrying in background.');
          }
        } catch (verificationErr) {
          console.error('Unexpected error during immediate verification', verificationErr);
          toast.error('Unexpected error verifying payment. We\'ll keep retrying.');
        }

        // Close the modal immediately
        closeModal();

        // Start polling for transaction status
        setTimeout(async () => {
          const verified = await pollTransactionStatus(data.txn_id);
          if (!verified) {
            console.log("Polling completed but verification status unclear");
          }
          setLoading(false);
        }, 1000); // Small delay to allow backend processing to start

        // The callback_url will also handle verification if reachable.
      },
      
      "modal": {
        "ondismiss": function(){
          console.log("Payment modal dismissed");
          toast.info("Payment cancelled");
          setLoading(false);
        }
      },
  
      prefill: {
          name: user?.name,
          email: user?.email,
          contact: "9999999999",
      }, 
      theme: {  
          color: "#61dafb",
      },
      
      // Error handling
      "error": function(error) {
        console.error("Payment error:", error);
        toast.error("Payment failed: " + error.description);
        setLoading(false);
      }
  };

  const paymentObject = new window.Razorpay(options);
  
  // Handle payment object events
  paymentObject.on('payment.failed', function (response){
    console.error("Payment failed:", response.error);
    toast.error("Payment failed: " + response.error.description);
    setLoading(false);
  });

  paymentObject.open();

     
      // resetForm()
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data?.msg || error.message)
    }finally{
      setLoading(false)
    }
    
  }


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <> 
        <button type="button"
          onClick={openModal} 
          className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors duration-200 shadow-md hover:shadow-lg'> 
          <RiMoneyRupeeCircleLine className="text-lg" />
          Deposit
        </button>
        
 

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
            <div className="flex min-h-[50vh] items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-gray-900 flex items-center justify-between mb-4"
                  >
                  <span className="flex items-center gap-2">
                    <RiMoneyRupeeCircleLine className="text-green-600 text-2xl" />
                    Deposit Money
                  </span>

                  <button onClick={closeModal} className='text-xl text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors'>
                    <IoClose/>
                  </button>

                  </Dialog.Title>

                  <div className="w-full py-4 flex justify-center items-center border-b border-gray-200 mb-6">
                                <img src="/logo.svg" alt="CBI Bank" className='w-1/3 mx-auto' />
                            </div> 

                         <Formik onSubmit={onSubmitHandler} validationSchema={validationSchema} initialValues={initial_state}>
                         {({values,handleSubmit})=>(
                          <form onSubmit={handleSubmit} className="w-full">
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Deposit Amount (₹)
                            </label>
                            <div className="flex items-center gap-x-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200">
                              <RiMoneyRupeeCircleLine className='text-2xl text-green-600' />   
                              <Field
                                name="amount"
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                type="text" 
                                className='w-full outline-none border-none text-lg' 
                                placeholder='Enter amount to deposit'
                              />
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <button 
                              type="button"
                              onClick={closeModal}
                              className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                            >
                              Cancel
                            </button>
                            <button 
                              disabled={values.amount<1 ||loading} 
                              className="flex-1 px-5 py-3 flex items-center gap-x-2 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400 justify-center rounded-lg font-medium transition-colors"
                            >
                              {loading ? (
                                <>
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <SiRazorpay className="text-lg" />
                                  Pay ₹{values.amount || 0}
                                </>
                              )}
                            </button>
                          </div>
                        </form>

                         )}
                         </Formik>
                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

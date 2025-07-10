"use client";
import { BsCoin } from "react-icons/bs";
import { RiCoinsLine } from "react-icons/ri";
import { IoCardSharp } from "react-icons/io5";
import { FaUniversity, FaUser, FaCreditCard, FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import Link from "next/link";
import HeaderName from "@/components/HeaderName";
import { useMainContext } from "@/context/MainContext";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { toast } from 'react-toastify';
import { generateAccountNumber, generateIFSCCode, formatAccountNumber, getAccountTypeDisplayName, isKYCVerified, getAccountNumberDisplay, getKYCStatusMessage } from '@/utils/accountUtils';

const HomePage=()=>{

  const {user} = useMainContext()


  const dashboard_data = [
    {
      title:"Amount",
      "Icon":<BsCoin className="text-6xl text-yellow-500" />,
      "value":`₹${user.account_no.map((cur)=>cur.amount).reduce((pre,cur)=>pre+cur)}`,
      link:'/amount'
    },
    {
      title:"FD Amount",
      "Icon":<RiCoinsLine className="text-6xl text-rose-700" /> ,
      "value":`₹${user.fd_amount}`,
      link:"/fd-amount"
    },
    {
      title:"ATM Cards",
      "Icon":<IoCardSharp className="text-6xl text-black" />,
      "value":`${user?.atms?.length ??0}`,
      link:'/atm-cards'
    }
  ]


  return <>
  <div className="py-10 flex flex-col gap-y-4 " >
  <HeaderName/>
  
      {/* KYC Status Alert */}
      {!isKYCVerified(user) && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-red-800 font-semibold mb-1">⚠️ Banking Features Restricted</h3>
              <p className="text-red-700 text-sm mb-3">
                {getKYCStatusMessage(user)} All banking features including transfers, recharges, deposits, and account details are currently unavailable.
              </p>
              <Link 
                href="/kyc" 
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <FaShieldAlt />
                Complete KYC Verification Now
              </Link>
            </div>
          </div>
        </div>
      )}
  
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-3">

   
    {
      dashboard_data.map((cur,i)=>{
        return  <DashboardCard data={cur} key={i} />
      })
    }
       </div>

       {/* Banking Details Section */}
       <BankingDetailsCard user={user} />
    
  </div>
  </>
}

export default HomePage

const DashboardCard = ({data})=>{

  const [isShow,setIsShow] = useState(false)

  return <Link href={data.link}  className="flex items-center justify-between border py-3 px-10">
       {data.Icon  }
      <div className="flex flex-col gap-y-2 justify-end">
        <p className="text-3xl font-semibold">{data.title}</p> 
          <div className="flex items-center justify-end gap-x-2">  <h3 className="text-4xl font-bold text-end">  {isShow?data.value:``.padStart(`${data.value}`.length,`x`.repeat(`${data.value}`.length))}</h3>
          <button onClick={(e)=>{
            e.preventDefault()
            e.stopPropagation()
            setIsShow(!isShow)
          }} className="text-2xl pt-2 text-black"> {isShow?<FaEyeSlash/>:<FaEye/>} </button> </div>

      </div>
  </Link>
}

const BankingDetailsCard = ({ user }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Check KYC verification
  const kycVerified = isKYCVerified(user);
  
  // Use the utility functions for consistent account number generation
  const primaryAccount = user?.account_no?.[0];
  const accountNumber = (primaryAccount && user?._id) ? generateAccountNumber(user._id, primaryAccount._id, primaryAccount.ac_type) : "";
  const displayAccountNumber = getAccountNumberDisplay(user?._id, primaryAccount?._id, primaryAccount?.ac_type, user);
  
  const bankingInfo = {
    accountNumber: accountNumber,
    formattedAccountNumber: displayAccountNumber,
    ifscCode: kycVerified ? generateIFSCCode() : "XXXX0001234",
    branchName: "Central Bank of India - Main Branch",
    branchCode: "001234",
    username: user?.name || "User",
    accountType: primaryAccount ? getAccountTypeDisplayName(primaryAccount.ac_type) : "Savings Account"
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied to clipboard!`);
    }).catch(() => {
      toast.error('Failed to copy to clipboard');
    });
  };

  return (
    <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-100 border border-blue-200 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FaUniversity className="text-3xl text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Banking Details</h2>
        </div>
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {showDetails ? <FaEyeSlash /> : <FaEye />}
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>

      {showDetails && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Account Holder Name */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FaUser className="text-green-600" />
              <span className="font-semibold text-gray-700">Account Holder</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-mono text-gray-800">{bankingInfo.username}</span>
              <button
                onClick={() => copyToClipboard(bankingInfo.username, 'Account Holder Name')}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdContentCopy />
              </button>
            </div>
          </div>

          {/* Account Number */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FaCreditCard className="text-blue-600" />
              <span className="font-semibold text-gray-700">Account Number</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-mono text-gray-800">{bankingInfo.formattedAccountNumber}</span>
              <button
                onClick={() => copyToClipboard(bankingInfo.accountNumber, 'Account Number')}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdContentCopy />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">{bankingInfo.accountType}</p>
          </div>

          {/* IFSC Code */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FaUniversity className="text-purple-600" />
              <span className="font-semibold text-gray-700">IFSC Code</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-mono text-gray-800">{bankingInfo.ifscCode}</span>
              <button
                onClick={() => copyToClipboard(bankingInfo.ifscCode, 'IFSC Code')}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdContentCopy />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Branch: {bankingInfo.branchCode}</p>
          </div>
        </div>
      )}

      {showDetails && (
        <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FaUniversity className="text-orange-600" />
            <span className="font-semibold text-gray-700">Branch Information</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-medium">{bankingInfo.branchName}</p>
              <p className="text-sm text-gray-500">Branch Code: {bankingInfo.branchCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                📍 Use these details for fund transfers, NEFT, RTGS, and other banking transactions
              </p>
              <p className="text-xs text-blue-600 mt-1">
                ✓ All details are verified and secure
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
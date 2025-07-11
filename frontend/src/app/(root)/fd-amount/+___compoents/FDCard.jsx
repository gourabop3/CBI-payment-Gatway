"use client";
import Link from 'next/link';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaCoins, FaCalendarAlt, FaPercentage } from 'react-icons/fa'; 
import { MdTrendingUp } from 'react-icons/md';
import ClaimFDModel from './ClaimFDModel';

const FDCard = ({data,isUpdate,setIsUpdate}) => {
    const [isShow,setIsShow] = useState(false)
    const amount = `${data.amount}`

    const getStatusColor = (status) => {
        switch(status) {
            case 'active': return 'from-green-500 to-emerald-500';
            case 'matured': return 'from-blue-500 to-cyan-500';
            default: return 'from-gray-500 to-gray-600';
        }
    }

    const getStatusBadge = (status) => {
        switch(status) {
            case 'active': return { color: 'bg-green-100 text-green-800', text: 'Active' };
            case 'matured': return { color: 'bg-blue-100 text-blue-800', text: 'Matured' };
            default: return { color: 'bg-gray-100 text-gray-800', text: 'Pending' };
        }
    }

    const statusBadge = getStatusBadge(data.status);

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className={`h-2 bg-gradient-to-r ${getStatusColor(data.status)}`}></div>
            
            <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-50 p-3 rounded-xl">
                            <FaCoins className="text-2xl text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-800">
                                {data?.apply_for || 'Fixed Deposit'}
                            </h3>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusBadge.color}`}>
                                {statusBadge.text}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 text-sm mb-2">Deposit Amount</p>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl md:text-3xl font-bold text-gray-800">
                            ₹{isShow ? parseInt(amount).toLocaleString() : '••••••'}
                        </span>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setIsShow(!isShow)
                            }}
                            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                        >
                            {!isShow ? <FaEye className="text-gray-600" /> : <FaEyeSlash className="text-gray-600" />}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <FaPercentage className="text-green-600 text-sm" />
                            <span className="text-xs text-gray-600">Interest Rate</span>
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                            {data.interestRate || '7.5'}%
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <FaCalendarAlt className="text-blue-600 text-sm" />
                            <span className="text-xs text-gray-600">Tenure</span>
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                            {data.tenure || '12'} months
                        </div>
                    </div>
                </div>

                {data.maturityAmount && (
                    <div className="bg-green-50 p-4 rounded-lg mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <MdTrendingUp className="text-green-600" />
                            <span className="text-sm font-medium text-green-800">Maturity Amount</span>
                        </div>
                        <div className="text-xl font-bold text-green-700">
                            ₹{parseInt(data.maturityAmount).toLocaleString()}
                        </div>
                    </div>
                )}

                <div className="flex justify-end">
                    <ClaimFDModel methods={{isUpdate,setIsUpdate}} id={data?._id} />
                </div>
            </div>
        </div>
    )
}

export default FDCard
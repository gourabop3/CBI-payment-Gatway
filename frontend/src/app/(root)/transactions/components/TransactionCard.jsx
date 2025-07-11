import React from 'react';
import moment from 'moment';
import { txn_type } from '@/utils/constant';
import { FaArrowUp, FaArrowDown, FaMobile, FaReceipt } from 'react-icons/fa';
import { MdAccountBalance } from 'react-icons/md';

const TransactionCard = ({ data }) => {
  const txnType = data.type === 'credit' ? txn_type.credit : 
                  data.type === 'debit' ? txn_type.debit :
                  data.type === 'recharge' ? txn_type.recharge :
                  txn_type.fix_deposit;

  const getTransactionIcon = () => {
    switch (data.type) {
      case 'credit':
        return <FaArrowUp className="text-green-500" />;
      case 'debit':
        return <FaArrowDown className="text-red-500" />;
      case 'recharge':
        return <FaMobile className="text-blue-500" />;
      default:
        return <MdAccountBalance className="text-gray-500" />;
    }
  };

  const getAmountColor = () => {
    switch (data.type) {
      case 'credit':
        return 'text-green-600';
      case 'debit':
        return 'text-red-600';
      case 'recharge':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        {/* Left side - Icon and transaction details */}
        <div className="flex items-start gap-4 flex-1">
          <div className="bg-gray-50 p-3 rounded-full">
            {getTransactionIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  Transaction ID: {data._id}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {data.remark}
                </p>
                
                {/* Recharge specific details */}
                {data.type === 'recharge' && data.rechargeDetails && (
                  <div className="mt-2 text-xs text-gray-500">
                    {data.rechargeDetails.mobileNumber && (
                      <span>Mobile: {data.rechargeDetails.mobileNumber}</span>
                    )}
                    {data.rechargeDetails.operator && (
                      <span className="ml-2">• {data.rechargeDetails.operator}</span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="text-right">
                <div className={`text-lg md:text-xl font-bold ${getAmountColor()}`}>
                  {data.type === 'credit' ? '+' : data.type === 'debit' ? '-' : ''}₹{data.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  {moment(data.createdAt).format('MMM DD, YYYY')}
                </div>
                <div className="text-xs text-gray-400">
                  {moment(data.createdAt).format('hh:mm A')}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <span 
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${txnType['bg-color']} ${txnType.color}`}
                title={txnType.desc}
              >
                {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
              </span>
              
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                data.isSuccess 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {data.isSuccess ? 'Success' : 'Failed'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
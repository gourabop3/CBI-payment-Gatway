"use client";

import HeaderName from '@/components/HeaderName';
import React, { useEffect, useState } from 'react';
import TableCard from './+___compoents/TableCard';
import MessageShow from './+___compoents/MessageShow';
import { toast } from 'react-toastify';
import { axiosClient } from '@/utils/AxiosClient';
import CustomLoader from '@/components/reuseable/CustomLoader';

const Transactions = () => {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'deposits', 'recharges'

  const fetchAllTransaction = async () => {
    try {
      // Fetch regular transactions
      const transactionResponse = await axiosClient.get('/amount/transactions', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      // Fetch recharge history
      const rechargeResponse = await axiosClient.get('/recharge/history', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      const regularTransactions = transactionResponse.data || [];
      const rechargeHistory = rechargeResponse.data?.history || [];

      // Transform recharge history to match transaction format
      const transformedRecharges = rechargeHistory.map(recharge => ({
        _id: recharge.transactionId,
        type: 'recharge',
        amount: recharge.amount,
        createdAt: recharge.date,
        isSuccess: recharge.status === 'success',
        remark: recharge.description || `${recharge.type} - ${recharge.mobileNumber || recharge.consumerNumber}`,
        rechargeType: recharge.type,
        rechargeDetails: {
          mobileNumber: recharge.mobileNumber,
          operator: recharge.operator,
          billType: recharge.billType,
          consumerNumber: recharge.consumerNumber
        }
      }));

      // Combine and sort by date (newest first)
      const allTransactions = [...regularTransactions, ...transformedRecharges]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setTransaction(allTransactions);
    } catch (error) {
      toast.error(error?.response?.data?.msg || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredTransactions = () => {
    switch (activeTab) {
      case 'deposits':
        return transaction.filter(t => t.type === 'credit' || t.type === 'debit');
      case 'recharges':
        return transaction.filter(t => t.type === 'recharge');
      default:
        return transaction;
    }
  };

  useEffect(() => {
    fetchAllTransaction();
  }, []);

  return (
    <div className="container py-10">
      <HeaderName />

      <div className="relative overflow-x-auto py-10">
        <div className="px-3">
          <MessageShow />
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1 max-w-md">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Transactions
            </button>
            <button
              onClick={() => setActiveTab('deposits')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'deposits'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Deposits/Withdrawals
            </button>
            <button
              onClick={() => setActiveTab('recharges')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'recharges'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Recharges & Bills
            </button>
          </div>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 capitalize">Txn ID</th>
              <th className="px-6 py-3 capitalize">Type</th>
              <th className="px-6 py-3 capitalize">Amount</th>
              <th className="px-6 py-3 capitalize">Date</th>
              <th className="px-6 py-3 capitalize hidden lg:table-cell">Remark</th>
            </tr>
          </thead>

          {!loading && (
            <tbody>
              {getFilteredTransactions().length > 0 ? (
                getFilteredTransactions().map((cur, i) => (
                  <TableCard key={i} id={i} data={cur} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>

        {loading && (
          <div className="flex justify-center items-center py-10">
            <CustomLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
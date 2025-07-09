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
  const [loading, setLoading] = useState(true); // default true to delay table rendering

  const fetchAllTransaction = async () => {
    try {
      const response = await axiosClient.get('/amount/transactions', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const data = response.data;
      setTransaction(data);
    } catch (error) {
      toast.error(error?.response?.data?.msg || error.message);
    } finally {
      setLoading(false);
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

          {/* Do not render tbody at all while loading */}
          {!loading && (
            <tbody>
              {transaction.length > 0 ? (
                transaction.map((cur, i) => (
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

        {/* Render loader outside the table */}
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
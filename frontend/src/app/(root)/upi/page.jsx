"use client";
import React, { useState, useEffect } from 'react';
import { useMainContext } from '@/context/MainContext';
import { axiosClient } from '@/utils/AxiosClient';
import { toast } from 'react-toastify';
import HeaderName from '@/components/HeaderName';
import { 
  FaQrcode, 
  FaMoneyBillWave, 
  FaHistory, 
  FaSearch, 
  FaShieldAlt,
  FaCreditCard,
  FaUser,
  FaLock,
  FaArrowRight,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import { MdPayment, MdSecurity } from 'react-icons/md';

const UPIPage = () => {
  const { user } = useMainContext();
  const [activeTab, setActiveTab] = useState('pay');
  const [upiProfile, setUpiProfile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    receiverUpiId: '',
    amount: '',
    note: '',
    upi_pin: '',
    accountId: ''
  });

  // UPI ID creation form state
  const [upiIdForm, setUpiIdForm] = useState({
    upi_id: '',
    upi_pin: ''
  });

  // PIN change form state
  const [pinForm, setPinForm] = useState({
    current_pin: '',
    new_pin: '',
    confirm_pin: ''
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetchUpiProfile();
    fetchTransactions();
    fetchStats();
  }, []);

  const fetchUpiProfile = async () => {
    try {
      const response = await axiosClient.get('/upi/profile');
      setUpiProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching UPI profile:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axiosClient.get('/upi/transactions');
      setTransactions(response.data.data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axiosClient.get('/upi/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosClient.post('/upi/pay', paymentForm);
      toast.success(response.data.msg);
      setPaymentForm({
        receiverUpiId: '',
        amount: '',
        note: '',
        upi_pin: '',
        accountId: user?.account_no?.[0]?._id || ''
      });
      fetchTransactions();
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUpiId = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosClient.post('/upi/create-upi-id', upiIdForm);
      toast.success(response.data.msg);
      fetchUpiProfile();
      setUpiIdForm({ upi_id: '', upi_pin: '' });
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to create UPI ID');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePin = async (e) => {
    e.preventDefault();
    if (pinForm.new_pin !== pinForm.confirm_pin) {
      toast.error('New PINs do not match');
      return;
    }
    setLoading(true);

    try {
      const response = await axiosClient.post('/upi/change-pin', {
        current_pin: pinForm.current_pin,
        new_pin: pinForm.new_pin
      });
      toast.success(response.data.msg);
      setPinForm({ current_pin: '', new_pin: '', confirm_pin: '' });
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to change PIN');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await axiosClient.get(`/upi/search?upi_id=${searchQuery}`);
      setSearchResult(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'UPI ID not found');
      setSearchResult(null);
    }
  };

  const tabs = [
    { id: 'pay', label: 'Send Money', icon: <FaMoneyBillWave /> },
    { id: 'qr', label: 'QR Code', icon: <FaQrcode /> },
    { id: 'history', label: 'History', icon: <FaHistory /> },
    { id: 'search', label: 'Search', icon: <FaSearch /> },
    { id: 'setup', label: 'Setup', icon: <FaShieldAlt /> }
  ];

  const renderPaymentForm = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <MdPayment className="text-blue-600" />
        Send Money via UPI
      </h3>
      
      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Receiver UPI ID
          </label>
          <input
            type="text"
            placeholder="username@cbibank"
            value={paymentForm.receiverUpiId}
            onChange={(e) => setPaymentForm({...paymentForm, receiverUpiId: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (₹)
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={paymentForm.amount}
            onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            max="100000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note (Optional)
          </label>
          <input
            type="text"
            placeholder="Add a note"
            value={paymentForm.note}
            onChange={(e) => setPaymentForm({...paymentForm, note: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength="50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UPI PIN
          </label>
          <input
            type="password"
            placeholder="Enter 6-digit UPI PIN"
            value={paymentForm.upi_pin}
            onChange={(e) => setPaymentForm({...paymentForm, upi_pin: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            pattern="[0-9]{6}"
            maxLength="6"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? 'Processing...' : 'Send Money'}
          <FaArrowRight />
        </button>
      </form>
    </div>
  );

  const renderQRCode = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaQrcode className="text-green-600" />
        Your UPI QR Code
      </h3>
      
      {upiProfile?.upi_id ? (
        <div className="text-center">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-2">Your UPI ID</p>
            <p className="text-xl font-bold text-gray-800">{upiProfile.upi_id}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Scan to pay</p>
            <div className="w-48 h-48 mx-auto bg-white p-2 rounded-lg">
              {/* QR Code will be generated here */}
              <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                <FaQrcode className="text-4xl text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <FaQrcode className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Set up your UPI ID to generate QR code</p>
          <button
            onClick={() => setActiveTab('setup')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Setup UPI ID
          </button>
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaHistory className="text-purple-600" />
        UPI Transaction History
      </h3>
      
      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map((txn) => (
            <div key={txn._id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {txn.sender._id === user?._id ? (
                    <FaArrowRight className="text-red-500" />
                  ) : (
                    <FaArrowLeft className="text-green-500" />
                  )}
                  <span className="font-semibold">
                    {txn.sender._id === user?._id ? 'Sent to' : 'Received from'}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  txn.status === 'completed' ? 'bg-green-100 text-green-800' :
                  txn.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {txn.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800">
                    {txn.sender._id === user?._id ? txn.receiver.name : txn.sender.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {txn.sender._id === user?._id ? txn.receiverUpiId : txn.senderUpiId}
                  </p>
                  {txn.note && <p className="text-sm text-gray-500">"{txn.note}"</p>}
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${
                    txn.sender._id === user?._id ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {txn.sender._id === user?._id ? '-' : '+'}₹{txn.amount}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(txn.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <FaHistory className="text-4xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No UPI transactions yet</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaSearch className="text-orange-600" />
        Search UPI ID
      </h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter UPI ID (e.g., username@cbibank)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
          >
            Search
          </button>
        </div>

        {searchResult && (
          <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-center gap-2 mb-2">
              <FaCheckCircle className="text-green-600" />
              <span className="font-semibold text-green-800">UPI ID Found</span>
            </div>
            <div className="space-y-2">
              <p><strong>Name:</strong> {searchResult.name}</p>
              <p><strong>UPI ID:</strong> {searchResult.upi_id}</p>
              <p><strong>Account Type:</strong> {searchResult.account_type}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSetup = () => (
    <div className="space-y-6">
      {/* UPI ID Creation */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaUser className="text-blue-600" />
          {upiProfile?.upi_id ? 'Update UPI ID' : 'Create UPI ID'}
        </h3>
        
        {upiProfile?.upi_id ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FaCheckCircle className="text-green-600" />
              <span className="font-semibold text-green-800">UPI ID Active</span>
            </div>
            <p className="text-green-700">{upiProfile.upi_id}</p>
          </div>
        ) : (
          <form onSubmit={handleCreateUpiId} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID
              </label>
              <input
                type="text"
                placeholder="username@cbibank"
                value={upiIdForm.upi_id}
                onChange={(e) => setUpiIdForm({...upiIdForm, upi_id: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI PIN (6 digits)
              </label>
              <input
                type="password"
                placeholder="Enter 6-digit PIN"
                value={upiIdForm.upi_pin}
                onChange={(e) => setUpiIdForm({...upiIdForm, upi_pin: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                pattern="[0-9]{6}"
                maxLength="6"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create UPI ID'}
            </button>
          </form>
        )}
      </div>

      {/* PIN Management */}
      {upiProfile?.upi_pin_setup && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaLock className="text-red-600" />
            Change UPI PIN
          </h3>
          
          <form onSubmit={handleChangePin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current PIN
              </label>
              <input
                type="password"
                placeholder="Enter current 6-digit PIN"
                value={pinForm.current_pin}
                onChange={(e) => setPinForm({...pinForm, current_pin: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                pattern="[0-9]{6}"
                maxLength="6"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New PIN
              </label>
              <input
                type="password"
                placeholder="Enter new 6-digit PIN"
                value={pinForm.new_pin}
                onChange={(e) => setPinForm({...pinForm, new_pin: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                pattern="[0-9]{6}"
                maxLength="6"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New PIN
              </label>
              <input
                type="password"
                placeholder="Confirm new 6-digit PIN"
                value={pinForm.confirm_pin}
                onChange={(e) => setPinForm({...pinForm, confirm_pin: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                pattern="[0-9]{6}"
                maxLength="6"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Changing...' : 'Change PIN'}
            </button>
          </form>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <HeaderName />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-xl">
              <FaCreditCard className="text-2xl md:text-3xl" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">UPI Payments</h2>
              <p className="text-green-100">Instant money transfers with UPI</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm text-green-100">Total Transactions</p>
              <p className="text-2xl font-bold">{stats.totalTransactions || 0}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm text-green-100">Total Sent</p>
              <p className="text-2xl font-bold">₹{stats.totalSent || 0}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm text-green-100">Total Received</p>
              <p className="text-2xl font-bold">₹{stats.totalReceived || 0}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap border-b-2 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'pay' && renderPaymentForm()}
          {activeTab === 'qr' && renderQRCode()}
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'search' && renderSearch()}
          {activeTab === 'setup' && renderSetup()}
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MdSecurity className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Secure PIN Protection
            </h3>
            <p className="text-gray-600 text-sm">
              6-digit UPI PIN for secure transactions
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FaShieldAlt className="text-2xl text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Instant Transfers
            </h3>
            <p className="text-gray-600 text-sm">
              Real-time money transfers 24/7
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FaQrcode className="text-2xl text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              QR Code Payments
            </h3>
            <p className="text-gray-600 text-sm">
              Scan and pay with QR codes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UPIPage;
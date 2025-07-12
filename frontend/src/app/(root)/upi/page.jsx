"use client";
import React, { useState, useEffect } from 'react';
import HeaderName from '@/components/HeaderName';
import { MdQrCode, MdSend, MdHistory, MdAccountBalance, MdPayment } from 'react-icons/md';
import { FaDownload, FaShare, FaCopy, FaCheck } from 'react-icons/fa';
import Card from '@/components/ui/Card';
import { useMainContext } from '@/context/MainContext';

const UPIPage = () => {
  const { user } = useMainContext();
  const token = (user && user.token) || '';
  const [activeTab, setActiveTab] = useState('pay');
  const [upiInfo, setUpiInfo] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Payment form states
  const [paymentForm, setPaymentForm] = useState({
    recipient_upi: '',
    amount: '',
    note: '',
    pin: ''
  });

  // QR generation form states
  const [qrForm, setQrForm] = useState({
    amount: '',
    note: ''
  });

  const [validationResult, setValidationResult] = useState(null);

  const [registrationForm, setRegistrationForm] = useState({
    upi_id: '',
    pin: '',
    confirm_pin: ''
  });
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState({ success: null, error: null });

  useEffect(() => {
    fetchUPIInfo();
    fetchTransactions();
  }, []);

  const fetchUPIInfo = async () => {
    try {
      const response = await fetch('/api/v1/upi/info', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUpiInfo(data.upi_info);
      }
    } catch (error) {
      console.error('Error fetching UPI info:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/v1/upi/transactions?page=1&limit=10', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setTransactions(data.transactions || []);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const generateQR = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/v1/upi/qr?amount=${qrForm.amount}&note=${qrForm.note}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setQrCode(data);
      }
    } catch (error) {
      console.error('Error generating QR:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateUPI = async (upi_id) => {
    if (!upi_id) return;
    try {
      const response = await fetch(`/api/v1/upi/validate/${upi_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setValidationResult(data);
    } catch (error) {
      console.error('Error validating UPI:', error);
    }
  };

  const registerUPI = async () => {
    if (!registrationForm.upi_id || !registrationForm.pin || registrationForm.pin !== registrationForm.confirm_pin) {
      setRegistrationError('Please enter matching PIN and a valid UPI ID');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/v1/upi/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ upi_id: registrationForm.upi_id, pin: registrationForm.pin })
      });
      const data = await response.json();
      if (response.ok) {
        setRegistrationSuccess('UPI ID created successfully!');
        setRegistrationError(null);
        setRegistrationForm({ upi_id: '', pin: '', confirm_pin: '' });
        fetchUPIInfo();
      } else {
        setRegistrationError(data.msg || 'Registration failed');
        setRegistrationSuccess(null);
      }
    } catch (error) {
      console.error('Error registering UPI:', error);
      setRegistrationError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/upi/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentForm)
      });
      const data = await response.json();
      if (response.ok) {
        setPaymentStatus({ success: 'Payment successful!', error: null });
        setPaymentForm({ recipient_upi: '', amount: '', note: '', pin: '' });
        fetchTransactions();
        fetchUPIInfo();
      } else {
        setPaymentStatus({ success: null, error: data.msg || 'Payment failed' });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentStatus({ success: null, error: 'Payment failed' });
    } finally {
      setLoading(false);
    }
  };

  const copyUPIId = () => {
    navigator.clipboard.writeText(upiInfo?.upi_id || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container py-6 px-4">
        <HeaderName />
        
        {/* Show registration card if user has no UPI yet */}
        {(!upiInfo || !upiInfo.upi_id) && (
          <Card className="mb-6 p-6 bg-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MdQrCode className="text-blue-600" />
              Create Your UPI ID
            </h2>
            {registrationError && (
              <p className="text-red-600 text-sm mb-2">{registrationError}</p>
            )}
            {registrationSuccess && (
              <p className="text-green-600 text-sm mb-2">{registrationSuccess}</p>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Desired UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@cbibank"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={registrationForm.upi_id}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, upi_id: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Set UPI PIN</label>
                <input
                  type="password"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={registrationForm.pin}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, pin: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm UPI PIN</label>
                <input
                  type="password"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={registrationForm.confirm_pin}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, confirm_pin: e.target.value }))}
                />
              </div>
              <button
                onClick={registerUPI}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Creating...' : 'Create UPI ID'}
              </button>
            </div>
          </Card>
        )}

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            CBI Bank UPI
          </h1>
          <p className="text-lg text-gray-600">
            Fast, Secure & Instant Payments
          </p>
        </div>

        {/* UPI Info Card */}
        {upiInfo && (
          <Card className="mb-6 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Your UPI ID</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-mono">{upiInfo.upi_id}</span>
                  <button
                    onClick={copyUPIId}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Available Balance</p>
                <p className="text-2xl font-bold">{formatCurrency(upiInfo.balance)}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-md">
            {[
              { id: 'pay', label: 'Pay', icon: MdSend },
              { id: 'receive', label: 'Receive', icon: MdQrCode },
              { id: 'history', label: 'History', icon: MdHistory }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-2xl mx-auto">
          {/* Pay Tab */}
          {activeTab === 'pay' && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MdSend className="text-blue-600" />
                Send Money
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient UPI ID
                  </label>
                  <input
                    type="text"
                    placeholder="example@cbibank"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={paymentForm.recipient_upi}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPaymentForm(prev => ({ ...prev, recipient_upi: value }));
                      if (value.includes('@')) {
                        validateUPI(value);
                      }
                    }}
                  />
                  {validationResult && (
                    <div className={`mt-2 text-sm ${validationResult.valid ? 'text-green-600' : 'text-red-600'}`}>
                      {validationResult.valid 
                        ? `Valid UPI ID - ${validationResult.user?.name}`
                        : validationResult.message
                      }
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI PIN
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your UPI PIN"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={paymentForm.pin}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, pin: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Payment for..."
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={paymentForm.note}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, note: e.target.value }))}
                  />
                </div>

                {paymentStatus.error && (
                  <p className="text-red-600 text-sm">{paymentStatus.error}</p>
                )}
                {paymentStatus.success && (
                  <p className="text-green-600 text-sm">{paymentStatus.success}</p>
                )}
                <button
                  onClick={processPayment}
                  disabled={loading || !paymentForm.recipient_upi || !paymentForm.amount || !paymentForm.pin}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Processing...' : 'Send Money'}
                </button>
              </div>
            </Card>
          )}

          {/* Receive Tab */}
          {activeTab === 'receive' && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MdQrCode className="text-blue-600" />
                Receive Money
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹) - Optional
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={qrForm.amount}
                    onChange={(e) => setQrForm(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note - Optional
                  </label>
                  <input
                    type="text"
                    placeholder="Payment for..."
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={qrForm.note}
                    onChange={(e) => setQrForm(prev => ({ ...prev, note: e.target.value }))}
                  />
                </div>

                <button
                  onClick={generateQR}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Generating...' : 'Generate QR Code'}
                </button>
              </div>

              {qrCode && (
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                    <img 
                      src={qrCode.qr} 
                      alt="UPI QR Code" 
                      className="w-64 h-64 mx-auto"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      Scan with any UPI app to pay {upiInfo?.name}
                    </p>
                    {qrCode.amount && (
                      <p className="text-lg font-semibold text-blue-600">
                        Amount: {formatCurrency(qrCode.amount)}
                      </p>
                    )}
                    <div className="flex justify-center gap-2 mt-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        <FaDownload />
                        Download
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        <FaShare />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MdHistory className="text-blue-600" />
                Transaction History
              </h2>

              <div className="space-y-4">
                {transactions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MdPayment className="text-4xl mx-auto mb-2 opacity-50" />
                    <p>No UPI transactions yet</p>
                  </div>
                ) : (
                  transactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.remark}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(transaction.createdAt)}
                          </p>
                          {transaction.sender_upi && (
                            <p className="text-xs text-gray-400">From: {transaction.sender_upi}</p>
                          )}
                          {transaction.recipient_upi && (
                            <p className="text-xs text-gray-400">To: {transaction.recipient_upi}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          transaction.isSuccess 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.isSuccess ? 'Success' : 'Failed'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <MdQrCode className="text-3xl text-blue-600" />,
              title: "QR Payments",
              description: "Generate and scan QR codes for instant payments"
            },
            {
              icon: <MdSend className="text-3xl text-green-600" />,
              title: "Instant Transfers",
              description: "Send money instantly using UPI ID"
            },
            {
              icon: <MdAccountBalance className="text-3xl text-purple-600" />,
              title: "24/7 Available",
              description: "Transfer money anytime, anywhere"
            }
          ].map((feature, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UPIPage;
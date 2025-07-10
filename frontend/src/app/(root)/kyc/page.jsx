"use client";
import { useEffect, useState } from 'react';
import { useMainContext } from '@/context/MainContext';
import { axiosClient } from '@/utils/AxiosClient';
import { toast } from 'react-toastify';
import HeaderName from '@/components/HeaderName';
import { FaShieldAlt, FaUser, FaPhone, FaHome, FaIdCard, FaCreditCard, FaImage, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

export default function KYCPage() {
  const { user, fetchUserProfile } = useMainContext();
  const [form, setForm] = useState({ 
    fullName: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    aadhaarNumber: '', 
    panNumber: '', 
    aadhaarImage: null, 
    panImage: null 
  });
  const [preview, setPreview] = useState({ aadhaarImage: '', panImage: '' });
  const [loading, setLoading] = useState(false);
  const [statusObj, setStatusObj] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axiosClient.get('/kyc/status', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        });
        setStatusObj(await res.data);
      } catch (error) {
        // ignore if no application
      }
    };
    fetchStatus();
    
    // Pre-fill user data if available
    if (user) {
      setForm(prev => ({
        ...prev,
        fullName: user.name || '',
        mobileNumber: user.mobile_no || ''
      }));
    }
  }, [user]);

  const handleFile = (name) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, [name]: reader.result }));
      setPreview((prev) => ({ ...prev, [name]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    
    // Format inputs
    let formattedValue = value;
    
    if (name === 'aadhaarNumber') {
      // Only allow numbers and limit to 12 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 12);
    } else if (name === 'panNumber') {
      // Convert to uppercase and limit to 10 characters
      formattedValue = value.toUpperCase().slice(0, 10);
    } else if (name === 'mobileNumber') {
      // Only allow numbers and limit to 10 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'pincode') {
      // Only allow numbers and limit to 6 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 6);
    }
    
    setForm({ ...form, [name]: formattedValue });
  };

  const validateForm = () => {
    if (!form.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    
    if (!/^[6-9]\d{9}$/.test(form.mobileNumber)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }
    
    if (!form.address.trim()) {
      toast.error('Please enter your address');
      return false;
    }
    
    if (!form.city.trim()) {
      toast.error('Please enter your city');
      return false;
    }
    
    if (!form.state.trim()) {
      toast.error('Please enter your state');
      return false;
    }
    
    if (!/^\d{6}$/.test(form.pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    
    if (!/^\d{12}$/.test(form.aadhaarNumber)) {
      toast.error('Please enter a valid 12-digit Aadhaar number');
      return false;
    }
    
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNumber)) {
      toast.error('Please enter a valid PAN number (e.g., ABCDE1234F)');
      return false;
    }
    
    if (!form.aadhaarImage) {
      toast.error('Please upload Aadhaar card image');
      return false;
    }
    
    if (!form.panImage) {
      toast.error('Please upload PAN card image');
      return false;
    }
    
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      await axiosClient.post('/kyc/apply', form, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      toast.success('KYC application submitted successfully! We will review your documents within 24-48 hours.');
      await fetchUserProfile();
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    } finally {
      setLoading(false);
    }
  };

  const currentStatus = user?.kyc_status || 'not_submitted';

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <FaCheckCircle className="text-green-600 text-2xl" />;
      case 'pending':
        return <FaClock className="text-yellow-600 text-2xl" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-600 text-2xl" />;
      default:
        return <FaShieldAlt className="text-gray-400 text-2xl" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'rejected':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'verified':
        return 'Your KYC is verified and approved. You can access all banking features.';
      case 'pending':
        return 'Your KYC application is under review. We will notify you once it\'s processed.';
      case 'rejected':
        return 'Your KYC application was rejected. Please check the details and resubmit.';
      default:
        return 'Please complete your KYC verification to access all banking features.';
    }
  };

  return (
    <div className="container py-10 px-4">
      <HeaderName />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-white text-2xl" />
              <h1 className="text-2xl font-bold text-white">KYC Verification</h1>
            </div>
          </div>

          {/* Status Card */}
          <div className="p-6">
            <div className={`rounded-lg border p-4 ${getStatusColor(currentStatus)}`}>
              <div className="flex items-center gap-3 mb-2">
                {getStatusIcon(currentStatus)}
                <div>
                  <h3 className="font-semibold text-lg">
                    Status: <span className="capitalize">{currentStatus.replace('_', ' ')}</span>
                  </h3>
                  <p className="text-sm">{getStatusMessage(currentStatus)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KYC Form */}
        {(currentStatus === 'not_submitted' || currentStatus === 'rejected') && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FaUser className="text-blue-600" />
                Complete Your KYC Verification
              </h2>

              <form onSubmit={onSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                    <FaUser className="text-blue-600" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input 
                        name="fullName" 
                        value={form.fullName} 
                        onChange={onChange} 
                        required 
                        placeholder="Enter your full name as per ID proof"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaPhone className="inline mr-1" />
                        Mobile Number *
                      </label>
                      <input 
                        name="mobileNumber" 
                        value={form.mobileNumber} 
                        onChange={onChange} 
                        required 
                        placeholder="Enter 10-digit mobile number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                    <FaHome className="text-blue-600" />
                    Address Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complete Address *
                    </label>
                    <textarea 
                      name="address" 
                      value={form.address} 
                      onChange={onChange} 
                      required 
                      rows="3"
                      placeholder="Enter your complete address (House no, Street, Area)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input 
                        name="city" 
                        value={form.city} 
                        onChange={onChange} 
                        required 
                        placeholder="Enter city"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input 
                        name="state" 
                        value={form.state} 
                        onChange={onChange} 
                        required 
                        placeholder="Enter state"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <input 
                        name="pincode" 
                        value={form.pincode} 
                        onChange={onChange} 
                        required 
                        placeholder="6-digit pincode"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      />
                    </div>
                  </div>
                </div>

                {/* Identity Documents */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                    <FaIdCard className="text-blue-600" />
                    Identity Documents
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aadhaar Number *
                      </label>
                      <input 
                        name="aadhaarNumber" 
                        value={form.aadhaarNumber} 
                        onChange={onChange} 
                        required 
                        placeholder="Enter 12-digit Aadhaar number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaCreditCard className="inline mr-1" />
                        PAN Number *
                      </label>
                      <input 
                        name="panNumber" 
                        value={form.panNumber} 
                        onChange={onChange} 
                        required 
                        placeholder="Enter PAN number (e.g., ABCDE1234F)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      />
                    </div>
                  </div>
                </div>

                {/* Document Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                    <FaImage className="text-blue-600" />
                    Document Upload
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aadhaar Card Image * (Max 5MB)
                      </label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFile('aadhaarImage')} 
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      />
                      {preview.aadhaarImage && (
                        <div className="mt-3">
                          <img src={preview.aadhaarImage} alt="Aadhaar preview" className="h-32 w-full object-contain border rounded-lg" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PAN Card Image * (Max 5MB)
                      </label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFile('panImage')} 
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      />
                      {preview.panImage && (
                        <div className="mt-3">
                          <img src={preview.panImage} alt="PAN preview" className="h-32 w-full object-contain border rounded-lg" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={loading} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Submitting KYC Application...
                      </>
                    ) : (
                      <>
                        <FaShieldAlt />
                        Submit KYC Application
                      </>
                    )}
                  </button>
                </div>

                {/* Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> Please ensure all information matches your official documents. 
                    KYC verification typically takes 24-48 hours. You'll be notified via SMS/email once your documents are verified.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
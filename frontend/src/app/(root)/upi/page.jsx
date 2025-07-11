"use client";
import React from 'react';
import HeaderName from '@/components/HeaderName';
import { MdQrCode, MdTransferWithinAStation, MdPhoneAndroid } from 'react-icons/md';
import { FaArrowRight, FaCode, FaShieldAlt, FaRocket } from 'react-icons/fa';
import Card from '@/components/ui/Card';

const TestingPage = () => {
  const features = [
    {
      icon: <MdQrCode className="text-4xl md:text-5xl text-blue-600" />,
      title: "QR Code Payments",
      description: "Generate and scan QR codes for instant payments. Secure, fast, and convenient payment solution.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MdTransferWithinAStation className="text-4xl md:text-5xl text-green-600" />,
      title: "Instant Transfers",
      description: "Real-time money transfers with UPI. Send and receive money instantly across all banks.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <MdPhoneAndroid className="text-4xl md:text-5xl text-purple-600" />,
      title: "Mobile First",
      description: "Optimized for mobile devices with responsive design and intuitive user interface.",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const apiFeatures = [
    {
      icon: <FaCode className="text-2xl text-blue-600" />,
      title: "REST APIs",
      description: "RESTful API endpoints for seamless integration"
    },
    {
      icon: <FaShieldAlt className="text-2xl text-green-600" />,
      title: "Secure Authentication",
      description: "OAuth 2.0 and JWT token-based security"
    },
    {
      icon: <FaRocket className="text-2xl text-purple-600" />,
      title: "Real-time Processing",
      description: "Instant transaction processing and notifications"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <HeaderName />
        
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6">
            Testing
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Secure access to CBI Bank's developer APIs
          </p>
          <div className="mt-8 md:mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-xl">
                <FaCode className="text-2xl md:text-3xl text-white" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Developer Portal</h3>
                <p className="text-gray-600">Build powerful financial applications with our comprehensive API suite</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-0 overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className={`h-2 bg-gradient-to-r ${feature.gradient}`}></div>
              <div className="p-6 md:p-8">
                <div className="mb-6 flex justify-center">
                  <div className="bg-gray-50 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  {feature.description}
                </p>
                <div className="text-center">
                  <button className={`inline-flex items-center gap-2 bg-gradient-to-r ${feature.gradient} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                    Explore
                    <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* API Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 mb-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              API Features
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our robust API infrastructure provides everything you need to build modern banking applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {apiFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="bg-gray-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers building the future of banking with our secure and scalable APIs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300 transform hover:scale-105">
              View Documentation
            </button>
            <button className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
              Get API Keys
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { number: "99.9%", label: "Uptime" },
            { number: "50M+", label: "API Calls/Month" },
            { number: "500ms", label: "Average Response" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 md:p-6 bg-white rounded-xl shadow-lg">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestingPage;
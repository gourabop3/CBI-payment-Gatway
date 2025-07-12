"use client";
import { FaReact, FaNodeJs, FaDatabase, FaShieldAlt, FaMobile, FaCode, FaServer, FaDesktop } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiJavascript, SiGit } from 'react-icons/si';
import { MdPayment, MdAccountBalance, MdSecurity, MdSpeed, MdChat, MdQrCode, MdBolt, MdReceipt } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { RiBankCardLine } from 'react-icons/ri';
import HeaderName from '@/components/HeaderName';



const frontendTech = [
  { name: 'React 19.0.0', icon: FaReact, description: 'Modern UI library with hooks and functional components', why: 'Component-based architecture for reusable UI elements' },
  { name: 'Next.js 15.2.4', icon: SiNextdotjs, description: 'React framework for production-ready applications', why: 'SSR, routing, and optimized performance out of the box' },
  { name: 'TailwindCSS 4.0', icon: SiTailwindcss, description: 'Utility-first CSS framework for modern design', why: 'Rapid UI development with utility classes' },
  { name: 'Redux Toolkit', icon: FaCode, description: 'State management for complex application logic', why: 'Centralized state management with simplified Redux' },
  { name: 'Framer Motion', icon: FaCode, description: 'Advanced animations and transitions', why: 'Smooth, performant animations with declarative API' },
];

const backendTech = [
  { name: 'Node.js', icon: FaNodeJs, description: 'JavaScript runtime for server-side development', why: 'JavaScript everywhere - same language for frontend and backend' },
  { name: 'Express.js 5.1.0', icon: SiExpress, description: 'Fast, unopinionated web framework', why: 'Minimal, flexible framework for building APIs' },
  { name: 'MongoDB', icon: SiMongodb, description: 'NoSQL database for flexible data storage', why: 'Schema flexibility and JSON-like document structure' },
  { name: 'JWT Authentication', icon: FaShieldAlt, description: 'Secure token-based authentication', why: 'Stateless authentication for scalable applications' },
  { name: 'Razorpay', icon: MdPayment, description: 'Payment gateway integration', why: 'Popular Indian payment gateway with comprehensive APIs' },
  { name: 'OpenAI', icon: MdChat, description: 'AI-powered chatbot and customer service', why: 'Advanced NLP for intelligent customer support' },
];

const features = [
  { 
    title: 'UPI Payment System', 
    description: 'Instant money transfers with QR code generation and multi-bank support', 
    icon: MdPayment,
    details: ['QR Code Generation', 'NEFT/RTGS/IMPS', 'Real-time Processing', 'Transaction History']
  },
  { 
    title: 'Account Management', 
    description: 'Comprehensive banking operations with real-time balance tracking', 
    icon: MdAccountBalance,
    details: ['Live Balance Updates', 'Transaction History', 'Account Statements', 'Fixed Deposits']
  },
  { 
    title: 'Digital Services', 
    description: 'Complete digital banking ecosystem with mobile recharge and bill payments', 
    icon: MdBolt,
    details: ['Mobile Recharge', 'Bill Payments', 'DTH/Cable TV', 'Credit Card Bills']
  },
  { 
    title: 'AI-Powered Chatbot', 
    description: '24/7 intelligent customer service with natural language processing', 
    icon: MdChat,
    details: ['Natural Language Processing', 'Banking Assistance', 'Fraud Detection', 'Personalized Support']
  },
  { 
    title: 'Security & Compliance', 
    description: 'Bank-grade security with industry best practices and compliance', 
    icon: MdSecurity,
    details: ['Two-Factor Authentication', 'JWT Token Management', 'KYC Verification', 'Fraud Prevention']
  },
  { 
    title: 'Card Management', 
    description: 'Complete ATM/Debit card controls and management system', 
    icon: RiBankCardLine,
    details: ['Card Activation/Blocking', 'PIN Management', 'Transaction Limits', 'Card Controls']
  },
];



export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <HeaderName />
      <div className="bg-white shadow-xl rounded-2xl p-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-rose-600 mb-6">
            🏦 CBI Digital Banking Platform
          </h1>
          <p className="text-gray-700 leading-relaxed text-xl max-w-4xl mx-auto">
            A comprehensive, full-stack banking application that provides modern digital banking solutions with cutting-edge technology. 
            Built with <span className="font-semibold text-rose-600">React</span>, <span className="font-semibold text-rose-600">Node.js</span>, and <span className="font-semibold text-rose-600">modern web technologies</span> for seamless user experience.
          </p>
        </div>

        {/* Technologies Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <FaCode className="text-rose-600" />
            Technology Stack
          </h2>
          
          {/* Frontend Technologies */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
              <FaDesktop className="text-blue-600" />
              Frontend Technologies
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {frontendTech.map(({ name, icon: Icon, description, why }) => (
                <div key={name} className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg shadow-lg border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="text-3xl text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{description}</p>
                  <p className="text-blue-600 text-xs font-medium">Why: {why}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Technologies */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
              <FaServer className="text-green-600" />
              Backend Technologies
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {backendTech.map(({ name, icon: Icon, description }) => (
                <div key={name} className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg shadow-lg border border-green-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="text-3xl text-green-600" />
                    <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
                  </div>
                  <p className="text-gray-700 text-sm">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Axios Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <SiAxios className="text-rose-600" />
            Why Axios?
          </h2>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-lg shadow-lg border border-purple-200">
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              <strong>Axios</strong> is chosen as the HTTP client for this project due to its powerful features that enhance API communication, 
              error handling, and developer experience. It provides a clean and intuitive interface for making HTTP requests with automatic 
              JSON transformation and comprehensive error handling.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {axiosBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <FaMobile className="text-rose-600" />
            Project Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map(({ title, description, icon: Icon, details }) => (
              <div key={title} className="bg-gradient-to-r from-rose-50 to-pink-50 p-8 rounded-lg shadow-lg border border-rose-200 hover:shadow-xl hover:scale-105 transition-all duration-300 transform">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="text-3xl text-rose-600" />
                  <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
                </div>
                <p className="text-gray-800 font-medium mb-4">{description}</p>
                <div className="space-y-2">
                  {details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-rose-600 rounded-full"></div>
                      <span className="text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Developer Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <FaCode className="text-rose-600" />
            Developer Information
          </h2>
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-8 rounded-lg shadow-lg border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Gourab Mullick</h3>
              <p className="text-gray-600 text-lg">Full-Stack Developer & Banking Solutions Specialist</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">About the Developer</h4>
                <p className="text-gray-700 leading-relaxed">
                  Passionate full-stack developer with expertise in modern web technologies. Specialized in building 
                  secure, scalable banking applications with focus on user experience and performance optimization. 
                  Committed to delivering high-quality, production-ready solutions.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Technical Expertise</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Full-Stack Development (MERN Stack)</li>
                  <li>• Banking & Financial Applications</li>
                  <li>• API Development & Integration</li>
                  <li>• Security & Authentication</li>
                  <li>• Payment Gateway Integration</li>
                  <li>• AI/ML Integration</li>
                </ul>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-800 mb-6">Connect with the Developer</h4>
              <div className="flex justify-center items-center gap-4 flex-wrap">
                {socials.map(({ href, label, Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 ${color}`}
                  >
                    <Icon className="text-2xl" />
                    <span className="font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Highlights */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">
            Technical Highlights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow-lg border border-blue-200">
              <MdSpeed className="text-4xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Performance</h3>
              <p className="text-sm text-gray-700">Optimized for fast loading and smooth interactions</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-lg border border-green-200">
              <FaShieldAlt className="text-4xl text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Security</h3>
              <p className="text-sm text-gray-700">Bank-grade security with industry best practices</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg shadow-lg border border-purple-200">
              <FaMobile className="text-4xl text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Responsive</h3>
              <p className="text-sm text-gray-700">Works perfectly on desktop, tablet, and mobile</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg shadow-lg border border-rose-200">
              <BiTransfer className="text-4xl text-rose-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Real-time</h3>
              <p className="text-sm text-gray-700">Live updates and instant notifications</p>
            </div>
          </div>
        </section>

        {/* Project Status */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-8 rounded-lg shadow-lg border border-rose-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Project Status</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Version</h3>
                <p className="text-rose-600 font-bold">1.0.0</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Status</h3>
                <p className="text-green-600 font-bold">Production Ready</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Support</h3>
                <p className="text-blue-600 font-bold">Actively Maintained</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
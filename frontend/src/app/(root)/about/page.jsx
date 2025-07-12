"use client";
import { AiOutlineGithub, AiOutlineInstagram, AiOutlineMail } from 'react-icons/ai';
import { FaReact, FaNodeJs, FaServer, FaDesktop, FaTelegram, FaShieldAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiRedux, SiFramer, SiAxios, SiCloudinary, SiRazorpay, SiOpenai, SiJsonwebtokens } from 'react-icons/si';
import { MdPayment, MdAccountBalance, MdSecurity, MdBolt, MdDeveloperMode, MdChat, MdPhoneAndroid, MdReceipt } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { RiBankCardLine } from 'react-icons/ri';
import HeaderName from '@/components/HeaderName';

const socialLinks = [
  { 
    href: 'https://github.com/gourabop', 
    label: 'GitHub', 
    Icon: AiOutlineGithub
  },
  { 
    href: 'https://instagram.com/gourab_op_84', 
    label: 'Instagram', 
    Icon: AiOutlineInstagram
  },
  { 
    href: 'https://t.me/its_me_gourab', 
    label: 'Telegram', 
    Icon: FaTelegram
  },
  { 
    href: 'mailto:gourabmullick200@gmail.com', 
    label: 'Gmail', 
    Icon: AiOutlineMail
  }
];

const frontendTechnologies = [
  { name: 'Next.js', version: '15.2.4', icon: SiNextdotjs, reason: 'Server-side rendering and SEO optimization essential for banking applications' },
  { name: 'React', version: '19.0.0', icon: FaReact, reason: 'Component reusability and virtual DOM performance for complex banking interfaces' },
  { name: 'Redux Toolkit', version: '2.6.1', icon: SiRedux, reason: 'Centralized state management for financial transactions and data flow' },
  { name: 'TailwindCSS', version: '4.0', icon: SiTailwindcss, reason: 'Rapid UI development and consistent design system across banking features' },
  { name: 'Framer Motion', version: '12.23.3', icon: SiFramer, reason: 'Professional animations and micro-interactions for banking operations' },
  { name: 'Axios', version: '1.8.4', icon: SiAxios, reason: 'HTTP client with interceptors for secure API communication' }
];

const backendTechnologies = [
  { name: 'Node.js', version: 'Latest', icon: FaNodeJs, reason: 'Non-blocking I/O operations for concurrent banking transactions' },
  { name: 'Express.js', version: '5.1.0', icon: SiExpress, reason: 'Lightweight framework with middleware for RESTful APIs' },
  { name: 'MongoDB', version: '8.13.2', icon: SiMongodb, reason: 'Flexible data storage for diverse banking data and horizontal scaling' },
  { name: 'JWT', version: '9.0.2', icon: SiJsonwebtokens, reason: 'Stateless authentication and secure session management' },
  { name: 'Cloudinary', version: '2.6.1', icon: SiCloudinary, reason: 'Secure document storage for KYC documents and profile pictures' },
  { name: 'Razorpay', version: '2.9.6', icon: SiRazorpay, reason: 'Payment gateway for UPI, card payments, and banking transactions' },
  { name: 'OpenAI', version: '4.21.0', icon: SiOpenai, reason: 'AI chatbot for 24/7 customer support and banking queries' },
  { name: 'bcryptjs', version: '3.0.2', icon: FaShieldAlt, reason: 'Password security and authentication for banking applications' }
];

const projectFeatures = [
  { title: 'UPI Payment System', icon: MdPayment, description: 'Complete UPI integration with QR code generation and instant transfers' },
  { title: 'Mobile Recharge', icon: MdPhoneAndroid, description: 'All operator recharge with instant processing and special offers' },
  { title: 'Account Management', icon: MdAccountBalance, description: 'Real-time balance tracking and comprehensive account services' },
  { title: 'Bill Payments', icon: MdReceipt, description: 'Pay all utility bills including electricity, water, and gas' },
  { title: 'ATM Card Management', icon: RiBankCardLine, description: 'Complete control over debit cards with activation and blocking' },
  { title: 'AI Customer Service', icon: MdChat, description: '24/7 intelligent banking assistant with natural language processing' },
  { title: 'Money Transfer', icon: BiTransfer, description: 'Secure fund transfers with NEFT, RTGS, and IMPS support' },
  { title: 'Security Features', icon: MdSecurity, description: 'Bank-grade security with two-factor authentication and fraud detection' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <HeaderName />
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600 bg-clip-text text-transparent mb-6">
            🏦 CBI Digital Banking
          </h1>
          <p className="text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-medium">
            A comprehensive digital banking platform built with cutting-edge technologies for secure, fast, and reliable financial services.
          </p>
        </div>

        {/* Technology Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          
          {/* Frontend Card */}
          <div className="group bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl shadow-2xl p-8 border border-orange-300 hover:shadow-[0_35px_60px_-15px_rgba(255,165,0,0.5)] transition-all duration-300 hover:scale-105 hover:rotate-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-black rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaDesktop className="text-3xl text-orange-400" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-black">
                  Frontend Technologies
                </h2>
                <p className="text-black opacity-80 text-lg font-medium">Modern UI/UX Development</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {frontendTechnologies.map(({ name, version, icon: Icon, reason }) => (
                <div key={name} className="flex items-start gap-4 p-4 bg-black bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-300">
                  <Icon className="text-2xl text-black mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-black">{name}</h3>
                      <span className="text-sm text-black opacity-70 bg-black bg-opacity-20 px-2 py-1 rounded">v{version}</span>
                    </div>
                    <p className="text-sm text-black opacity-80 leading-relaxed">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Card */}
          <div className="group bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl shadow-2xl p-8 border border-orange-300 hover:shadow-[0_35px_60px_-15px_rgba(255,165,0,0.5)] transition-all duration-300 hover:scale-105 hover:-rotate-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-black rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaServer className="text-3xl text-orange-400" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-black">
                  Backend Technologies
                </h2>
                <p className="text-black opacity-80 text-lg font-medium">Server-side Development</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {backendTechnologies.map(({ name, version, icon: Icon, reason }) => (
                <div key={name} className="flex items-start gap-4 p-4 bg-black bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-300">
                  <Icon className="text-2xl text-black mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-black">{name}</h3>
                      <span className="text-sm text-black opacity-70 bg-black bg-opacity-20 px-2 py-1 rounded">v{version}</span>
                    </div>
                    <p className="text-sm text-black opacity-80 leading-relaxed">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Single Project Features Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16 border border-gray-100 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <MdBolt className="text-yellow-500" />
              Project Features
            </h2>
            <p className="text-xl text-gray-600">Comprehensive banking solutions at your fingertips</p>
          </div>
          
          {/* Features List */}
          <ul className="space-y-6 max-w-3xl mx-auto">
            {projectFeatures.map(({ title, icon: Icon, description }) => (
              <li key={title} className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">
                  <Icon className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Developer Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <MdDeveloperMode className="text-indigo-600" />
              Developer
            </h2>
            <p className="text-xl text-gray-600">Meet the creator behind this project</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-bold text-white">GM</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">Gourab Mullick</h3>
              <p className="text-xl text-indigo-700 font-semibold mb-2">Full-Stack Developer (MERN Stack)</p>
              <p className="text-gray-600 font-medium">West Bengal, India</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-6">
                Passionate full-stack developer specializing in modern web technologies with expertise in building 
                secure, scalable banking and financial applications. Committed to delivering high-quality, 
                production-ready solutions with focus on user experience and performance optimization.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                    <span className="text-gray-700 font-medium">5+ Years Development Experience</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                    <span className="text-gray-700 font-medium">Banking & Financial Apps Expert</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                    <span className="text-gray-700 font-medium">Security Implementation Specialist</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                    <span className="text-gray-700 font-medium">API Development & Integration</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Connect with the Developer</h4>
              <div className="flex justify-center items-center gap-8 flex-wrap">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-gray-100 transform hover:-translate-y-1 hover:scale-105"
                  >
                    <Icon className="text-2xl text-gray-600 group-hover:text-gray-800 transition-colors duration-300 group-hover:scale-110" />
                    <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
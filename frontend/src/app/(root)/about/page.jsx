"use client";
import { AiOutlineGithub, AiOutlineInstagram, AiOutlineMail } from 'react-icons/ai';
import { FaReact, FaNodeJs, FaServer, FaDesktop, FaTelegram, FaShieldAlt, FaDatabase, FaCog, FaCode, FaCloud, FaMobile } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiRedux, SiFramer, SiAxios, SiCloudinary, SiRazorpay, SiOpenai, SiJsonwebtokens } from 'react-icons/si';
import { MdPayment, MdAccountBalance, MdSecurity, MdQrCode, MdBolt, MdEmail, MdDeveloperMode, MdChat, MdPhoneAndroid, MdReceipt, MdCreditCard } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { RiBankCardLine } from 'react-icons/ri';
import HeaderName from '@/components/HeaderName';

const socialLinks = [
  { 
    href: 'https://github.com/gourabop', 
    label: 'GitHub', 
    Icon: AiOutlineGithub, 
    color: 'hover:text-gray-900',
    bgColor: 'hover:bg-gray-100',
    username: '@gourabop'
  },
  { 
    href: 'https://instagram.com/gourab_op_84', 
    label: 'Instagram', 
    Icon: AiOutlineInstagram, 
    color: 'hover:text-pink-600',
    bgColor: 'hover:bg-pink-50',
    username: '@gourab_op_84'
  },
  { 
    href: 'https://t.me/its_me_gourab', 
    label: 'Telegram', 
    Icon: FaTelegram, 
    color: 'hover:text-blue-500',
    bgColor: 'hover:bg-blue-50',
    username: '@its_me_gourab'
  },
  { 
    href: 'mailto:gourabmullick200@gmail.com', 
    label: 'Gmail', 
    Icon: AiOutlineMail, 
    color: 'hover:text-red-600',
    bgColor: 'hover:bg-red-50',
    username: 'gourabmullick200@gmail.com'
  }
];

const frontendTechnologies = [
  { 
    name: 'Next.js', 
    version: '15.2.4',
    icon: SiNextdotjs, 
    description: 'Server-side rendering and static site generation',
    reason: 'Chosen for its excellent performance, SEO optimization, and built-in routing - essential for a banking application that needs fast loading and search engine visibility.',
    color: 'text-black'
  },
  { 
    name: 'React', 
    version: '19.0.0',
    icon: FaReact, 
    description: 'Component-based UI library with hooks',
    reason: 'Selected for its component reusability, virtual DOM performance, and large ecosystem - perfect for building complex banking interfaces with consistent user experience.',
    color: 'text-blue-600'
  },
  { 
    name: 'Redux Toolkit', 
    version: '2.6.1',
    icon: SiRedux, 
    description: 'State management for complex applications',
    reason: 'Implemented for centralized state management across the banking app, ensuring consistent data flow and easier debugging of financial transactions.',
    color: 'text-purple-600'
  },
  { 
    name: 'TailwindCSS', 
    version: '4.0',
    icon: SiTailwindcss, 
    description: 'Utility-first CSS framework',
    reason: 'Chosen for rapid UI development and consistent design system - enables quick prototyping and maintains visual consistency across all banking features.',
    color: 'text-teal-500'
  },
  { 
    name: 'Framer Motion', 
    version: '12.23.3',
    icon: SiFramer, 
    description: 'Animation library for smooth transitions',
    reason: 'Added for professional animations and micro-interactions that enhance user experience and provide visual feedback during banking operations.',
    color: 'text-pink-600'
  },
  { 
    name: 'Axios', 
    version: '1.8.4',
    icon: SiAxios, 
    description: 'HTTP client for API requests',
    reason: 'Selected for its request/response interceptors and error handling - crucial for secure API communication in banking applications.',
    color: 'text-blue-500'
  }
];

const backendTechnologies = [
  { 
    name: 'Node.js', 
    version: 'Latest',
    icon: FaNodeJs, 
    description: 'JavaScript runtime for server-side development',
    reason: 'Chosen for its non-blocking I/O operations and JavaScript ecosystem - perfect for handling multiple concurrent banking transactions efficiently.',
    color: 'text-green-600'
  },
  { 
    name: 'Express.js', 
    version: '5.1.0',
    icon: SiExpress, 
    description: 'Fast and minimalist web framework',
    reason: 'Selected for its lightweight nature and middleware support - ideal for building RESTful APIs and handling banking operations securely.',
    color: 'text-gray-700'
  },
  { 
    name: 'MongoDB', 
    version: '8.13.2',
    icon: SiMongodb, 
    description: 'NoSQL document database',
    reason: 'Implemented for flexible data storage and horizontal scaling - essential for storing diverse banking data like transactions, user profiles, and financial records.',
    color: 'text-green-500'
  },
  { 
    name: 'JWT', 
    version: '9.0.2',
    icon: SiJsonwebtokens, 
    description: 'JSON Web Tokens for authentication',
    reason: 'Used for stateless authentication and secure session management - critical for banking security and user session handling.',
    color: 'text-purple-600'
  },
  { 
    name: 'Cloudinary', 
    version: '2.6.1',
    icon: SiCloudinary, 
    description: 'Cloud-based media management',
    reason: 'Integrated for secure document storage and image optimization - necessary for KYC documents and profile pictures in banking applications.',
    color: 'text-blue-500'
  },
  { 
    name: 'Razorpay', 
    version: '2.9.6',
    icon: SiRazorpay, 
    description: 'Payment gateway integration',
    reason: 'Chosen for its comprehensive payment solutions and Indian market focus - essential for UPI, card payments, and banking transactions.',
    color: 'text-blue-700'
  },
  { 
    name: 'OpenAI', 
    version: '4.21.0',
    icon: SiOpenai, 
    description: 'AI-powered customer service',
    reason: 'Implemented for intelligent chatbot and customer support - provides 24/7 assistance for banking queries and transaction support.',
    color: 'text-green-700'
  },
  { 
    name: 'bcryptjs', 
    version: '3.0.2',
    icon: FaShieldAlt, 
    description: 'Password hashing and security',
    reason: 'Used for secure password storage and authentication - fundamental for banking security and user data protection.',
    color: 'text-red-500'
  }
];

const projectFeatures = [
  {
    title: 'UPI Payment System',
    description: 'Complete UPI integration with instant money transfers',
    icon: MdPayment,
    features: ['QR Code Generation', 'Instant Transfers', 'Multi-bank Support', 'Transaction History'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Mobile Recharge',
    description: 'All operator recharge with instant processing',
    icon: MdPhoneAndroid,
    features: ['Jio, Airtel, Vi Support', 'Instant Processing', 'Special Offers', 'Recharge History'],
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Account Management',
    description: 'Comprehensive banking operations and services',
    icon: MdAccountBalance,
    features: ['Real-time Balance', 'Account Statements', 'Fixed Deposits', 'KYC Management'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Bill Payments',
    description: 'Pay all utility bills with ease',
    icon: MdReceipt,
    features: ['Electricity Bills', 'Water Bills', 'Gas Bills', 'Internet Bills'],
    color: 'from-orange-500 to-orange-600'
  },
  {
    title: 'ATM Card Management',
    description: 'Complete control over your debit/ATM cards',
    icon: RiBankCardLine,
    features: ['Card Activation', 'Block/Unblock', 'PIN Change', 'Transaction Limits'],
    color: 'from-red-500 to-red-600'
  },
  {
    title: 'AI Customer Service',
    description: '24/7 intelligent banking assistant',
    icon: MdChat,
    features: ['Natural Language Processing', 'Banking Queries', 'Transaction Support', 'Instant Response'],
    color: 'from-teal-500 to-teal-600'
  },
  {
    title: 'Money Transfer',
    description: 'Secure fund transfers between accounts',
    icon: BiTransfer,
    features: ['NEFT/RTGS/IMPS', 'Bank-to-Bank', 'Beneficiary Management', 'Transaction Tracking'],
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    title: 'Security Features',
    description: 'Bank-grade security and fraud protection',
    icon: MdSecurity,
    features: ['Two-Factor Auth', 'Fraud Detection', 'Secure Encryption', 'Audit Logging'],
    color: 'from-pink-500 to-pink-600'
  }
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
          <div className="group bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-105 hover:rotate-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaDesktop className="text-3xl text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  Frontend Technologies
                </h2>
                <p className="text-gray-600 text-lg">Modern UI/UX Development</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {frontendTechnologies.map(({ name, version, icon: Icon, description, reason, color }) => (
                <div key={name} className="group/tech bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-cyan-100 hover:scale-105 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-3">
                    <Icon className={`text-2xl ${color} group-hover/tech:scale-125 transition-transform duration-300`} />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                      <p className="text-sm text-blue-700 font-semibold">v{version}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2 font-medium">{description}</p>
                  <p className="text-sm text-gray-600 italic leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Card */}
          <div className="group bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-105 hover:-rotate-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaServer className="text-3xl text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                  Backend Technologies
                </h2>
                <p className="text-gray-600 text-lg">Server-side Development</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {backendTechnologies.map(({ name, version, icon: Icon, description, reason, color }) => (
                <div key={name} className="group/tech bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 hover:from-green-100 hover:to-emerald-100 hover:scale-105 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-3">
                    <Icon className={`text-2xl ${color} group-hover/tech:scale-125 transition-transform duration-300`} />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                      <p className="text-sm text-green-700 font-semibold">v{version}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2 font-medium">{description}</p>
                  <p className="text-sm text-gray-600 italic leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Features */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <MdBolt className="text-yellow-500" />
              Project Features
            </h2>
            <p className="text-xl text-gray-600">Comprehensive banking solutions at your fingertips</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectFeatures.map(({ title, description, icon: Icon, features, color }) => (
              <div key={title} className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">{title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{description}</p>
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color} group-hover:scale-125 transition-transform duration-300`}></div>
                        <span className="text-sm text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {socialLinks.map(({ href, label, Icon, color, bgColor, username }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 ${color} ${bgColor} transform hover:-translate-y-3 hover:scale-105`}
                  >
                    <Icon className="text-5xl transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="text-center">
                      <span className="font-bold text-lg block">{label}</span>
                      <span className="text-sm text-gray-600 block">{username}</span>
                    </div>
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
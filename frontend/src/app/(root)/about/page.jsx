"use client";
import { AiOutlineGithub, AiOutlineInstagram, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai';
import { FaReact, FaNodeJs, FaDatabase, FaShieldAlt, FaMobile, FaCode, FaServer, FaDesktop, FaTelegram, FaPaypal, FaCloud, FaCog } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiJavascript, SiTypescript, SiRedux, SiFramer, SiAxios, SiCloudinary, SiRazorpay, SiOpenai, SiPostcss, SiEslint, SiNodemon, SiJsonwebtokens, SiFormik } from 'react-icons/si';
import { MdPayment, MdAccountBalance, MdSecurity, MdSpeed, MdChat, MdQrCode, MdBolt, MdReceipt, MdEmail, MdDeveloperMode, MdApi, MdCloudUpload } from 'react-icons/md';
import { BiTransfer, BiPackage } from 'react-icons/bi';
import { RiBankCardLine } from 'react-icons/ri';
import { TbBrandFramerMotion, TbApi } from 'react-icons/tb';
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
    href: 'https://linkedin.com/in/gourab', 
    label: 'LinkedIn', 
    Icon: AiFillLinkedin, 
    color: 'hover:text-blue-600',
    bgColor: 'hover:bg-blue-50',
    username: 'gourab'
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
    description: 'React framework with SSR, routing, and performance optimization',
    category: 'Framework',
    color: 'text-black',
    whyUse: 'Building the banking dashboard interface with server-side rendering for fast loading. Handles routing between pages like login, dashboard, transactions, UPI, recharge, and card management.'
  },
  { 
    name: 'React', 
    version: '19.0.0',
    icon: FaReact, 
    description: 'Modern UI library with hooks and functional components',
    category: 'Library',
    color: 'text-blue-600',
    whyUse: 'Creating interactive banking UI components like transaction cards, balance displays, payment forms, UPI interfaces, and account management panels with reusable components.'
  },
  { 
    name: 'Redux Toolkit', 
    version: '2.6.1',
    icon: SiRedux, 
    description: 'Predictable state container for JavaScript applications',
    category: 'State Management',
    color: 'text-purple-600',
    whyUse: 'Managing user login state, account balance, transaction history, UPI data, card information, and recharge history across all banking pages and components.'
  },
  { 
    name: 'TailwindCSS', 
    version: '4.0',
    icon: SiTailwindcss, 
    description: 'Utility-first CSS framework for rapid UI development',
    category: 'Styling',
    color: 'text-teal-500',
    whyUse: 'Styling the banking dashboard, transaction cards, payment forms, UPI interface, balance displays, and mobile recharge pages with modern responsive design.'
  },
  { 
    name: 'Framer Motion', 
    version: '12.23.3',
    icon: TbBrandFramerMotion, 
    description: 'Production-ready motion library for React',
    category: 'Animation',
    color: 'text-pink-600',
    whyUse: 'Creating smooth animations for page transitions, loading states during transactions, balance updates, payment confirmations, and interactive hover effects throughout the banking app.'
  },
  { 
    name: 'Axios', 
    version: '1.8.4',
    icon: SiAxios, 
    description: 'Promise-based HTTP client for API requests',
    category: 'HTTP Client',
    color: 'text-blue-500',
    whyUse: 'Making API calls to backend for user login, fetching account balance, processing UPI payments, mobile recharge requests, transaction history, and card management operations.'
  },
  { 
    name: 'Formik', 
    version: '2.4.6',
    icon: SiFormik, 
    description: 'Build forms in React without tears',
    category: 'Form Handling',
    color: 'text-orange-500',
    whyUse: 'Handling forms for user login, registration, UPI transfers, mobile recharge, bill payments, card PIN change, and KYC document upload with validation and error handling.'
  },
  { 
    name: 'React Icons', 
    version: '5.5.0',
    icon: FaCode, 
    description: 'Popular icon packs as React components',
    category: 'Icons',
    color: 'text-gray-600',
    whyUse: 'Displaying icons for transaction types, payment methods, bank cards, UPI transfers, mobile recharge, security features, and navigation throughout the banking interface.'
  },
  { 
    name: 'React Razorpay', 
    version: '3.0.1',
    icon: SiRazorpay, 
    description: 'Razorpay payment gateway integration for React',
    category: 'Payment',
    color: 'text-blue-700',
    whyUse: 'Integrating Razorpay payment gateway for processing UPI payments, card transactions, mobile recharge payments, and bill payments directly from the banking frontend.'
  },
  { 
    name: 'TypeScript Support', 
    version: 'Enabled',
    icon: SiTypescript, 
    description: 'Type-safe development with static type checking',
    category: 'Language',
    color: 'text-blue-700',
    whyUse: 'Ensuring type safety for banking data structures like user accounts, transaction records, UPI details, and payment information to prevent errors in financial operations.'
  }
];

const backendTechnologies = [
  { 
    name: 'Node.js', 
    version: 'Latest',
    icon: FaNodeJs, 
    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
    category: 'Runtime',
    color: 'text-green-600',
    whyUse: 'Building the backend server to handle user authentication, process banking transactions, manage account data, and provide APIs for UPI, recharge, and card management operations.'
  },
  { 
    name: 'Express.js', 
    version: '5.1.0',
    icon: SiExpress, 
    description: 'Fast, unopinionated, minimalist web framework',
    category: 'Framework',
    color: 'text-gray-700',
    whyUse: 'Creating REST APIs for user login, account management, UPI transactions, mobile recharge, bill payments, card operations, and transaction history endpoints.'
  },
  { 
    name: 'MongoDB', 
    version: '8.13.2',
    icon: SiMongodb, 
    description: 'Document-based NoSQL database with Mongoose ODM',
    category: 'Database',
    color: 'text-green-500',
    whyUse: 'Storing user accounts, transaction records, UPI transaction history, mobile recharge data, bill payment records, card information, and KYC documents in the database.'
  },
  { 
    name: 'JWT', 
    version: '9.0.2',
    icon: SiJsonwebtokens, 
    description: 'JSON Web Tokens for secure authentication',
    category: 'Authentication',
    color: 'text-purple-600',
    whyUse: 'Securing user login sessions, protecting banking APIs, and ensuring only authenticated users can access account data, make transactions, and perform UPI operations.'
  },
  { 
    name: 'Cloudinary', 
    version: '2.6.1',
    icon: SiCloudinary, 
    description: 'Cloud-based image and video management platform',
    category: 'Cloud Storage',
    color: 'text-blue-500',
    whyUse: 'Storing user profile pictures, KYC verification documents (Aadhaar, PAN, address proof), transaction receipts, and card delivery photos in secure cloud storage.'
  },
  { 
    name: 'Razorpay', 
    version: '2.9.6',
    icon: SiRazorpay, 
    description: 'Complete payment solution with instant activation',
    category: 'Payment Gateway',
    color: 'text-blue-700',
    whyUse: 'Processing UPI payments, mobile recharge transactions, bill payments, money transfers, and handling payment webhooks for real-time transaction status updates.'
  },
  { 
    name: 'OpenAI', 
    version: '4.21.0',
    icon: SiOpenai, 
    description: 'AI-powered chatbot and intelligent customer service',
    category: 'AI Integration',
    color: 'text-green-700',
    whyUse: 'Creating intelligent customer service chatbot for 24/7 support. Answers banking queries, helps with transactions, provides account information, and offers personalized assistance to users.'
  },
  { 
    name: 'Nodemailer', 
    version: '7.0.3',
    icon: MdEmail, 
    description: 'Send emails from Node.js applications',
    category: 'Email Service',
    color: 'text-red-600',
    whyUse: 'Sending automated emails to users including transaction confirmations, account alerts, security notifications, password reset emails, and KYC verification updates.'
  },
  { 
    name: 'QR Code', 
    version: '1.5.3',
    icon: MdQrCode, 
    description: 'QR code generation for payments and transfers',
    category: 'Utility',
    color: 'text-gray-800',
    whyUse: 'Generating QR codes for UPI payments and money transfers. Enables quick payment processing, contactless transactions, and seamless UPI integration.'
  },
  { 
    name: 'bcryptjs', 
    version: '3.0.2',
    icon: FaShieldAlt, 
    description: 'Password hashing library for secure authentication',
    category: 'Security',
    color: 'text-red-500',
    whyUse: 'Securely hashing user passwords and sensitive data. Implements industry-standard encryption for banking security and protects user credentials.'
  }
];

const developmentTools = [
  { 
    name: 'ESLint', 
    version: '9.0', 
    icon: SiEslint, 
    description: 'Code quality and consistency checker',
    whyUse: 'Used for maintaining code quality and enforcing coding standards across the banking application. Catches potential bugs, ensures consistent code style, and improves maintainability of the financial software codebase.'
  },
  { 
    name: 'PostCSS', 
    version: '4.0', 
    icon: SiPostcss, 
    description: 'CSS processing and optimization',
    whyUse: 'Used for processing and optimizing CSS in the banking application. Provides autoprefixing, CSS optimization, and modern CSS features to ensure cross-browser compatibility and optimal performance.'
  },
  { 
    name: 'Nodemon', 
    version: '3.1.9', 
    icon: SiNodemon, 
    description: 'Auto-restart development server',
    whyUse: 'Used during development to automatically restart the backend server when files change. Improves developer productivity by eliminating manual server restarts during banking API development and testing.'
  },
  { 
    name: 'Turbopack', 
    version: 'Next.js', 
    icon: FaCog, 
    description: 'Ultra-fast bundler for Next.js',
    whyUse: 'Used for extremely fast development builds and hot module replacement. Significantly reduces build times during development of the banking frontend, enabling rapid iteration and improved developer experience.'
  },
  { 
    name: 'npm Workspaces', 
    version: 'Latest', 
    icon: BiPackage, 
    description: 'Monorepo package management',
    whyUse: 'Used for managing the monorepo structure with frontend and backend packages. Simplifies dependency management, enables shared utilities between frontend and backend, and provides efficient workspace organization for the banking project.'
  }
];

const projectFeatures = [
  {
    title: 'UPI Payment System',
    description: 'Complete UPI integration with QR code generation, instant transfers, and multi-bank support',
    icon: MdPayment,
    features: ['QR Code Generation & Scanning', 'UPI ID Creation', 'Instant Money Transfer', 'Bank-to-Bank Transfers (NEFT/RTGS/IMPS)', 'Payment History & Receipts']
  },
  {
    title: 'ATM/Debit Card Management',
    description: 'Comprehensive ATM and debit card services with complete control and security features',
    icon: RiBankCardLine,
    features: ['Card Activation & Blocking', 'PIN Change & Reset', 'Transaction Limits Setting', 'Card Usage Controls', 'ATM Locator', 'Card Delivery Tracking']
  },
  {
    title: 'Fixed Deposit (FD) Services',
    description: 'Complete fixed deposit management with flexible tenure options and competitive interest rates',
    icon: MdAccountBalance,
    features: ['FD Account Opening', 'Flexible Tenure (7 days to 10 years)', 'Interest Rate Calculator', 'Premature Withdrawal', 'FD Renewal Options', 'Certificate Generation']
  },
  {
    title: 'Mobile Recharge & Bill Payments',
    description: 'Comprehensive digital payment services for mobile recharge and utility bill payments',
    icon: MdBolt,
    features: ['Mobile Recharge (Jio, Airtel, Vi, BSNL)', 'DTH/Cable TV Recharge', 'Electricity Bill Payment', 'Gas Bill Payment', 'Water Bill Payment', 'Credit Card Bill Payment']
  },
  {
    title: 'Money Transfer Services',
    description: 'Secure and instant money transfer services with multiple transfer options',
    icon: BiTransfer,
    features: ['NEFT Transfers', 'RTGS Transfers', 'IMPS Transfers', 'Bank-to-Bank Transfer', 'Beneficiary Management', 'Transfer Scheduling']
  },
  {
    title: 'Account Management',
    description: 'Complete banking account operations with real-time balance tracking and comprehensive services',
    icon: MdAccountBalance,
    features: ['Real-time Balance Updates', 'Account Statements (PDF)', 'Transaction History', 'Mini Statements', 'Account Summary', 'Passbook Download']
  },
  {
    title: 'KYC Verification System',
    description: 'Complete Know Your Customer verification process with document upload and verification',
    icon: MdSecurity,
    features: ['Aadhaar Verification', 'PAN Card Verification', 'Address Proof Upload', 'Video KYC', 'Document Status Tracking', 'Compliance Management']
  },
  {
    title: 'AI-Powered Customer Service',
    description: '24/7 intelligent chatbot with natural language processing and comprehensive banking assistance',
    icon: MdChat,
    features: ['Natural Language Processing', 'Banking Query Resolution', 'Transaction Support', 'Account Information', 'Service Requests', 'Personalized Assistance']
  },
  {
    title: 'Security & Fraud Protection',
    description: 'Advanced security measures with fraud detection and comprehensive protection systems',
    icon: MdSecurity,
    features: ['Two-Factor Authentication', 'Biometric Login', 'Real-time Fraud Detection', 'Transaction Alerts', 'Account Monitoring', 'Security Notifications']
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <HeaderName />
        
                 {/* Hero Section */}
         <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
           <div className="text-center mb-12">
             <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600 bg-clip-text text-transparent mb-6">
               🏦 CBI Digital Banking Platform
             </h1>
             <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-medium">
               A comprehensive, production-ready digital banking application built with modern technologies. 
               Featuring secure transactions, AI-powered customer service, and seamless user experience across all devices.
             </p>
             <div className="flex justify-center items-center gap-6 mt-8">
               <div className="bg-gradient-to-r from-green-100 to-green-200 px-6 py-3 rounded-full">
                 <span className="text-green-800 font-bold">✅ Production Ready</span>
               </div>
               <div className="bg-gradient-to-r from-blue-100 to-blue-200 px-6 py-3 rounded-full">
                 <span className="text-blue-800 font-bold">🔒 Bank-Grade Security</span>
               </div>
               <div className="bg-gradient-to-r from-purple-100 to-purple-200 px-6 py-3 rounded-full">
                 <span className="text-purple-800 font-bold">🤖 AI-Powered</span>
               </div>
             </div>
                           {/* Project Overview */}
              <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                <p className="text-lg font-semibold text-yellow-800 mb-2">
                  🎯 Complete Banking Solution
                </p>
                <p className="text-sm text-yellow-700">
                  Below you'll find all the technologies used in this project and their specific purposes in building this comprehensive banking platform.
                </p>
              </div>
           </div>
         </div>

                 {/* Frontend Technologies */}
         <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
           <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
             <FaDesktop className="text-blue-600" />
             Frontend Technologies
           </h2>
           <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-200">
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {frontendTechnologies.map(({ name, version, icon: Icon, description, whyUse }) => (
                 <div key={name} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                   <Icon className="text-3xl text-blue-600 flex-shrink-0 mt-1" />
                   <div>
                     <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
                     <p className="text-sm text-blue-700 font-semibold mb-2">v{version}</p>
                     <p className="text-xs text-gray-700 mb-2">{description}</p>
                     <p className="text-xs text-blue-800 font-medium">{whyUse}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>

         {/* Backend Technologies */}
         <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
           <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
             <FaServer className="text-green-600" />
             Backend Technologies
           </h2>
           <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200">
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {backendTechnologies.map(({ name, version, icon: Icon, description, whyUse }) => (
                 <div key={name} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                   <Icon className="text-3xl text-green-600 flex-shrink-0 mt-1" />
                   <div>
                     <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
                     <p className="text-sm text-green-700 font-semibold mb-2">v{version}</p>
                     <p className="text-xs text-gray-700 mb-2">{description}</p>
                     <p className="text-xs text-green-800 font-medium">{whyUse}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>

                 {/* Project Features */}
         <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
           <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
             <MdBolt className="text-yellow-600" />
             Complete Banking Features
           </h2>
           <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-200">
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {projectFeatures.map(({ title, description, icon: Icon, features }) => (
                 <div key={title} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                   <div className="flex items-center gap-3 mb-4">
                     <Icon className="text-3xl text-yellow-600" />
                     <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                   </div>
                   <p className="text-sm text-gray-700 mb-4 leading-relaxed">{description}</p>
                   <div className="space-y-2">
                     {features.map((feature, index) => (
                       <div key={index} className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></div>
                         <span className="text-xs text-gray-700 font-medium">{feature}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>

        {/* Developer Information */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <MdDeveloperMode className="text-indigo-600" />
            Developer Information
          </h2>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">GM</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">Gourab Mullick</h3>
              <p className="text-xl text-indigo-700 font-semibold mb-2">Full-Stack Developer (MERN Stack)</p>
              <p className="text-gray-600 font-medium">West Bengal, India</p>
            </div>

                         <div className="mb-8">
               <div>
                 <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                   <MdDeveloperMode className="text-indigo-600" />
                   About the Developer
                 </h4>
                 <p className="text-gray-700 leading-relaxed mb-4">
                   Passionate full-stack developer specializing in modern web technologies with expertise in building 
                   secure, scalable banking and financial applications. Committed to delivering high-quality, 
                   production-ready solutions with focus on user experience and performance optimization.
                 </p>
                 <div className="space-y-2">
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                     <span className="text-gray-700 font-medium">5+ Years of Development Experience</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                     <span className="text-gray-700 font-medium">Specialized in Financial Applications</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                     <span className="text-gray-700 font-medium">Expert in Security Implementation</span>
                   </div>
                 </div>
               </div>
             </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-200 mb-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">Contact Information</h4>
              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <MdEmail className="text-2xl text-red-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-700">gourabmullick200@gmail.com</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <MdDeveloperMode className="text-2xl text-indigo-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">Available for</p>
                  <p className="text-gray-700">Freelance Projects & Collaborations</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Connect with the Developer</h4>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                {socialLinks.map(({ href, label, Icon, color, bgColor, username }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 ${color} ${bgColor} transform hover:-translate-y-2 hover:scale-105`}
                  >
                    <Icon className="text-4xl transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
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

        {/* Technical Achievements */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">Technical Achievements & Project Status</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <MdSpeed className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-xl text-gray-900 mb-2">High Performance</h3>
              <p className="text-sm text-gray-700">Optimized for speed and efficiency</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <FaShieldAlt className="text-5xl text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-xl text-gray-900 mb-2">Bank-Grade Security</h3>
              <p className="text-sm text-gray-700">Industry-standard security protocols</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <FaMobile className="text-5xl text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-xl text-gray-900 mb-2">Fully Responsive</h3>
              <p className="text-sm text-gray-700">Perfect on all devices and screens</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl shadow-lg border border-rose-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <BiTransfer className="text-5xl text-rose-600 mx-auto mb-4" />
              <h3 className="font-bold text-xl text-gray-900 mb-2">Real-time Updates</h3>
              <p className="text-sm text-gray-700">Live data and instant notifications</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-8 rounded-2xl border border-indigo-200 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Project Status</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <h4 className="text-xl font-bold text-indigo-700 mb-2">Version</h4>
                <p className="text-2xl font-bold text-gray-900">1.0.0</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-green-700 mb-2">Status</h4>
                <p className="text-2xl font-bold text-gray-900">Production Ready</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-blue-700 mb-2">Support</h4>
                <p className="text-2xl font-bold text-gray-900">24/7 Available</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-purple-700 mb-2">Maintenance</h4>
                <p className="text-2xl font-bold text-gray-900">Actively Updated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl text-white">
          <p className="text-lg font-semibold">
            © 2024 CBI Digital Banking Platform
          </p>
          <p className="text-gray-300 mt-2">
            Built with ❤️ by Gourab Mullick using cutting-edge web technologies
          </p>
        </div>
      </div>
    </div>
  );
}
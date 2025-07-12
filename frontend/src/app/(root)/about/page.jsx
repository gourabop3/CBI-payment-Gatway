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
    whyUse: 'Used for building the frontend application with server-side rendering, automatic code splitting, and optimized performance. Provides built-in routing, API routes, and production-ready features for scalable web applications.'
  },
  { 
    name: 'React', 
    version: '19.0.0',
    icon: FaReact, 
    description: 'Modern UI library with hooks and functional components',
    category: 'Library',
    color: 'text-blue-600',
    whyUse: 'Used for building interactive user interfaces with component-based architecture. Enables reusable UI components, efficient state management, and virtual DOM for optimal performance in banking dashboard interfaces.'
  },
  { 
    name: 'Redux Toolkit', 
    version: '2.6.1',
    icon: SiRedux, 
    description: 'Predictable state container for JavaScript applications',
    category: 'State Management',
    color: 'text-purple-600',
    whyUse: 'Used for managing complex application state across components. Essential for banking apps to handle user authentication, account data, transaction history, and real-time balance updates consistently throughout the application.'
  },
  { 
    name: 'TailwindCSS', 
    version: '4.0',
    icon: SiTailwindcss, 
    description: 'Utility-first CSS framework for rapid UI development',
    category: 'Styling',
    color: 'text-teal-500',
    whyUse: 'Used for styling the entire application with utility classes. Enables rapid UI development, consistent design system, responsive layouts, and modern banking interface design without writing custom CSS.'
  },
  { 
    name: 'Framer Motion', 
    version: '12.23.3',
    icon: TbBrandFramerMotion, 
    description: 'Production-ready motion library for React',
    category: 'Animation',
    color: 'text-pink-600',
    whyUse: 'Used for creating smooth animations and transitions in the banking interface. Enhances user experience with page transitions, loading animations, and interactive elements to make the banking app feel modern and responsive.'
  },
  { 
    name: 'Axios', 
    version: '1.8.4',
    icon: SiAxios, 
    description: 'Promise-based HTTP client for API requests',
    category: 'HTTP Client',
    color: 'text-blue-500',
    whyUse: 'Used for making HTTP requests to the backend API. Handles all communication between frontend and backend including user authentication, transaction processing, account operations, and real-time data fetching with interceptors for error handling.'
  },
  { 
    name: 'Formik', 
    version: '2.4.6',
    icon: SiFormik, 
    description: 'Build forms in React without tears',
    category: 'Form Handling',
    color: 'text-orange-500',
    whyUse: 'Used for handling complex forms in banking operations. Manages form validation, submission, and error handling for login, registration, money transfer, bill payments, and KYC verification forms with robust validation.'
  },
  { 
    name: 'React Icons', 
    version: '5.5.0',
    icon: FaCode, 
    description: 'Popular icon packs as React components',
    category: 'Icons',
    color: 'text-gray-600',
    whyUse: 'Used for displaying consistent icons throughout the banking interface. Provides banking-specific icons for transactions, payments, security, accounts, and navigation elements to enhance visual communication and user experience.'
  },
  { 
    name: 'React Razorpay', 
    version: '3.0.1',
    icon: SiRazorpay, 
    description: 'Razorpay payment gateway integration for React',
    category: 'Payment',
    color: 'text-blue-700',
    whyUse: 'Used for integrating Razorpay payment gateway in React components. Enables secure payment processing, UPI transactions, card payments, and digital wallet integration directly within the banking application frontend.'
  },
  { 
    name: 'TypeScript Support', 
    version: 'Enabled',
    icon: SiTypescript, 
    description: 'Type-safe development with static type checking',
    category: 'Language',
    color: 'text-blue-700',
    whyUse: 'Used for type-safe development in banking applications. Prevents runtime errors, improves code quality, enables better IDE support, and ensures data integrity in financial transactions and sensitive banking operations.'
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
    whyUse: 'Used for backend development to build the server-side application. Enables JavaScript everywhere (frontend and backend), provides excellent performance for I/O intensive banking operations, and has a rich ecosystem for financial applications.'
  },
  { 
    name: 'Express.js', 
    version: '5.1.0',
    icon: SiExpress, 
    description: 'Fast, unopinionated, minimalist web framework',
    category: 'Framework',
    color: 'text-gray-700',
    whyUse: 'Used for building RESTful APIs and handling HTTP requests. Provides routing, middleware support, and flexibility for creating banking APIs, user authentication endpoints, transaction processing, and payment gateway integrations.'
  },
  { 
    name: 'MongoDB', 
    version: '8.13.2',
    icon: SiMongodb, 
    description: 'Document-based NoSQL database with Mongoose ODM',
    category: 'Database',
    color: 'text-green-500',
    whyUse: 'Used for storing all banking data including user accounts, transaction history, KYC documents, and application settings. Provides flexible schema for complex banking data structures and excellent scalability for growing user base.'
  },
  { 
    name: 'JWT', 
    version: '9.0.2',
    icon: SiJsonwebtokens, 
    description: 'JSON Web Tokens for secure authentication',
    category: 'Authentication',
    color: 'text-purple-600',
    whyUse: 'Used for secure user authentication and session management. Provides stateless authentication for banking applications, secure token-based login, and protection of sensitive banking operations with role-based access control.'
  },
  { 
    name: 'Cloudinary', 
    version: '2.6.1',
    icon: SiCloudinary, 
    description: 'Cloud-based image and video management platform',
    category: 'Cloud Storage',
    color: 'text-blue-500',
    whyUse: 'Used for storing and managing user documents, profile pictures, KYC verification documents, and transaction receipts. Provides secure cloud storage with automatic optimization and CDN delivery for banking document management.'
  },
  { 
    name: 'Razorpay', 
    version: '2.9.6',
    icon: SiRazorpay, 
    description: 'Complete payment solution with instant activation',
    category: 'Payment Gateway',
    color: 'text-blue-700',
    whyUse: 'Used for processing payments, UPI transactions, and money transfers. Integrates with Indian banking system, supports multiple payment methods, provides secure payment processing, and handles transaction webhooks for real-time updates.'
  },
  { 
    name: 'OpenAI', 
    version: '4.21.0',
    icon: SiOpenai, 
    description: 'AI-powered chatbot and intelligent customer service',
    category: 'AI Integration',
    color: 'text-green-700',
    whyUse: 'Used for building intelligent customer service chatbot. Provides 24/7 customer support, answers banking queries, helps with transactions, and offers personalized assistance using natural language processing for enhanced user experience.'
  },
  { 
    name: 'Nodemailer', 
    version: '7.0.3',
    icon: MdEmail, 
    description: 'Send emails from Node.js applications',
    category: 'Email Service',
    color: 'text-red-600',
    whyUse: 'Used for sending automated emails to users including transaction confirmations, account alerts, security notifications, password reset emails, and KYC verification updates. Essential for banking communication and user notifications.'
  },
  { 
    name: 'QR Code', 
    version: '1.5.3',
    icon: MdQrCode, 
    description: 'QR code generation for payments and transfers',
    category: 'Utility',
    color: 'text-gray-800',
    whyUse: 'Used for generating QR codes for UPI payments and money transfers. Enables quick payment processing, contactless transactions, and seamless integration with UPI ecosystem for modern banking payment solutions.'
  },
  { 
    name: 'bcryptjs', 
    version: '3.0.2',
    icon: FaShieldAlt, 
    description: 'Password hashing library for secure authentication',
    category: 'Security',
    color: 'text-red-500',
    whyUse: 'Used for securely hashing user passwords and sensitive data. Implements industry-standard encryption for banking security, protects user credentials, and ensures data security compliance in financial applications.'
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
    features: ['QR Code Payments', 'Bank Transfers (NEFT/RTGS/IMPS)', 'Real-time Processing', 'Transaction History']
  },
  {
    title: 'Account Management',
    description: 'Comprehensive banking operations with real-time balance tracking and account services',
    icon: MdAccountBalance,
    features: ['Live Balance Updates', 'Account Statements', 'Fixed Deposits', 'KYC Management']
  },
  {
    title: 'Digital Services',
    description: 'Complete digital ecosystem with mobile recharge, bill payments, and utility services',
    icon: MdBolt,
    features: ['Mobile Recharge (All Operators)', 'Electricity Bills', 'DTH/Cable TV', 'Credit Card Bills']
  },
  {
    title: 'AI Customer Service',
    description: '24/7 intelligent chatbot with natural language processing and banking assistance',
    icon: MdChat,
    features: ['Natural Language Processing', 'Banking Queries', 'Transaction Support', 'Personalized Help']
  },
  {
    title: 'Security & Compliance',
    description: 'Bank-grade security with advanced fraud detection and compliance measures',
    icon: MdSecurity,
    features: ['Two-Factor Authentication', 'Fraud Detection', 'Data Encryption', 'Audit Logging']
  },
  {
    title: 'Card Management',
    description: 'Complete ATM/Debit card controls with activation, blocking, and limit management',
    icon: RiBankCardLine,
    features: ['Card Activation/Blocking', 'PIN Management', 'Transaction Limits', 'Usage Controls']
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
             {/* Interactive Help Text */}
             <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
               <p className="text-lg font-semibold text-yellow-800 mb-2">
                 🎯 Interactive Technology Cards
               </p>
               <p className="text-sm text-yellow-700">
                 <strong>Hover over any technology card below</strong> to see detailed explanations of why each technology was chosen for this banking project!
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
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {frontendTechnologies.map(({ name, version, icon: Icon, description, category, color, whyUse }) => (
               <div key={name} className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-lg border border-blue-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:from-blue-100 hover:to-cyan-100 overflow-hidden">
                 {/* Default Content */}
                 <div className="group-hover:opacity-0 transition-opacity duration-300">
                   <div className="flex items-center justify-between mb-3">
                     <Icon className={`text-3xl ${color} group-hover:scale-110 transition-transform duration-300`} />
                     <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-semibold">{category}</span>
                   </div>
                   <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
                   <p className="text-sm text-blue-700 font-semibold mb-2">v{version}</p>
                   <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
                 </div>
                 
                 {/* Hover Content */}
                 <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-100 to-cyan-100 flex flex-col justify-center">
                   <div className="text-center mb-4">
                     <Icon className={`text-4xl ${color} mx-auto mb-2`} />
                     <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
                     <span className="text-xs bg-blue-300 text-blue-900 px-3 py-1 rounded-full font-bold">{category}</span>
                   </div>
                   <div className="text-center">
                     <h4 className="text-sm font-bold text-blue-900 mb-2">Why use this?</h4>
                     <p className="text-xs text-gray-800 leading-relaxed">{whyUse}</p>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Backend Technologies */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <FaServer className="text-green-600" />
            Backend Technologies
          </h2>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {backendTechnologies.map(({ name, version, icon: Icon, description, category, color, whyUse }) => (
               <div key={name} className="group relative bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl shadow-lg border border-green-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:from-green-100 hover:to-emerald-100 overflow-hidden">
                 {/* Default Content */}
                 <div className="group-hover:opacity-0 transition-opacity duration-300">
                   <div className="flex items-center justify-between mb-3">
                     <Icon className={`text-3xl ${color} group-hover:scale-110 transition-transform duration-300`} />
                     <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-semibold">{category}</span>
                   </div>
                   <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
                   <p className="text-sm text-green-700 font-semibold mb-2">v{version}</p>
                   <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
                 </div>
                 
                 {/* Hover Content */}
                 <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-green-100 to-emerald-100 flex flex-col justify-center">
                   <div className="text-center mb-4">
                     <Icon className={`text-4xl ${color} mx-auto mb-2`} />
                     <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
                     <span className="text-xs bg-green-300 text-green-900 px-3 py-1 rounded-full font-bold">{category}</span>
                   </div>
                   <div className="text-center">
                     <h4 className="text-sm font-bold text-green-900 mb-2">Why use this?</h4>
                     <p className="text-xs text-gray-800 leading-relaxed">{whyUse}</p>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Development Tools */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <FaCog className="text-purple-600" />
            Development Tools & DevOps
          </h2>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
             {developmentTools.map(({ name, version, icon: Icon, description, whyUse }) => (
               <div key={name} className="group relative bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl shadow-lg border border-purple-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:from-purple-100 hover:to-indigo-100 overflow-hidden">
                 {/* Default Content */}
                 <div className="group-hover:opacity-0 transition-opacity duration-300">
                   <Icon className="text-3xl text-purple-600 group-hover:scale-110 transition-transform duration-300 mb-3" />
                   <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
                   <p className="text-sm text-purple-700 font-semibold mb-2">v{version}</p>
                   <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
                 </div>
                 
                 {/* Hover Content */}
                 <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col justify-center">
                   <div className="text-center mb-4">
                     <Icon className="text-4xl text-purple-600 mx-auto mb-2" />
                     <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
                     <span className="text-xs bg-purple-300 text-purple-900 px-3 py-1 rounded-full font-bold">DevOps</span>
                   </div>
                   <div className="text-center">
                     <h4 className="text-sm font-bold text-purple-900 mb-2">Why use this?</h4>
                     <p className="text-xs text-gray-800 leading-relaxed">{whyUse}</p>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Project Features */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <MdBolt className="text-yellow-600" />
            Key Features & Capabilities
          </h2>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {projectFeatures.map(({ title, description, icon: Icon, features }) => (
               <div key={title} className="group bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl shadow-lg border border-rose-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:from-rose-100 hover:to-pink-100">
                 <div className="flex items-center gap-3 mb-4">
                   <Icon className="text-4xl text-rose-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                   <h3 className="text-xl font-bold text-gray-900 group-hover:text-rose-900 transition-colors duration-300">{title}</h3>
                 </div>
                 <p className="text-gray-700 mb-4 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{description}</p>
                 <div className="space-y-2">
                   {features.map((feature, index) => (
                     <div key={index} className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                       <div className="w-2 h-2 bg-rose-500 rounded-full group-hover:bg-rose-600 transition-colors duration-300"></div>
                       <span className="text-sm text-gray-700 font-medium group-hover:text-gray-800 transition-colors duration-300">{feature}</span>
                     </div>
                   ))}
                 </div>
               </div>
             ))}
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

            <div className="grid md:grid-cols-2 gap-8 mb-8">
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
              
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TbApi className="text-indigo-600" />
                  Technical Expertise
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    'Full-Stack Development (MERN Stack)',
                    'Banking & Financial Applications',
                    'Payment Gateway Integration',
                    'API Development & Integration',
                    'Database Design & Optimization',
                    'Security & Authentication',
                    'AI Integration (OpenAI)',
                    'Cloud Services (Cloudinary)',
                    'Real-time Applications',
                    'Responsive Web Design'
                  ].map((skill, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-indigo-100">
                      <span className="text-gray-700 font-medium">• {skill}</span>
                    </div>
                  ))}
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
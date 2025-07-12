"use client";
import { AiOutlineGithub, AiOutlineInstagram, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai';
import { FaReact, FaNodeJs, FaDatabase, FaShieldAlt, FaMobile, FaCode, FaServer, FaDesktop, FaTelegram } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiJavascript, SiGit } from 'react-icons/si';
import { MdPayment, MdAccountBalance, MdSecurity, MdSpeed, MdChat, MdQrCode, MdBolt, MdReceipt } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { RiBankCardLine } from 'react-icons/ri';
import HeaderName from '@/components/HeaderName';

const socials = [
  { href: 'https://github.com/gourabop', label: 'GitHub', Icon: AiOutlineGithub, color: 'hover:text-gray-800', bgColor: 'hover:bg-gray-100' },
  { href: 'https://instagram.com/gourab_op_84', label: 'Instagram', Icon: AiOutlineInstagram, color: 'hover:text-pink-600', bgColor: 'hover:bg-pink-50' },
  { href: 'https://linkedin.com/in/gourab', label: 'LinkedIn', Icon: AiFillLinkedin, color: 'hover:text-blue-600', bgColor: 'hover:bg-blue-50' },
  { href: 'mailto:gourabmullick200@gmail.com', label: 'Gmail', Icon: AiOutlineMail, color: 'hover:text-red-600', bgColor: 'hover:bg-red-50' },
  { href: 'https://t.me/its_me_gourab', label: 'Telegram', Icon: FaTelegram, color: 'hover:text-blue-500', bgColor: 'hover:bg-blue-50' },
];

const frontendTech = [
  { name: 'React Js', icon: FaReact, description: 'Modern UI library with hooks and functional components', why: 'Component-based architecture for reusable UI elements' },
  { name: 'Next.js', icon: SiNextdotjs, description: 'React framework for production-ready applications', why: 'SSR, routing, and optimized performance out of the box' },
  { name: 'TailwindCSS', icon: SiTailwindcss, description: 'Utility-first CSS framework for modern design', why: 'Rapid UI development with utility classes' },
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
                <div key={name} className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-lg shadow-lg border border-blue-300 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-blue-200 hover:to-cyan-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="text-3xl text-blue-700" />
                    <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
                  </div>
                  <p className="text-gray-800 text-sm mb-2 font-medium">{description}</p>
                  <p className="text-blue-700 text-xs font-semibold">Why: {why}</p>
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
                <div key={name} className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg shadow-lg border border-green-300 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-green-200 hover:to-emerald-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="text-3xl text-green-700" />
                    <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
                  </div>
                  <p className="text-gray-800 text-sm font-medium">{description}</p>
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
              <div key={title} className="bg-gradient-to-r from-rose-100 to-pink-100 p-8 rounded-lg shadow-lg border border-rose-300 hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:from-rose-200 hover:to-pink-200 group">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="text-3xl text-rose-700 group-hover:text-rose-800 transition-colors duration-300" />
                  <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-gray-950 transition-colors duration-300">{title}</h3>
                </div>
                <p className="text-gray-800 font-medium mb-4 group-hover:text-gray-900 transition-colors duration-300">{description}</p>
                <div className="space-y-2">
                  {details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 bg-rose-700 rounded-full group-hover:bg-rose-800 transition-colors duration-300"></div>
                      <span className="text-sm font-medium">{detail}</span>
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
          <div className="bg-gradient-to-r from-gray-100 to-slate-100 p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Gourab Mullick</h3>
              <p className="text-gray-800 text-lg font-medium">Full-Stack Developer(MERN STACK)</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">About the Developer</h4>
                <p className="text-gray-800 leading-relaxed font-medium">
                  Passionate full-stack developer with expertise in modern web technologies. Specialized in building 
                  secure, scalable banking applications with focus on user experience and performance optimization. 
                  Committed to delivering high-quality, production-ready solutions.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Technical Expertise</h4>
                <ul className="space-y-2 text-gray-800">
                  <li className="font-medium">• Full-Stack Development (MERN Stack)</li>
                  <li className="font-medium">• Banking & Financial Applications</li>
                  <li className="font-medium">• API Development & Integration</li>
                  <li className="font-medium">• Security & Authentication</li>
                  <li className="font-medium">• Payment Gateway Integration</li>
                  <li className="font-medium">• AI Integration</li>
                </ul>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">Connect with the Developer</h4>
              <div className="flex justify-center items-center gap-4 flex-wrap">
                {socials.map(({ href, label, Icon, color, bgColor }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 ${color} ${bgColor} transform hover:-translate-y-1 hover:scale-105`}
                  >
                    <Icon className="text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                    <span className="font-semibold transition-all duration-300">{label}</span>
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
            <div className="text-center p-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg shadow-lg border border-blue-300 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-blue-200 hover:to-cyan-200">
              <MdSpeed className="text-4xl text-blue-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Performance</h3>
              <p className="text-sm text-gray-800 font-medium">Optimized for fast loading and smooth interactions</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg shadow-lg border border-green-300 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-green-200 hover:to-emerald-200">
              <FaShieldAlt className="text-4xl text-green-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
              <p className="text-sm text-gray-800 font-medium">Bank-grade security with industry best practices</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg shadow-lg border border-purple-300 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-purple-200 hover:to-indigo-200">
              <FaMobile className="text-4xl text-purple-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Responsive</h3>
              <p className="text-sm text-gray-800 font-medium">Works perfectly on desktop, tablet, and mobile</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-rose-100 to-pink-100 rounded-lg shadow-lg border border-rose-300 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-rose-200 hover:to-pink-200">
              <BiTransfer className="text-4xl text-rose-700 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Real-time</h3>
              <p className="text-sm text-gray-800 font-medium">Live updates and instant notifications</p>
            </div>
          </div>
        </section>

        {/* Project Status */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-8 rounded-lg shadow-lg border border-rose-300 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-rose-200 hover:to-pink-200 group">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-gray-950 transition-colors duration-300">Project Status</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-950 transition-colors duration-300">Version</h3>
                <p className="text-rose-700 font-bold group-hover:text-rose-800 transition-colors duration-300">1.0.0</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-950 transition-colors duration-300">Status</h3>
                <p className="text-green-700 font-bold group-hover:text-green-800 transition-colors duration-300">Production Ready</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-950 transition-colors duration-300">Support</h3>
                <p className="text-blue-700 font-bold group-hover:text-blue-800 transition-colors duration-300">Actively Maintained</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
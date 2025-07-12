"use client";
import { 
  AiOutlineGithub, 
  AiOutlineInstagram, 
  AiOutlineMail 
} from 'react-icons/ai';
import { 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaShieldAlt, 
  FaMobile, 
  FaCode, 
  FaServer, 
  FaDesktop, 
  FaTelegram,
  FaGithub,
  FaUsers,
  FaRocket,
  FaLightbulb,
  FaTools,
  FaCog,
  FaCheckCircle
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiMongodb, 
  SiExpress, 
  SiJavascript, 
  SiRedux,
  SiVercel,
  SiPostman,
  SiVisualstudiocode,
  SiGit,
  SiJsonwebtokens,
  SiRazorpay,
  SiOpenai
} from 'react-icons/si';
import { 
  MdPayment, 
  MdAccountBalance, 
  MdSecurity, 
  MdSpeed, 
  MdChat, 
  MdCloud,
  MdIntegration,
  MdArchitecture,
  MdDeveloperMode,
  MdSchool,
  MdWork,
  MdEmail,
  MdLocationOn
} from 'react-icons/md';
import { 
  BiTransfer, 
  BiCodeAlt,
  BiCube,
  BiDevices
} from 'react-icons/bi';
import { 
  RiBankCardLine,
  RiTeamFill 
} from 'react-icons/ri';
import { 
  HiOutlineGlobe,
  HiOutlineCode,
  HiOutlineCubeTransparent
} from 'react-icons/hi';
import HeaderName from '@/components/HeaderName';

const frontendTechnologies = [
  {
    name: 'React 18',
    icon: FaReact,
    version: '18.2.0',
    description: 'A JavaScript library for building user interfaces with component-based architecture',
    whyChosen: 'React provides excellent performance with its virtual DOM, has a vast ecosystem, and allows for reusable components. The hooks system makes state management intuitive.',
    benefits: ['Virtual DOM for optimal performance', 'Large community support', 'Reusable components', 'Excellent developer tools'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Next.js 14',
    icon: SiNextdotjs,
    version: '14.0.0',
    description: 'React framework for production with server-side rendering and static site generation',
    whyChosen: 'Next.js provides out-of-the-box SSR, automatic code splitting, and optimized performance. It\'s perfect for SEO-friendly banking applications.',
    benefits: ['Server-side rendering', 'Automatic code splitting', 'Built-in optimization', 'API routes'],
    color: 'from-gray-700 to-gray-900'
  },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    version: '3.4.0',
    description: 'Utility-first CSS framework for rapidly building custom user interfaces',
    whyChosen: 'Tailwind allows for rapid prototyping and consistent design system. It reduces CSS bundle size and provides excellent customization options.',
    benefits: ['Utility-first approach', 'Consistent design system', 'Smaller CSS bundle', 'Responsive design'],
    color: 'from-teal-500 to-cyan-500'
  },
  {
    name: 'Redux Toolkit',
    icon: SiRedux,
    version: '1.9.0',
    description: 'Predictable state container for JavaScript apps with simplified Redux logic',
    whyChosen: 'For complex banking operations, centralized state management is crucial. Redux Toolkit simplifies Redux usage with less boilerplate code.',
    benefits: ['Predictable state updates', 'Time-travel debugging', 'Simplified Redux logic', 'DevTools integration'],
    color: 'from-purple-500 to-indigo-500'
  },
  {
    name: 'JavaScript ES6+',
    icon: SiJavascript,
    version: 'ES2023',
    description: 'Modern JavaScript with latest features for enhanced development experience',
    whyChosen: 'Modern JavaScript features like async/await, destructuring, and modules improve code readability and maintainability.',
    benefits: ['Modern syntax', 'Async/await support', 'Module system', 'Enhanced performance'],
    color: 'from-yellow-500 to-orange-500'
  }
];

const backendTechnologies = [
  {
    name: 'Node.js',
    icon: FaNodeJs,
    version: '18.17.0',
    description: 'JavaScript runtime built on Chrome\'s V8 engine for scalable server-side applications',
    whyChosen: 'Node.js enables JavaScript everywhere, has excellent performance for I/O operations, and provides a unified development experience.',
    benefits: ['JavaScript everywhere', 'Non-blocking I/O', 'Large package ecosystem', 'Excellent performance'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Express.js',
    icon: SiExpress,
    version: '4.18.0',
    description: 'Fast, unopinionated, minimalist web framework for Node.js applications',
    whyChosen: 'Express.js is lightweight, flexible, and has extensive middleware support. Perfect for building RESTful APIs quickly.',
    benefits: ['Minimal and flexible', 'Extensive middleware', 'Fast development', 'Great performance'],
    color: 'from-gray-600 to-gray-800'
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    version: '6.0.0',
    description: 'NoSQL document database for modern applications with flexible schema',
    whyChosen: 'MongoDB provides flexible document structure, excellent scalability, and integrates well with JavaScript applications.',
    benefits: ['Flexible schema', 'Horizontal scaling', 'JSON-like documents', 'Rich query language'],
    color: 'from-green-600 to-teal-600'
  },
  {
    name: 'JWT Authentication',
    icon: SiJsonwebtokens,
    version: '9.0.0',
    description: 'JSON Web Tokens for secure authentication and authorization',
    whyChosen: 'JWT provides stateless authentication, works well with microservices, and offers excellent security for banking applications.',
    benefits: ['Stateless authentication', 'Secure token-based auth', 'Cross-platform compatibility', 'Scalable solution'],
    color: 'from-purple-600 to-pink-600'
  },
  {
    name: 'Razorpay Integration',
    icon: SiRazorpay,
    version: '2.9.0',
    description: 'Complete payment gateway solution for seamless transactions',
    whyChosen: 'Razorpay is India\'s leading payment gateway with comprehensive APIs, excellent documentation, and strong security.',
    benefits: ['Multiple payment methods', 'Instant settlements', 'Robust APIs', 'Excellent documentation'],
    color: 'from-blue-600 to-indigo-600'
  },
  {
    name: 'OpenAI Integration',
    icon: SiOpenai,
    version: '4.0.0',
    description: 'AI-powered chatbot and intelligent customer service',
    whyChosen: 'OpenAI provides advanced NLP capabilities for intelligent customer support, reducing operational costs and improving user experience.',
    benefits: ['Natural language processing', '24/7 availability', 'Intelligent responses', 'Cost-effective support'],
    color: 'from-emerald-500 to-teal-500'
  }
];

const developmentTools = [
  {
    name: 'Visual Studio Code',
    icon: SiVisualstudiocode,
    description: 'Primary IDE with extensive extensions for full-stack development',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Git & GitHub',
    icon: SiGit,
    description: 'Version control system for code collaboration and project management',
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Postman',
    icon: SiPostman,
    description: 'API testing and development environment for backend services',
    color: 'from-orange-400 to-pink-500'
  },
  {
    name: 'Vercel',
    icon: SiVercel,
    description: 'Deployment platform for modern web applications with global CDN',
    color: 'from-gray-700 to-black'
  }
];

const projectFeatures = [
  {
    title: 'Multi-Account Banking',
    description: 'Complete banking ecosystem with savings, current, and business accounts',
    icon: MdAccountBalance,
    highlights: ['Real-time balance updates', 'Transaction history', 'Account statements', 'Interest calculations']
  },
  {
    title: 'UPI & Digital Payments',
    description: 'Unified Payments Interface with QR code generation and instant transfers',
    icon: MdPayment,
    highlights: ['QR code generation', 'Instant transfers', 'Bill payments', 'Mobile recharge']
  },
  {
    title: 'Fixed Deposits',
    description: 'Investment platform with competitive interest rates and flexible terms',
    icon: BiCube,
    highlights: ['0.1% daily interest', 'Flexible tenure', 'Auto-renewal options', 'Early withdrawal']
  },
  {
    title: 'ATM Card Management',
    description: 'Complete debit card lifecycle management with security controls',
    icon: RiBankCardLine,
    highlights: ['Card activation', 'PIN management', 'Transaction limits', 'Fraud protection']
  },
  {
    title: 'AI-Powered Support',
    description: 'Intelligent chatbot for 24/7 customer service and banking assistance',
    icon: MdChat,
    highlights: ['Natural language processing', 'Banking queries', 'Account assistance', 'Fraud detection']
  },
  {
    title: 'Security & Compliance',
    description: 'Bank-grade security with multi-layer authentication and encryption',
    icon: MdSecurity,
    highlights: ['JWT authentication', 'Data encryption', 'KYC verification', 'Audit trails']
  }
];

const architectureHighlights = [
  {
    title: 'Microservices Architecture',
    description: 'Modular backend design for scalability and maintainability',
    icon: MdArchitecture,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    title: 'RESTful API Design',
    description: 'Clean, documented APIs following REST principles',
    icon: HiOutlineCode,
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'Real-time Updates',
    description: 'Live data synchronization across all user interfaces',
    icon: MdSpeed,
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Responsive Design',
    description: 'Mobile-first approach with seamless cross-device experience',
    icon: BiDevices,
    color: 'from-blue-500 to-cyan-500'
  }
];

const developerInfo = {
  name: 'Gourab Mullick',
  title: 'Full-Stack Developer (MERN Stack)',
  bio: 'Passionate full-stack developer with 3+ years of experience building scalable web applications. Specialized in modern JavaScript technologies, banking applications, and AI integration. Committed to writing clean, maintainable code and delivering exceptional user experiences.',
  location: 'West Bengal, India',
  email: 'gourabmullick200@gmail.com',
  expertise: [
    'Full-Stack Development (MERN Stack)',
    'Banking & Financial Applications',
    'RESTful API Development',
    'Database Design & Optimization',
    'Payment Gateway Integration',
    'AI/ML Integration',
    'Security & Authentication',
    'Cloud Deployment & DevOps'
  ],
  socialLinks: [
    {
      name: 'GitHub',
      icon: AiOutlineGithub,
      url: 'https://github.com/gourabop',
      color: 'hover:text-gray-800',
      bgColor: 'hover:bg-gray-100'
    },
    {
      name: 'Instagram',
      icon: AiOutlineInstagram,
      url: 'https://instagram.com/gourab_op_84',
      color: 'hover:text-pink-600',
      bgColor: 'hover:bg-pink-50'
    },
    {
      name: 'Telegram',
      icon: FaTelegram,
      url: 'https://t.me/its_me_gourab',
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-50'
    },
    {
      name: 'Gmail',
      icon: AiOutlineMail,
      url: 'mailto:gourabmullick200@gmail.com',
      color: 'hover:text-red-600',
      bgColor: 'hover:bg-red-50'
    }
  ]
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <HeaderName />
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                CBI Digital Banking Platform
              </h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                A comprehensive, full-stack banking application built with modern web technologies. 
                Designed for scalability, security, and exceptional user experience.
              </p>
            </div>
            <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>Production Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>Secure & Scalable</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>Modern Tech Stack</span>
              </div>
            </div>
          </div>
        </div>

        {/* Frontend Technologies */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <FaDesktop className="text-blue-600" />
              Frontend Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Modern client-side technologies for building responsive and interactive user interfaces
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {frontendTechnologies.map((tech) => (
              <div key={tech.name} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${tech.color}`}>
                    <tech.icon className="text-3xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{tech.name}</h3>
                    <p className="text-sm text-gray-500">v{tech.version}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{tech.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Why chosen:</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{tech.whyChosen}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {tech.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Backend Technologies */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <FaServer className="text-green-600" />
              Backend Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Robust server-side technologies for secure, scalable, and efficient banking operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {backendTechnologies.map((tech) => (
              <div key={tech.name} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${tech.color}`}>
                    <tech.icon className="text-3xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{tech.name}</h3>
                    <p className="text-sm text-gray-500">v{tech.version}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{tech.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Why chosen:</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{tech.whyChosen}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {tech.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Development Tools */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <FaTools className="text-purple-600" />
              Development Tools & Platforms
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Essential tools and platforms used throughout the development lifecycle
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developmentTools.map((tool) => (
              <div key={tool.name} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${tool.color} mx-auto mb-4 w-fit`}>
                  <tool.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Project Features */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <FaRocket className="text-indigo-600" />
              Project Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive banking features designed for modern digital banking needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectFeatures.map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500">
                    <feature.icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {feature.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture Highlights */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <MdArchitecture className="text-orange-600" />
              Architecture Highlights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Well-architected system following industry best practices and modern design patterns
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {architectureHighlights.map((highlight) => (
              <div key={highlight.title} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${highlight.color} mx-auto mb-4 w-fit`}>
                  <highlight.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{highlight.title}</h3>
                <p className="text-sm text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Developer Information */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <FaUsers className="text-blue-600" />
              Developer Information
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the developer behind this comprehensive banking platform
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCode className="text-4xl text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{developerInfo.name}</h3>
              <p className="text-xl text-gray-600 mb-4">{developerInfo.title}</p>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <MdLocationOn className="text-gray-400" />
                  <span>{developerInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdEmail className="text-gray-400" />
                  <span>{developerInfo.email}</span>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-8">
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MdDeveloperMode className="text-blue-600" />
                  About the Developer
                </h4>
                <p className="text-gray-600 leading-relaxed">{developerInfo.bio}</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MdWork className="text-green-600" />
                  Technical Expertise
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {developerInfo.expertise.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <FaCheckCircle className="text-green-500 text-sm" />
                      <span className="text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-800 mb-6">Connect with the Developer</h4>
              <div className="flex justify-center gap-4 flex-wrap">
                {developerInfo.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300 ${social.color} ${social.bgColor} transform hover:-translate-y-1`}
                  >
                    <social.icon className="text-2xl transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Project Status */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-8">Project Status & Information</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">v1.0.0</div>
                <div className="text-blue-100">Current Version</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Production</div>
                <div className="text-blue-100">Ready Status</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Active</div>
                <div className="text-blue-100">Maintenance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Open</div>
                <div className="text-blue-100">Source</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
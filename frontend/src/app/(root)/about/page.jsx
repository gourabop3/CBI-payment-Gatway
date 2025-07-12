"use client";
import { AiOutlineGithub, AiOutlineInstagram, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai';
import { FaReact, FaNodeJs, FaDatabase, FaShieldAlt, FaMobile, FaCode, FaServer, FaDesktop, FaGitAlt, FaDocker, FaEnvelope } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiJavascript, SiGit, SiJsonwebtokens, SiRazorpay } from 'react-icons/si';
import { MdPayment, MdAccountBalance, MdSecurity, MdSpeed, MdApi, MdEmail, MdCloud, MdIntegrationInstructions } from 'react-icons/md';
import { BiKey, BiCodeCurly, BiData } from 'react-icons/bi';
import { RiSecurePaymentLine } from 'react-icons/ri';
import HeaderName from '@/components/HeaderName';

const socials = [
  {
    href: 'https://github.com/gourab18',
    label: 'GitHub',
    Icon: AiOutlineGithub,
  },
  {
    href: 'https://instagram.com/gourab_op_84',
    label: 'Instagram',
    Icon: AiOutlineInstagram,
  },
  {
    href: 'https://linkedin.com/in/gourab-mullick',
    label: 'LinkedIn',
    Icon: AiFillLinkedin,
  },
  {
    href: 'mailto:gourabmullick200@gmail.com',
    label: 'Gmail',
    Icon: AiOutlineMail,
  },
];

const technologies = [
  { name: 'React', icon: FaReact, color: 'text-blue-500' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-black' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500' },
  { name: 'Node.js', icon: FaNodeJs, color: 'text-green-500' },
  { name: 'Express.js', icon: SiExpress, color: 'text-gray-600' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
  { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500' },
  { name: 'Git', icon: SiGit, color: 'text-orange-500' },
];

const features = [
  { title: 'UPI Payments', description: 'Instant UPI transfers with QR code generation', icon: MdPayment },
  { title: 'Account Management', description: 'Comprehensive account balance and transaction tracking', icon: MdAccountBalance },
  { title: 'Security', description: 'JWT authentication and secure payment processing', icon: MdSecurity },
  { title: 'Real-time Updates', description: 'Live balance updates without page refresh', icon: MdSpeed },
];

const frameworks = [
  {
    category: 'Frontend Framework',
    items: [
      { name: 'React 18+', description: 'Component-based UI library with hooks and functional components', icon: FaReact, color: 'text-blue-500' },
      { name: 'Next.js 14', description: 'Full-stack React framework with SSR, routing, and optimization', icon: SiNextdotjs, color: 'text-black' },
      { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid UI development', icon: SiTailwindcss, color: 'text-cyan-500' },
    ]
  },
  {
    category: 'Backend Framework',
    items: [
      { name: 'Node.js', description: 'JavaScript runtime environment for server-side development', icon: FaNodeJs, color: 'text-green-500' },
      { name: 'Express.js', description: 'Fast, unopinionated web framework for Node.js', icon: SiExpress, color: 'text-gray-600' },
      { name: 'Mongoose', description: 'MongoDB object modeling for Node.js', icon: SiMongodb, color: 'text-green-600' },
    ]
  }
];

const apis = [
  {
    name: 'Authentication API',
    description: 'JWT-based user authentication and authorization',
    endpoints: ['/auth/login', '/auth/register', '/auth/profile'],
    icon: SiJsonwebtokens,
    color: 'text-purple-600'
  },
  {
    name: 'Payment Gateway API',
    description: 'Razorpay integration for secure payment processing',
    endpoints: ['/payment/create', '/payment/verify', '/payment/webhook'],
    icon: SiRazorpay,
    color: 'text-blue-600'
  },
  {
    name: 'UPI API',
    description: 'Custom UPI payment system with QR code generation',
    endpoints: ['/upi/pay', '/upi/qr', '/upi/transactions'],
    icon: MdPayment,
    color: 'text-green-600'
  },
  {
    name: 'Email API',
    description: 'NodeMailer integration for email notifications',
    endpoints: ['/email/send', '/email/verify', '/email/template'],
    icon: FaEnvelope,
    color: 'text-red-600'
  },
  {
    name: 'Banking API',
    description: 'Account management and transaction processing',
    endpoints: ['/account/balance', '/transfer/initiate', '/transactions/history'],
    icon: MdAccountBalance,
    color: 'text-indigo-600'
  },
  {
    name: 'ATM Card API',
    description: 'ATM card management and operations',
    endpoints: ['/atm-card/create', '/atm-card/activate', '/atm-card/transactions'],
    icon: BiKey,
    color: 'text-orange-600'
  }
];

const architecture = [
  {
    title: 'Frontend Architecture',
    description: 'Modern React-based SPA with Next.js',
    details: [
      'Component-based architecture with React hooks',
      'Server-side rendering with Next.js App Router',
      'Responsive design with Tailwind CSS',
      'State management using React Context API',
      'Real-time updates with polling mechanism',
      'Form validation and error handling',
      'Toast notifications for user feedback'
    ],
    icon: FaDesktop,
    color: 'text-blue-600'
  },
  {
    title: 'Backend Architecture',
    description: 'RESTful API with Node.js and Express',
    details: [
      'MVC (Model-View-Controller) pattern',
      'RESTful API design with Express.js',
      'MongoDB database with Mongoose ODM',
      'JWT authentication middleware',
      'Email service with NodeMailer',
      'Payment gateway integration',
      'Transaction management with sessions',
      'Error handling and logging'
    ],
    icon: FaServer,
    color: 'text-green-600'
  },
  {
    title: 'Database Design',
    description: 'MongoDB with optimized schemas',
    details: [
      'User authentication and profile management',
      'Account and transaction modeling',
      'UPI payment system integration',
      'ATM card management',
      'API key and usage tracking',
      'Email templates and notifications',
      'Admin dashboard data'
    ],
    icon: FaDatabase,
    color: 'text-purple-600'
  }
];

const integrations = [
  {
    name: 'Razorpay Payment Gateway',
    description: 'Secure payment processing with multiple payment methods',
    features: ['Credit/Debit Cards', 'Net Banking', 'UPI', 'Wallets'],
    icon: RiSecurePaymentLine,
    color: 'text-blue-600'
  },
  {
    name: 'Email Service (NodeMailer)',
    description: 'Automated email notifications and templates',
    features: ['Payment confirmations', 'Account updates', 'Security alerts', 'Welcome emails'],
    icon: MdEmail,
    color: 'text-red-600'
  },
  {
    name: 'QR Code Generation',
    description: 'Dynamic QR codes for UPI payments',
    features: ['Payment QR codes', 'Account QR codes', 'Transaction receipts'],
    icon: BiCodeCurly,
    color: 'text-green-600'
  }
];

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <HeaderName />
      <div className="bg-white shadow-xl rounded-2xl p-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-rose-600 mb-4">
            About This Project
          </h1>
          <p className="text-gray-700 leading-relaxed text-lg">
            This comprehensive banking application was crafted by <span className="font-semibold">Gourab</span> to
            demonstrate modern full-stack development – from a robust Node.js backend to an
            elegant React frontend with Next.js framework.
          </p>
        </div>

        {/* How The Project Is Built */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaCode className="text-rose-600" />
            How This Project Is Built
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaDesktop className="text-blue-600" />
                Frontend Development
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Built with <strong>React 18+</strong> using functional components and hooks</li>
                <li>• <strong>Next.js 14</strong> for server-side rendering and routing</li>
                <li>• <strong>Tailwind CSS</strong> for responsive, utility-first styling</li>
                <li>• <strong>Context API</strong> for state management across components</li>
                <li>• <strong>Axios</strong> for API communication with interceptors</li>
                <li>• <strong>React Icons</strong> for consistent iconography</li>
                <li>• <strong>React Toastify</strong> for user notifications</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaServer className="text-green-600" />
                Backend Development
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Node.js</strong> runtime with Express.js framework</li>
                <li>• <strong>MongoDB</strong> with Mongoose ODM for data modeling</li>
                <li>• <strong>JWT</strong> for secure authentication and authorization</li>
                <li>• <strong>Bcrypt</strong> for password hashing and security</li>
                <li>• <strong>Multer</strong> for file upload handling</li>
                <li>• <strong>CORS</strong> for cross-origin resource sharing</li>
                <li>• <strong>Helmet</strong> for API security headers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Frameworks Used */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <MdIntegrationInstructions className="text-rose-600" />
            Frameworks & Libraries
          </h2>
          {frameworks.map((framework) => (
            <div key={framework.category} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{framework.category}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {framework.items.map((item) => (
                  <div key={item.name} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className={`text-2xl ${item.color}`} />
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* APIs Used */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <MdApi className="text-rose-600" />
            APIs & Integrations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {apis.map((api) => (
              <div key={api.name} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <api.icon className={`text-2xl ${api.color}`} />
                  <h3 className="text-lg font-semibold text-gray-800">{api.name}</h3>
                </div>
                <p className="text-gray-700 mb-4">{api.description}</p>
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-800">Key Endpoints:</h4>
                  {api.endpoints.map((endpoint) => (
                    <code key={endpoint} className="block text-sm bg-white px-2 py-1 rounded text-gray-700 font-mono">
                      {endpoint}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Architecture */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <BiData className="text-rose-600" />
            Project Architecture
          </h2>
          <div className="space-y-6">
            {architecture.map((arch) => (
              <div key={arch.title} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <arch.icon className={`text-2xl ${arch.color}`} />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{arch.title}</h3>
                    <p className="text-gray-600">{arch.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {arch.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Third-Party Integrations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <MdCloud className="text-rose-600" />
            Third-Party Integrations
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <div key={integration.name} className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <integration.icon className={`text-2xl ${integration.color}`} />
                  <h3 className="text-lg font-semibold text-gray-800">{integration.name}</h3>
                </div>
                <p className="text-gray-700 mb-4">{integration.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Features:</h4>
                  {integration.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaShieldAlt className="text-rose-600" />
            Technologies Used
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies.map(({ name, icon: Icon, color }) => (
              <div key={name} className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <Icon className={`text-4xl mx-auto mb-2 ${color}`} />
                <p className="font-medium text-gray-700">{name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaMobile className="text-rose-600" />
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map(({ title, description, icon: Icon }) => (
              <div key={title} className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="text-2xl text-rose-600" />
                  <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                </div>
                <p className="text-gray-700">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaDatabase className="text-rose-600" />
            Technical Highlights
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Development Process</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Version Control:</strong> Git with GitHub for code management</li>
                  <li>• <strong>Architecture:</strong> MVC pattern with separation of concerns</li>
                  <li>• <strong>Security:</strong> JWT authentication, password hashing, CORS</li>
                  <li>• <strong>Testing:</strong> Manual testing with comprehensive error handling</li>
                  <li>• <strong>Deployment:</strong> Ready for production with environment variables</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Performance Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Real-time Updates:</strong> Live balance updates without refresh</li>
                  <li>• <strong>Optimization:</strong> Next.js SSR for fast loading</li>
                  <li>• <strong>Caching:</strong> Efficient data caching strategies</li>
                  <li>• <strong>Responsive:</strong> Mobile-first design approach</li>
                  <li>• <strong>Scalability:</strong> Modular architecture for easy scaling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Connect Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Connect with Gourab</h2>
          <p className="text-gray-600 mb-8">
            Feel free to reach out for collaborations, questions, or just to say hello!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-lg font-medium text-gray-600 hover:text-rose-600 transition group"
              >
                <span className="text-3xl p-3 rounded-full bg-rose-50 group-hover:bg-rose-100 shadow-md group-hover:shadow-lg transition-all">
                  <Icon />
                </span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
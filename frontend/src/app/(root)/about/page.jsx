"use client";
import { AiOutlineGithub, AiOutlineInstagram, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai';
import { FaReact, FaNodeJs, FaDatabase, FaShieldAlt, FaMobile, FaCode, FaServer, FaDesktop } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiJavascript, SiGit } from 'react-icons/si';
import { MdPayment, MdAccountBalance, MdSecurity, MdSpeed } from 'react-icons/md';
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

        {/* Technologies Used */}
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

        {/* Project Architecture */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaServer className="text-rose-600" />
            Project Architecture
          </h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <FaDesktop className="text-2xl text-blue-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Frontend Architecture</h3>
                  <p className="text-gray-600">Modern React-based SPA with Next.js</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">Component-based architecture with React hooks</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">Server-side rendering with Next.js App Router</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">Responsive design with Tailwind CSS</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">State management using React Context API</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <FaServer className="text-2xl text-green-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Backend Architecture</h3>
                  <p className="text-gray-600">RESTful API with Node.js and Express</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">MVC (Model-View-Controller) pattern</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">RESTful API design with Express.js</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">MongoDB database with Mongoose ODM</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">JWT authentication middleware</p>
                </div>
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
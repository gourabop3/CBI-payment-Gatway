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
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <HeaderName />
      <div className="bg-white shadow-xl rounded-2xl p-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-rose-600 mb-4">
            About This Project
          </h1>
          <p className="text-gray-700 leading-relaxed text-lg">
            This banking application was lovingly crafted by <span className="font-semibold">Gourab</span> to
            demonstrate modern full-stack development – from a robust Node.js backend to an
            elegant Next.js &amp; Tailwind CSS frontend.
          </p>
        </div>

        {/* Project Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaCode className="text-rose-600" />
            Project Overview
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaDesktop className="text-blue-600" />
                Frontend
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>React 18+</strong> - Modern React with hooks and functional components</li>
                <li>• <strong>Next.js 14</strong> - Server-side rendering and app routing</li>
                <li>• <strong>Tailwind CSS</strong> - Utility-first CSS framework for modern UI</li>
                <li>• <strong>Responsive Design</strong> - Mobile-first approach with beautiful UI</li>
                <li>• <strong>Real-time Updates</strong> - Live balance and transaction updates</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaServer className="text-green-600" />
                Backend
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Node.js</strong> - JavaScript runtime environment</li>
                <li>• <strong>Express.js</strong> - Web application framework</li>
                <li>• <strong>MongoDB</strong> - NoSQL database for data storage</li>
                <li>• <strong>JWT Authentication</strong> - Secure user authentication</li>
                <li>• <strong>RESTful APIs</strong> - Clean and organized API structure</li>
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

        {/* Additional Project Details */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaDatabase className="text-rose-600" />
            Technical Highlights
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Frontend Architecture</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Component-based architecture with React</li>
                  <li>• State management using React hooks</li>
                  <li>• Responsive design with Tailwind CSS</li>
                  <li>• Real-time balance updates</li>
                  <li>• Form validation and error handling</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Backend Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• RESTful API design</li>
                  <li>• JWT-based authentication</li>
                  <li>• MongoDB data modeling</li>
                  <li>• Transaction management</li>
                  <li>• Email notifications</li>
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
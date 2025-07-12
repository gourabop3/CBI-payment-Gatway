"use client";
import { AiOutlineGithub, AiOutlineInstagram, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai';
import { FaReact, FaNodeJs, FaDatabase, FaShieldAlt, FaMobile, FaCode, FaServer, FaDesktop } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiJavascript, SiGit } from 'react-icons/si';
import { MdPayment, MdAccountBalance, MdSecurity, MdSpeed } from 'react-icons/md';
import HeaderName from '@/components/HeaderName';

const socials = [
  { href: 'https://github.com/gourab18', label: 'GitHub', Icon: AiOutlineGithub },
  { href: 'https://instagram.com/gourab_op_84', label: 'Instagram', Icon: AiOutlineInstagram },
  { href: 'https://linkedin.com/in/gourab-mullick', label: 'LinkedIn', Icon: AiFillLinkedin },
  { href: 'mailto:gourabmullick200@gmail.com', label: 'Gmail', Icon: AiOutlineMail },
];

const technologies = [
  { name: 'React', icon: FaReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Express.js', icon: SiExpress },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Git', icon: SiGit },
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

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaCode className="text-rose-600" />
            How This Project Is Built
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg shadow-lg border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <FaDesktop className="text-blue-600" />
                Frontend Development
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li>• React 18+ with functional components and hooks</li>
                <li>• Next.js 14 for routing & SSR</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Context API for state management</li>
                <li>• Axios for API communication</li>
                <li>• React Icons & Toastify for UX</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg shadow-lg border border-green-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <FaServer className="text-green-600" />
                Backend Development
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li>• Node.js + Express.js framework</li>
                <li>• MongoDB with Mongoose</li>
                <li>• JWT for auth</li>
                <li>• Bcrypt for password hashing</li>
                <li>• Multer for file uploads</li>
                <li>• CORS and Helmet for security</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaShieldAlt className="text-rose-600" />
            Technologies Used
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map(({ name, icon: Icon }) => (
              <div key={name} className="group relative overflow-hidden rounded-xl text-center shadow-lg hover:scale-110 transition transform duration-500 cursor-pointer bg-white border border-gray-100 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Icon className="text-5xl mx-auto mb-3 text-rose-600 drop-shadow-lg" />
                <p className="font-bold text-gray-800 text-lg drop-shadow-md group-hover:text-rose-600 transition-colors duration-300">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaMobile className="text-rose-600" />
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map(({ title, description, icon: Icon }) => (
              <div key={title} className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-lg shadow-lg border border-rose-200 hover:shadow-xl hover:scale-105 transition-all duration-300 transform">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="text-2xl text-rose-600" />
                  <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                </div>
                <p className="text-gray-800 font-medium">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Technical Highlights
          </h2>
          <p className="text-gray-700">
            This project combines both frontend and backend best practices using the MERN stack along with secure payment integration workflows.
          </p>
        </section>
      </div>
    </div>
  );
}
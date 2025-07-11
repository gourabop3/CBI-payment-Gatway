"use client";
import { AiOutlineGithub, AiOutlineInstagram, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai';
import HeaderName from '@/components/HeaderName';

const socials = [
  {
    href: 'https://github.com/gourab18',
    label: 'GitHub',
    Icon: AiOutlineGithub,
  },
  {
    href: 'https://instagram.com/gourab__mullick',
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

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <HeaderName />
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-extrabold text-rose-600 mb-4">
          About This Project
        </h1>
        <p className="text-gray-700 leading-relaxed mb-8">
          This banking application was lovingly crafted by <span className="font-semibold">Gourab</span> to
          demonstrate modern full-stack development – from a robust Node.js backend to an
          elegant Next.js &amp; Tailwind CSS frontend.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Connect with Gourab</h2>

        <div className="flex flex-wrap justify-center gap-6">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              className="flex items-center gap-2 text-lg font-medium text-gray-600 hover:text-rose-600 transition group"
            >
              <span className="text-3xl p-3 rounded-full bg-rose-50 group-hover:bg-rose-100 shadow">
                <Icon />
              </span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
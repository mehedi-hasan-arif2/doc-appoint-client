import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  const socialIcons = [
    { icon: <FaFacebook />, link: "#" },
    { icon: <FaTwitter />, link: "#" },
    { icon: <FaInstagram />, link: "#" },
    { icon: <FaLinkedin />, link: "#" },
    { icon: <FaGithub />, link: "#" },
  ];

  return (
    <footer className="nav-bg-gradient nav-border-gradient pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="logo" width={32} height={32} />
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              DocAppoint
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Book trusted doctors near you, manage appointments, and take charge of your health.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4 md:ml-12">
          <h3 className="font-bold text-[var(--nav-text)] mb-1">Quick Links</h3>
          <Link href="/" className="text-gray-400 hover:text-indigo-400 transition-colors">Home</Link>
          <Link href="/appointments" className="text-gray-400 hover:text-indigo-400 transition-colors">All Appointments</Link>
          <Link href="/dashboard" className="text-gray-400 hover:text-indigo-400 transition-colors">Dashboard</Link>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[var(--nav-text)] mb-1">Follow Us</h3>
          <div className="flex gap-5 text-gray-400 text-xl">
            {socialIcons.map((item, index) => (
              <Link key={index} href={item.link} className="hover:text-indigo-400 transition-all hover:-translate-y-1">
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Seperator Line */}
      <div className="max-w-7xl mx-auto px-6 mt-12 mb-8 border-t border-white/10"></div>
      
      <div className="text-center text-gray-500 text-xs">
        © 2026 DocAppoint. All rights reserved.
      </div>
    </footer>
  );
}
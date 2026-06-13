import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="nav-bg-gradient nav-border-gradient pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/images/logo.png" 
              alt="logo" 
              width={32} 
              height={32} 
              style={{ width: "auto", height: "auto" }}
            />
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              DocAppoint
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Book trusted doctors near you, manage appointments, and take charge of your health.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:ml-12">
          <h3 className="font-bold text-[var(--nav-text)] mb-1">Quick Links</h3>
          <Link href="/" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Home</Link>
          <Link href="/appointments" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">All Appointments</Link>
          <Link href="/dashboard/my-bookings" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Dashboard</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[var(--nav-text)] mb-1">Follow Us</h3>
          <div className="flex gap-5 text-gray-400 text-xl items-center">
            <Link href="#" className="hover:text-indigo-400 transition-all hover:-translate-y-1">
              <FaFacebook />
            </Link>
            
            <Link href="#" className="hover:text-indigo-400 transition-all hover:-translate-y-1 w-4 h-4 flex items-center">
              <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>

            <Link href="#" className="hover:text-indigo-400 transition-all hover:-translate-y-1">
              <FaInstagram />
            </Link>
            <Link href="#" className="hover:text-indigo-400 transition-all hover:-translate-y-1">
              <FaLinkedin />
            </Link>
            <Link href="#" className="hover:text-indigo-400 transition-all hover:-translate-y-1">
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 mb-8 border-t border-white/10"></div>
      
      <div className="text-center text-gray-500 text-xs">
        © 2026 DocAppoint. All rights reserved.
      </div>
    </footer>
  );
}
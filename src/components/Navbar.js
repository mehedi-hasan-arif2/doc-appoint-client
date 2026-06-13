"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation"; 
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); 
  const router = useRouter();
  
  // Better Auth live session 
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Appointment", path: "/appointments" },
    { name: "Dashboard", path: "/dashboard/my-bookings" }
  ];

  return (
    <nav className="nav-bg-gradient nav-border-gradient sticky top-0 z-50 shadow-md bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo name */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/images/logo.png" 
            alt="logo" 
            width={32} 
            height={32} 
            style={{ width: "auto", height: "auto" }}
          />
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
            DocAppoint
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`relative font-semibold text-sm transition-colors ${
                pathname === item.path || (pathname.startsWith(item.path) && item.path !== "/")
                  ? "text-indigo-400"
                  : "text-slate-400 hover:text-indigo-400"
              }`}
            >
              {item.name}
              {(pathname === item.path || (pathname.startsWith(item.path) && item.path !== "/")) && (
                <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-indigo-400 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Authentication Right Panel */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <span className="text-xs text-slate-400 animate-pulse">Loading...</span>
            ) : !user ? (
              <>
                <Link href="/login" className="text-sm font-semibold text-slate-400 hover:text-indigo-400 transition-colors">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/dashboard/my-profile" className="flex items-center gap-2 group border border-slate-800 p-1 pr-3 rounded-full hover:bg-slate-900 transition-all">
                  <img 
                    src={user?.image || "/images/user.png"} 
                    alt="user" 
                    className="w-8 h-8 rounded-full object-cover border border-indigo-400 shadow-sm" 
                  />
                  <span className="text-xs font-bold text-slate-300 group-hover:text-indigo-400 transition-colors">
                    {user.name}
                  </span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button className="md:hidden text-slate-400 hover:text-indigo-400 p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-5 bg-slate-900 border-b border-slate-800 shadow-inner">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className={`text-base font-semibold ${
                pathname === item.path ? "text-indigo-400" : "text-slate-400"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <hr className="border-slate-800" />
          {!user ? (
            <div className="flex flex-col gap-2.5">
              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-slate-400 font-semibold py-2 text-center text-sm">
                Login
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="bg-indigo-600 text-white px-4 py-2.5 rounded-full text-center text-sm font-semibold">
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between py-2 border-t border-slate-800 pt-4">
              <Link href="/dashboard/my-profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                <img src={user?.image || "/images/user.png"} className="w-8 h-8 rounded-full object-cover border border-indigo-400" />
                <span className="text-sm font-bold text-slate-300">{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Active link এর জন্য এটা লাগবেই
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname(); // কারেন্ট পাথ ট্র্যাক করার জন্য

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);

    const loggedUser = localStorage.getItem("user");
    if (loggedUser) setUser(JSON.parse(loggedUser));
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Appointments", path: "/appointments" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="nav-bg-gradient nav-border-gradient sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="logo" width={32} height={32} />
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            DocAppoint
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`relative font-medium text-sm transition-colors ${
                pathname === item.path ? "text-indigo-400" : "text-[var(--nav-text)]"
              }`}
            >
              {item.name}
              {/* Active link underline */}
              {pathname === item.path && (
                <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-indigo-400"></span>
              )}
              {/* Normal hover underline */}
              {pathname !== item.path && (
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link href="/login" className="text-sm text-[var(--nav-text)]">Login</Link>
                <Link
                  href="/register"
                  className="bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white px-4 py-2 rounded-full text-sm"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Image src={user?.photo || "/images/user.png"} width={32} height={32} className="rounded-full" />
                <button className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">Logout</button>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 bg-[var(--nav-bg)] backdrop-blur-xl">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className={`text-base font-medium ${
                pathname === item.path ? "text-indigo-400" : "text-[var(--nav-text)]"
              }`}
            >
              {item.name}
            </Link>
          ))}
          {!user ? (
            <>
              <Link href="/login" className="text-[var(--nav-text)]">Login</Link>
              <Link href="/register" className="bg-[var(--btn-primary)] text-white px-4 py-2 rounded-full text-center">Register</Link>
            </>
          ) : (
            <button className="bg-red-500 text-white px-4 py-2 rounded-full">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
}
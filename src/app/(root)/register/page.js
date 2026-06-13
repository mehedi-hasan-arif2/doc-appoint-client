"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Phone, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    password: "",
    photoURL: "" 
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.name.trim().length < 3) {
      toast.error("Registration failed: Name too short!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Registration failed: Invalid email!");
      return;
    }

    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Registration failed: Invalid phone number!");
      return;
    }

    const passwordValue = formData.password;
    if (passwordValue.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
    if (!/[A-Z]/.test(passwordValue)) {
      toast.error("Password must contain at least one uppercase letter!");
      return;
    }
    if (!/[a-z]/.test(passwordValue)) {
      toast.error("Password must contain at least one lowercase letter!");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.photoURL.trim() || "/images/user.png",
        data: {
          phone: formData.phone
        }
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
      } else {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err) {
      toast.error("Something went wrong during registration!");
    } finally {
      setLoading(false);
    }
  };

  // Social Signup Option 
  const handleGoogleSignup = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/"
      });
    } catch (error) {
      console.error(error);
      toast.error("Google signup failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-900 border border-white/5 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-white">Register</h2>
          <p className="text-xs text-slate-400 mt-1 font-semibold">Join DocAppoint Medical Portal</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Full Name</label>
            <div className="relative">
              <User size={14} className="absolute left-4 top-3.5 text-slate-500" />
              <input type="text" name="name" required placeholder="John Doe" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-all font-semibold" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-4 top-3.5 text-slate-500" />
              <input type="email" name="email" required placeholder="johndoe@gmail.com" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-all font-semibold" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Photo URL</label>
            <div className="relative">
              <ImageIcon size={14} className="absolute left-4 top-3.5 text-slate-500" />
              <input type="url" name="photoURL" placeholder="https://example.com/photo.jpg" value={formData.photoURL} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-all font-semibold" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone Number</label>
            <div className="relative">
              <Phone size={14} className="absolute left-4 top-3.5 text-slate-500" />
              <input type="tel" name="phone" required placeholder="017XXXXXXXX" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-all font-semibold" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-4 top-3.5 text-slate-500" />
              <input type="password" name="password" required placeholder="••••••••" value={formData.password} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-all font-semibold" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black tracking-wider uppercase py-3.5 rounded-xl transition-all shadow-md disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="relative flex py-2 items-center text-slate-800">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">Or Register Via</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <button 
          type="button" 
          onClick={handleGoogleSignup} 
          className="w-full bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-300 text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 7.12 8.77 5.04 12 5.04z"/>
            <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.45h6.45c-.28 1.48-1.12 2.73-2.38 3.58l3.68 2.85c2.14-1.98 3.75-4.9 3.75-8.53z"/>
            <path fill="#FBBC05" d="M5.1 14.7c-.23-.68-.35-1.4-.35-2.15s.12-1.47.35-2.15L1.5 7.6C.54 9.5 0 11.7 0 14s.54 4.5 1.5 6.4l3.6-2.7z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.68-2.85c-1.1.74-2.52 1.18-4.28 1.18-3.23 0-6-2.08-6.98-5.25l-3.6 2.8C3.4 20.35 7.35 23 12 23z"/>
          </svg>
          SignUp with Google
        </button>

        <p className="text-center text-xs text-slate-400 font-semibold">
          Already have an account? <Link href="/login" className="text-indigo-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
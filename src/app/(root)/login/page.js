"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const callbackURL = searchParams.get("callbackURL") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn.email({
        email,
        password,
        callbackURL: callbackURL
      });

      if (error) {
        toast.error(error.message || "Invalid email or password!");
      } else {
        toast.success("Logged in successfully!");
        router.push(callbackURL);
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong during login!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: callbackURL
      });
    } catch (error) {
      console.error(error);
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center px-4 relative">
      <div className="max-w-md w-full bg-slate-900 border border-white/5 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-white">Login</h2>
          <p className="text-xs text-slate-400 mt-1 font-semibold">Access your medical workspace dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-4 top-3.5 text-slate-500" />
              <input 
                type="email" 
                required 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-all font-semibold" 
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Password</label>
              {/* Forgot Password text/link displayed */}
              <span className="text-[10px] text-indigo-400 hover:underline cursor-pointer font-bold">Forgot Password?</span>
            </div>
            <div className="relative">
              <Lock size={14} className="absolute left-4 top-3.5 text-slate-500" />
              <input 
                type="password" 
                required 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-all font-semibold" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black tracking-wider uppercase py-3.5 rounded-xl transition-all shadow-md disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="relative flex py-2 items-center text-slate-800">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">Or Connect Via</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <button 
          type="button" 
          onClick={handleGoogleLogin} 
          className="w-full bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-300 text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 7.12 8.77 5.04 12 5.04z"/>
            <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.45h6.45c-.28 1.48-1.12 2.73-2.38 3.58l3.68 2.85c2.14-1.98 3.75-4.9 3.75-8.53z"/>
            <path fill="#FBBC05" d="M5.1 14.7c-.23-.68-.35-1.4-.35-2.15s.12-1.47.35-2.15L1.5 7.6C.54 9.5 0 11.7 0 14s.54 4.5 1.5 6.4l3.6-2.7z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.68-2.85c-1.1.74-2.52 1.18-4.28 1.18-3.23 0-6-2.08-6.98-5.25l-3.6 2.8C3.4 20.35 7.35 23 12 23z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-xs text-slate-400 font-semibold">
          Don’t have an account? <Link href="/register" className="text-indigo-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
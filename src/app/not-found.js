"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto animate-bounce">
          <AlertCircle size={32} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-white tracking-tight">404 Error</h1>
          <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-widest">Clinical Route Missing</h2>
        </div>
        
        <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed font-medium">
          The requested medical page node or dashboard directory is either moved, deleted or currently unauthorized.
        </p>
        
        <div className="pt-2">
          <Link 
            href="/" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-lg hover:scale-105 inline-block"
          >
            Back To Home Terminal
          </Link>
        </div>
      </div>
    </div>
  );
}
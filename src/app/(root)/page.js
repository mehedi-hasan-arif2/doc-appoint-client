"use client";

import { useState, useEffect } from "react";
import HeroBanner from "@/components/HeroBanner";
import DoctorCard from "@/components/DoctorCard";
import { Loader2, ShieldCheck, Zap, Heart, Sparkles, Quote, Star } from "lucide-react";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "https://doc-appoint-server-62ny.onrender.com";

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${SERVER_URL}/doctors`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            // Slice to get only the top 3 doctors for the home page showcase
            setDoctors(data.slice(0, 3));
          }
        }
      } catch (error) {
        console.error("Error fetching doctors from database:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="w-full pb-28 space-y-28 overflow-hidden">
      <HeroBanner />

      {/* Top Rated Doctors Section */}
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl dynamic-heading">
            Our Top Rated Doctors
          </h2>
          <p className="text-sm dynamic-muted-text max-w-md mx-auto">
            Consult with highly qualified medical practitioners recognized for clinical excellence.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="animate-spin text-indigo-500" size={36} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>

      {/* Advantage Features Grid */}
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl dynamic-heading">
            The DocAppoint Advantage
          </h2>
          <p className="text-sm dynamic-muted-text max-w-md mx-auto">
            Experience next-generation clinical workflows engineered for premium patient comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
          
          <div className="md:col-span-2 dynamic-card rounded-3xl p-8 flex flex-col justify-between group hover:border-indigo-500/30 transition-all duration-300 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="p-4 bg-teal-500/10 rounded-2xl border border-teal-500/20 text-teal-500 group-hover:scale-105 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <span className="text-[10px] font-black tracking-widest text-teal-500 uppercase bg-teal-500/10 px-2.5 py-1 rounded-md">Verified Matrix</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black dynamic-heading">Strict Medical Credentials</h3>
              <p className="text-xs dynamic-muted-text leading-relaxed max-w-xl">
                We independently review licensing, medical board certifications, and historical success rates. Your health is managed only by tier-one certified clinicians and practitioners.
              </p>
            </div>
          </div>

          <div className="dynamic-card rounded-3xl p-6 flex flex-col justify-between group hover:border-indigo-500/30 transition-all duration-300 shadow-xl">
            <div className="p-3.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400 w-max group-hover:rotate-6 transition-transform">
              <Zap size={24} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-black dynamic-heading">Five-Second Checkouts</h3>
              <p className="text-xs dynamic-muted-text leading-relaxed">
                No complex forms, no hold times. Lock down your appointment with an instantaneous data-receipt architecture.
              </p>
            </div>
          </div>

          <div className="dynamic-card rounded-3xl p-6 flex flex-col justify-between group hover:border-indigo-500/30 transition-all duration-300 shadow-xl">
            <div className="p-3.5 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400 w-max group-hover:scale-105 transition-transform">
              <Heart size={24} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-black dynamic-heading">Elite Clinical Focus</h3>
              <p className="text-xs dynamic-muted-text leading-relaxed">
                Enjoy complete transparency with consulting fees, instant cancellation pipelines, and automated shift mapping.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 dynamic-card rounded-3xl p-8 flex flex-col justify-between group hover:border-indigo-500/30 transition-all duration-300 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-400 group-hover:translate-x-0.5 transition-transform">
                <Sparkles size={28} />
              </div>
              <div className="flex -space-x-1.5">
                <div className="w-7 h-7 rounded-full bg-indigo-600 border border-slate-400 flex items-center justify-center text-[10px] font-bold text-white">M</div>
                <div className="w-7 h-7 rounded-full bg-teal-600 border border-slate-400 flex items-center justify-center text-[10px] font-bold text-white">R</div>
                <div className="w-7 h-7 rounded-full bg-amber-600 border border-slate-400 flex items-center justify-center text-[10px] font-bold text-white">+</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black dynamic-heading">Global Scaled Network</h3>
              <p className="text-xs dynamic-muted-text leading-relaxed max-w-xl">
                Become a member of a modern wellness ecosystem. Managing bookings, historical treatment dates, and doctor interactions has been simplified into one fluid control center.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl dynamic-heading">
            Verified Experiences
          </h2>
          <p className="text-sm dynamic-muted-text max-w-md mx-auto">
            True case insights and system ratings from registered platform members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { quote: "The scheduling system is incredibly intuitive. I found an specialist and booked a preferred time slot in less than a minute.", author: "Tahmid Rahman", rating: 5 },
            { quote: "Absolute transparency with the medical fees. The dashboard updates live, preventing any administrative confusion.", author: "Farzana Yasmin", rating: 5 },
            { quote: "Incredibly fast load speeds, clean interface structure, and flawless dark theme optimization. Highly satisfied with the UI.", author: "Zayan Khan", rating: 4 },
            { quote: "Managing my family appointments has never been this stress-free. The update and delete triggers react instantly without reload.", author: "Anika Tasnim", rating: 5 },
            { quote: "Every single detail on the card matched perfectly with the clinic records. Extremely reliable database architecture.", author: "Asif Elahi", rating: 5 },
            { quote: "The secure authentication flow gives me complete trust regarding my historical private record storage.", author: "Nabila Chowdury", rating: 5 }
          ].map((item, i) => (
            <div 
              key={i} 
              className="dynamic-card backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-2xl flex flex-col justify-between h-56 relative group hover:-translate-y-2 hover:border-indigo-500/30 transition-all duration-500"
            >
              <Quote size={28} className="absolute top-6 right-6 text-indigo-500/10 group-hover:text-indigo-500/20 group-hover:rotate-12 transition-all duration-500" />
              
              <div className="flex gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star 
                    key={idx} 
                    size={12} 
                    className={`${idx < item.rating ? "text-amber-400 fill-amber-400" : "star-inactive"}`} 
                  />
                ))}
              </div>

              <p className="text-xs font-medium leading-relaxed italic pr-4 dynamic-muted-text">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-2.5 pt-3 border-t border-slate-700/50 mt-2">
                <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-black tracking-wide uppercase dynamic-heading">{item.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
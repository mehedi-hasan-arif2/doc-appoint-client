"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Clock, MapPin, Building, GraduationCap, ChevronRight, X } from "lucide-react";

export default function DoctorCard({ doctor }) {
  const [showToast, setShowToast] = useState(false);

  const handleViewDetails = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000); 
  };

  return (
    <div className="dynamic-card rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full group relative">
      
      {/* CUSTOM TOAST */}
      {showToast && (
        <div className="absolute top-4 left-4 right-4 z-50 bg-slate-900 text-white text-xs font-bold p-3 rounded-xl border border-white/10 shadow-2xl flex items-center justify-between animate-bounce">
          <span>Routing to Dr. {doctor.name}'s details page... (Dynamic Route Linking Next)</span>
          <button onClick={() => setShowToast(false)} className="text-slate-400 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Image Block */}
      <div className="relative w-full h-60 bg-slate-50 dark:bg-slate-950 overflow-hidden border-b border-slate-100 dark:border-white/5 flex items-center justify-center p-2">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="max-w-full max-h-full object-contain group-hover:scale-102 transition-transform duration-500"
        />
        {/* Floating Category Tag */}
        <div className="absolute bottom-4 left-4 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
          {doctor.specialty}
        </div>
        {/* Rating Tag */}
        <div className="absolute top-4 right-4 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-white">{doctor.rating || "4.9"}</span>
        </div>
      </div>

      {/* Details Block */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-5 text-left">
        <div className="space-y-4">
          
          {/* Name & Exp */}
          <div className="space-y-1">
            <h3 className="text-xl font-black tracking-tight dynamic-heading group-hover:text-indigo-500 transition-colors duration-300">
              {doctor.name}
            </h3>
            <div className="flex items-center gap-1 dynamic-muted-text text-xs font-semibold uppercase tracking-wider">
              <GraduationCap size={14} className="text-indigo-400" />
              <span>{doctor.experience} Experience</span>
            </div>
          </div>

          {/* Description Snippet */}
          <p className="text-xs dynamic-muted-text line-clamp-2 leading-relaxed">
            {doctor.description}
          </p>

          {/* Structured Info Row */}
          <div className="space-y-2 text-xs font-medium dynamic-muted-text border-t border-slate-100 dark:border-white/5 pt-4">
            <div className="flex items-center gap-2">
              <Building size={14} className="text-indigo-400 flex-shrink-0" />
              <span className="truncate">{doctor.hospital}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-teal-500 flex-shrink-0" />
              <span>{doctor.location}</span>
            </div>
          </div>

          {/* Availability Shifts */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold dynamic-muted-text uppercase tracking-wider block">Available Shifts:</span>
            <div className="flex flex-wrap gap-1.5">
              {doctor.availability?.map((time, idx) => (
                <span 
                  key={idx} 
                  className="inline-flex items-center gap-1 border border-slate-200 dark:border-white/5 px-2 py-1 rounded-md text-[10px] font-bold dynamic-heading shadow-sm"
                  style={{ backgroundColor: 'var(--bg-body)' }}
                >
                  <Clock size={10} className="text-indigo-500" />
                  {time}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Pricing & Button Block */}
        <div className="border-t border-slate-100 dark:border-white/5 pt-4 flex items-center justify-between gap-4 mt-auto">
          <div>
            <span className="text-[10px] font-bold dynamic-muted-text uppercase tracking-wider block">Consultation</span>
            <span className="text-lg font-black text-emerald-500 dark:text-emerald-400">৳{doctor.fee}</span>
          </div>
          
          {/* Linked Button with Toast and Dynamic Navigation */}
          <Link 
            href={`/doctors/${doctor.id}`}
            onClick={handleViewDetails}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all duration-300 cursor-pointer shadow-md active:scale-95 hover:scale-105 hover:shadow-indigo-500/30"
          >
            <span>View Details</span>
            <ChevronRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

      </div>
    </div>
  );
}
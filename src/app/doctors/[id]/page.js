"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import doctorsData from "@/data/doctorsData.json";
import { Star, Clock, MapPin, Building, GraduationCap, ArrowLeft, Calendar, User, Phone, FileText } from "lucide-react";
import Link from "next/link";

export default function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Future-proof dynamic user state
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    patientName: "",
    gender: "Male",
    phone: "",
    date: "",
    timeSlot: "",
    reason: ""
  });

  useEffect(() => {
    if (id) {
      const foundDoctor = doctorsData.find((doc) => doc.id === id || doc.id === parseInt(id));
      setDoctor(foundDoctor);
    }

    // Dynamic Auth Tracker: Automatically reads real user session when login system is added later
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser") || null);
    setCurrentUser(storedUser);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.phone || !formData.date || !formData.timeSlot) {
      alert("Please fill in all required fields!");
      return;
    }

    const currentBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    
    // Fallback email handles both unauthenticated state and future auth state dynamically
    const finalUserEmail = currentUser?.email || "guest_session_active@gmail.com";

    const newBooking = {
      bookingId: Date.now(),
      userEmail: finalUserEmail,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      hospital: doctor.hospital,
      fee: doctor.fee,
      ...formData
    };

    localStorage.setItem("bookings", JSON.stringify([...currentBookings, newBooking]));
    setIsModalOpen(false);
    setBookingSuccess(true);
    
    setFormData({
      patientName: "",
      gender: "Male",
      phone: "",
      date: "",
      timeSlot: "",
      reason: ""
    });
  };

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-body)]">
        <p className="text-lg font-bold dynamic-heading animate-pulse">Loading Doctor Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-body)] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-500 hover:underline mb-8">
          <ArrowLeft size={16} /> Back to Directory
        </Link>

        {/* Success Alert Banner */}
        {bookingSuccess && (
          <div className="mb-6 p-4 bg-emerald-500 text-white rounded-2xl text-xs font-bold shadow-lg flex justify-between items-center animate-fade-in">
            <span>🎉 Appointment securely booked with Dr. {doctor.name}! Check your dashboard.</span>
            <button onClick={() => setBookingSuccess(false)} className="underline opacity-80 hover:opacity-100">Dismiss</button>
          </div>
        )}

        {/* Profile Card Layout */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-white/5 p-6 md:p-10 flex flex-col md:flex-row gap-8">
          
          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="w-24 h-24 rounded-2xl bg-slate-50 dark:bg-slate-950 p-2 border border-slate-100 dark:border-white/5 flex items-center justify-center">
                <img src={doctor.image} alt={doctor.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div>
                <span className="bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {doctor.specialty}
                </span>
                <h1 className="text-2xl md:text-3xl font-black dynamic-heading mt-2">{doctor.name}</h1>
                <p className="text-xs dynamic-muted-text font-semibold flex items-center gap-1 mt-1">
                  <GraduationCap size={14} className="text-indigo-500" /> {doctor.experience} Experience
                </p>
              </div>
            </div>

            <hr className="border-slate-100 dark:border-white/5" />

            <div className="space-y-3">
              <h3 className="text-sm font-bold dynamic-heading">About This Doctor</h3>
              <p className="text-xs dynamic-muted-text leading-relaxed text-justify">{doctor.description}</p>
            </div>

            {/* Availability Shifts */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-black uppercase tracking-wider dynamic-heading flex items-center gap-1.5">
                <Clock size={14} className="text-indigo-500" /> Availability Shifts
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.availability?.map((time, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-sm"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium dynamic-muted-text bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-white/[0.02] mt-4">
              <div className="flex items-center gap-2">
                <Building size={16} className="text-indigo-500" />
                <span>{doctor.hospital}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-teal-500" />
                <span>{doctor.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-amber-500 fill-amber-500" />
                <span className="dynamic-heading font-bold">{doctor.rating || "4.9"} / 5.0 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold text-sm">৳</span>
                <span className="dynamic-heading font-bold">Consultation Fee: ৳{doctor.fee} BDT</span>
              </div>
            </div>
          </div>

          {/* Booking Action Sidebar */}
          <div className="w-full md:w-80 bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-6 border border-slate-100 dark:border-white/5 flex flex-col justify-center items-center text-center space-y-4">
            <Calendar size={32} className="text-indigo-500" />
            <h3 className="text-sm font-black dynamic-heading">Ready to Schedule?</h3>
            <p className="text-[11px] dynamic-muted-text max-w-[200px]">Click below to open the official allocation portal and secure your booking window.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold tracking-wider uppercase py-3.5 rounded-xl transition-all duration-300 shadow-md active:scale-98"
            >
              Book Appointment
            </button>
          </div>

        </div>
      </div>

      {/* FORM MODAL WITH MATCHING WEBSITE IDENTITY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 w-full max-w-lg rounded-3xl p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="mb-6">
              <h2 className="text-lg font-black tracking-tight text-white">Book Appointment</h2>
              <p className="text-xs text-slate-400 mt-0.5">with {doctor.name}</p>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4 text-left">
              
              {/* Dynamic User Email Box */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">User Email</label>
                <input 
                  type="email" 
                  value={currentUser ? currentUser.email : "Please Login First"} 
                  disabled 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 font-semibold cursor-not-allowed outline-none select-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Doctor Name</label>
                <input 
                  type="text" 
                  value={doctor.name} 
                  disabled 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 font-medium cursor-not-allowed outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Patient Name *</label>
                <div className="relative">
                  <User size={14} className="absolute left-4 top-3.5 text-slate-500" />
                  <input 
                    type="text" 
                    name="patientName"
                    required
                    placeholder="Full name"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 font-semibold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Gender *</label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-semibold focus:border-indigo-500 outline-none cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone *</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-4 top-3.5 text-slate-500" />
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 font-semibold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date *</label>
                  <input 
                    type="date" 
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-semibold focus:border-indigo-500 outline-none cursor-pointer scheme-dark"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Time *</label>
                  <select 
                    name="timeSlot"
                    required
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-semibold focus:border-indigo-500 outline-none cursor-pointer"
                  >
                    <option value="">--:-- --</option>
                    {doctor.availability?.map((time, idx) => (
                      <option key={idx} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Reason (optional)</label>
                <div className="relative">
                  <FileText size={14} className="absolute left-4 top-3.5 text-slate-500" />
                  <textarea 
                    name="reason"
                    rows="2"
                    placeholder="Brief reason for visit"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 font-semibold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black tracking-wider uppercase py-3.5 rounded-xl transition-all duration-300 shadow-lg active:scale-98 mt-4"
              >
                Confirm Booking
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
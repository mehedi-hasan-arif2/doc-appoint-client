"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Star, Clock, MapPin, Building, GraduationCap, ArrowLeft, Calendar, User, Phone, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import axios from "axios";
import toast from "react-hot-toast";

export default function DoctorDetails() {
  const { id } = useParams();
  const router = useRouter();
  
  const { data: session, isPending: isAuthPending } = useSession();
  const user = session?.user;

  const [doctor, setDoctor] = useState(null);
  const [loadingDoctor, setLoadingDoctor] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    gender: "Male",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });

 const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "https://doc-appoint-server-62ny.onrender.com";

  // Fetch specific doctor data dynamically using Axios to prevent Next.js fetch caching issues
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (!id) return;
      try {
        setLoadingDoctor(true);
        const response = await axios.get(`${SERVER_URL}/doctors/${id}`);
        
        if (response.data) {
          setDoctor(response.data);
        } else {
          console.error("Doctor profile not found in database");
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoadingDoctor(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  // Enforce route protection and redirect unauthenticated sessions
  useEffect(() => {
    if (!isAuthPending && !user) {
      router.push("/login");
    }
  }, [user, isAuthPending, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit appointment data packet to backend API endpoint
  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.phone || !formData.appointmentDate || !formData.appointmentTime) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Invalid phone number! Must be an 11-digit Bangladeshi number.");
      return;
    }

    setIsSubmitting(true);

    const bookingData = {
      userEmail: user.email,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      fee: doctor.fee,
      patientName: formData.patientName.trim(),
      gender: formData.gender,
      phone: formData.phone.trim(),
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/api/appointments`, bookingData);
      
      if (response.status === 200 || response.status === 201) {
        setIsModalOpen(false);
        toast.success("Appointment booked successfully!");
        
        setFormData({
          patientName: "",
          gender: "Male",
          phone: "",
          appointmentDate: "",
          appointmentTime: "",
        });

        router.push("/dashboard/my-bookings");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed! Check your backend server route config.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 gap-3">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verifying Session Token...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-white/5 rounded-3xl p-8 text-center space-y-5 shadow-xl">
          <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto">
            <Lock size={22} />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-black text-white uppercase tracking-wider">Access Denied</h2>
            <p className="text-xs text-slate-400 font-semibold">Authentication session is missing</p>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            You must be logged into your profile to view clinical details and book appointments.
          </p>
          <div className="pt-2">
            <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md inline-block w-full">
              Go To Login Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loadingDoctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 gap-3">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loading Clinical Credentials...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Doctor Profile Not Found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/appointments" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:underline mb-8">
          <ArrowLeft size={16} /> Back to Directory
        </Link>

        <div className="bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-white/5 p-6 md:p-10 flex flex-col md:flex-row gap-8">
          
          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="w-24 h-24 rounded-2xl bg-slate-950 p-2 border border-white/5 flex items-center justify-center overflow-hidden">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover rounded-xl" />
              </div>
              <div>
                <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-indigo-500/20">
                  {doctor.specialty}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-white mt-2">{doctor.name}</h1>
                <p className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-1">
                  <GraduationCap size={14} className="text-indigo-400" /> {doctor.experience} Experience
                </p>
              </div>
            </div>

            <hr className="border-slate-800" />

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">About This Doctor</h3>
              <p className="text-xs text-slate-400 leading-relaxed text-justify">{doctor.description}</p>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <Clock size={14} className="text-indigo-400" /> Availability Shifts
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.availability?.map((time, idx) => (
                  <span key={idx} className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-400 shadow-sm">
                    {time}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-400 bg-slate-950/40 p-4 rounded-2xl border border-white/[0.02] mt-4">
              <div className="flex items-center gap-2"><Building size={16} className="text-indigo-400" /><span>{doctor.hospital}</span></div>
              <div className="flex items-center gap-2"><MapPin size={16} className="text-teal-400" /><span>{doctor.location}</span></div>
              <div className="flex items-center gap-2"><Star size={16} className="text-amber-500 fill-amber-500" /><span>{doctor.rating || "4.9"} / 5.0 Rating</span></div>
              <div className="flex items-center gap-2"><span className="text-emerald-400 font-bold text-sm">৳</span><span className="text-white font-bold">Consultation Fee: ৳{doctor.fee} BDT</span></div>
            </div>
          </div>

          <div className="w-full md:w-80 bg-slate-950/60 rounded-2xl p-6 border border-white/5 flex flex-col justify-center items-center text-center space-y-4">
            <Calendar size={32} className="text-indigo-400" />
            <h3 className="text-sm font-black text-white">Ready to Schedule?</h3>
            <p className="text-[11px] text-slate-400 max-w-[200px]">Click below to open the official allocation portal and secure your booking window.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold tracking-wider uppercase py-3.5 rounded-xl transition-all duration-300 shadow-md"
            >
              Book Appointment
            </button>
          </div>

        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 w-full max-w-lg rounded-3xl p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">✕</button>

            <div className="mb-6">
              <h2 className="text-lg font-black tracking-tight text-white">Book Appointment</h2>
              <p className="text-xs text-slate-400 mt-0.5">with {doctor.name}</p>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4 text-left">
              
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">User Email Address (Read-Only)</label>
                <input type="email" value={user.email} disabled className="w-full bg-slate-950/50 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-500 font-semibold cursor-not-allowed outline-none" />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Doctor Name (Read-Only)</label>
                <input type="text" value={doctor.name} disabled className="w-full bg-slate-950/50 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-500 font-medium cursor-not-allowed outline-none" />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Patient Name *</label>
                <div className="relative">
                  <User size={14} className="absolute left-4 top-3.5 text-slate-500" />
                  <input type="text" name="patientName" required placeholder="Full name" value={formData.patientName} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-indigo-500 outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Gender *</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-indigo-500 outline-none cursor-pointer">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone *</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-4 top-3.5 text-slate-500" />
                    <input type="tel" name="phone" required placeholder="01XXXXXXXXX" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-indigo-500 outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date *</label>
                  <input type="date" name="appointmentDate" required value={formData.appointmentDate} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-indigo-500 outline-none cursor-pointer scheme-dark" />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Time *</label>
                  <select name="appointmentTime" required value={formData.appointmentTime} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-indigo-500 outline-none cursor-pointer">
                    <option value="">--:-- --</option>
                    {doctor.availability?.map((time, idx) => (
                      <option key={idx} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black tracking-wider uppercase py-3.5 rounded-xl transition-all disabled:opacity-50 mt-4"
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
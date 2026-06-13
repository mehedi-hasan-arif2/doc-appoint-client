"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit3, Trash2, Calendar, Clock, Phone, User, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import axios from "axios";

export default function MyBookings() {
  const router = useRouter();
  const { data: session, isPending: isAuthPending } = useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "https://doc-appoint-server-62ny.onrender.com";

  //  Fetch authenticated user's appointment from MongoDB database
  useEffect(() => {
    if (isAuthPending) return;

    // for unauthenticated sessions
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchMyBookings = async () => {
      try {
        setIsLoadingData(true);
        const response = await axios.get(`${SERVER_URL}/api/appointments?email=${user.email}`);
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        toast.error("Could not load your bookings from database.");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchMyBookings();
  }, [user, isAuthPending, router]);

  // Perform deletion sequence on MongoDB 
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${SERVER_URL}/api/appointments/${id}`);
      
      if (response.status === 200 || response.data.deletedCount > 0) {
        // Hot-remove item from active state pool without reloading the DOM
        setBookings((prev) => prev.filter((item) => item._id !== id));
        toast.success("Appointment deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete the appointment!");
    }
  };

  const openUpdateModal = (booking) => {
    setEditingBooking({ ...booking });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setEditingBooking((prev) => ({ ...prev, [name]: value }));
  };

  //  Execute modification update handshake with backend system controller
  const saveUpdatedAppointment = async (e) => {
    e.preventDefault();

    if (editingBooking.patientName.trim().length < 3) {
      toast.error("Patient name must be at least 3 characters!");
      return;
    }

    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(editingBooking.phone)) {
      toast.error("Invalid phone! Must be an 11-digit Bangladeshi number.");
      return;
    }

    setUpdating(true);

    try {
      const response = await axios.put(
        `${SERVER_URL}/api/appointments/${editingBooking._id}`,
        {
          patientName: editingBooking.patientName.trim(),
          gender: editingBooking.gender,
          phone: editingBooking.phone.trim(),
          appointmentDate: editingBooking.appointmentDate,
          appointmentTime: editingBooking.appointmentTime,
        }
      );

      if (response.status === 200 || response.data.modifiedCount > 0) {
        // Sync layout state array dynamically without hard refresh operations
        setBookings((prev) =>
          prev.map((item) => (item._id === editingBooking._id ? { ...item, ...editingBooking } : item))
        );
        setIsUpdateModalOpen(false);
        toast.success("Appointment updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update the appointment!");
    } finally {
      setUpdating(false);
    }
  };

  // Display status loader screen during asynchronous verification requests
  if (isAuthPending || isLoadingData) {
    return (
      <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Loading configurations...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-black text-white uppercase tracking-tight">My Bookings</h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Manage your clinical scheduling slots configuration</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">No appointment configurations saved inside database</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((item) => (
              <div key={item._id} className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-4 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-black text-white">{item.doctorName}</h3>
                      <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mt-0.5">{item.specialty || "General Specialist"}</p>
                    </div>
                    <div className="bg-slate-950 px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-400 border border-slate-800">৳{item.fee || "800"} BDT</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-400 bg-slate-950/50 p-3 rounded-xl border border-slate-800/40">
                    <div className="flex items-center gap-1.5"><Calendar size={12} className="text-indigo-400" /> {item.appointmentDate}</div>
                    <div className="flex items-center gap-1.5"><Clock size={12} className="text-indigo-400" /> {item.appointmentTime}</div>
                    <div className="col-span-2 mt-1 border-t border-slate-900/60 pt-1.5 text-slate-300 flex items-center gap-1"><User size={12} className="text-indigo-400" /> Patient: {item.patientName} ({item.gender})</div>
                    <div className="col-span-2 text-slate-400 flex items-center gap-1"><Phone size={12} className="text-indigo-400" /> Phone: {item.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-800/60">
                  <button onClick={() => openUpdateModal(item)} className="flex-1 bg-slate-950 hover:bg-indigo-900/30 border border-slate-800 hover:border-indigo-900/50 text-indigo-400 text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5">
                    <Edit3 size={12} /> Update
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="bg-slate-950 hover:bg-red-950/40 border border-slate-800 hover:border-red-900/40 text-red-400 text-xs font-bold p-2.5 rounded-xl transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Synchronized Portal Control Modal Interface */}
      {isUpdateModalOpen && editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 w-full max-w-md rounded-3xl p-6 relative shadow-2xl">
            <h2 className="text-xs font-black text-white uppercase tracking-wider mb-4">Update Appointment Form</h2>
            <form onSubmit={saveUpdatedAppointment} className="space-y-4 text-left">
              
              {/* Critical data dependencies enforced as read-only slots */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Doctor Name (Read-Only)</label>
                <input type="text" value={editingBooking.doctorName} disabled className="w-full bg-slate-950/40 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-500 font-medium cursor-not-allowed outline-none" />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">User Email Address (Read-Only)</label>
                <input type="text" value={editingBooking.userEmail} disabled className="w-full bg-slate-950/40 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-500 font-medium cursor-not-allowed outline-none" />
              </div>

              {/* Editable information data payload inputs */}
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Patient Name *</label>
                <input type="text" name="patientName" required value={editingBooking.patientName} onChange={handleUpdateInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-semibold focus:border-indigo-500 outline-none transition-all" />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Gender *</label>
                <select name="gender" value={editingBooking.gender} onChange={handleUpdateInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-semibold focus:border-indigo-500 outline-none transition-all appearance-none">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Appointment Date *</label>
                  <input type="date" name="appointmentDate" required value={editingBooking.appointmentDate} onChange={handleUpdateInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-semibold focus:border-indigo-500 outline-none transition-all scheme-dark" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Phone Number *</label>
                  <input type="tel" name="phone" required value={editingBooking.phone} onChange={handleUpdateInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-semibold focus:border-indigo-500 outline-none transition-all" />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsUpdateModalOpen(false)} disabled={updating} className="flex-1 bg-slate-950 border border-slate-800 text-slate-400 text-xs font-bold py-3 rounded-xl disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={updating} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider py-3 rounded-xl disabled:opacity-50">
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
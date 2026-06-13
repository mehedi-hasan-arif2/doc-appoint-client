"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Search, MapPin, Star, Loader2 } from "lucide-react";

export default function Appointments() {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "https://doc-appoint-server-62ny.onrender.com";
 

  // Fetch doctors from the database via backend server
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        // Pass search query dynamically to the database endpoint
        const res = await fetch(`${SERVER_URL}/doctors?search=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setDoctors(data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [searchQuery]);

  const handleSearchTrigger = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue.trim());
  };

  const handleViewDetails = (id) => {
    if (session?.user) {
      // Redirect to specific doctor detail page if authenticated
      router.push(`/doctors/${id}`);
    } else {
      // Redirect to login page if session does not exist
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-white">Clinical Doctor Directory</h1>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Search and request appointments slots instantly</p>
        </div>

        {/* Dynamic Database Search Field Form */}
        <form onSubmit={handleSearchTrigger} className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-3.5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search doctors by name or specialty..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs rounded-2xl pl-12 pr-4 py-3.5 outline-none font-semibold focus:border-indigo-500 transition-all shadow-sm text-white"
            />
          </div>
          <button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 rounded-2xl transition-all shadow-md"
          >
            Search
          </button>
        </form>

        {/* Directory Data Grid Layout */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-indigo-500" size={36} />
          </div>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-slate-900 border border-white/5 p-5 rounded-3xl shadow-md flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-all group">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-slate-950 border border-white/5 rounded-2xl p-1.5 flex items-center justify-center overflow-hidden">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div>
                    <span className="bg-indigo-500/10 text-indigo-400 text-[9px] font-black uppercase px-2 py-0.5 rounded-md border border-indigo-500/20">{doctor.specialty}</span>
                    <h3 className="font-bold text-sm mt-1 text-white group-hover:text-indigo-500 transition-colors">{doctor.name}</h3>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5"><MapPin size={12} /> {doctor.location}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-[11px] font-bold text-slate-400">
                  <span className="flex items-center gap-1"><Star size={12} className="text-amber-500 fill-amber-500" /> {doctor.rating || "4.9"}</span>
                  <span className="text-white">৳{doctor.fee} BDT</span>
                </div>

                {/* Navigation Button Action Trigger */}
                <button 
                  onClick={() => handleViewDetails(doctor.id)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-center text-xs font-bold py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-sm font-bold text-slate-500">No doctors found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
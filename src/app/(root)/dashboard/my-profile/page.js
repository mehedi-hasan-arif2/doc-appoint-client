"use client";

import { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession, authClient } from "@/lib/auth-client";

export default function MyProfile() {
  // Better Auth 
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", photoURL: "" });
  const [updating, setUpdating] = useState(false);

  // session to data transfer
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        photoURL: user.image || "",
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
  
    if (editForm.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long!");
      return;
    }

    setUpdating(true);

    try {
      // Better Auth update user method
      const { error } = await authClient.updateUser({
        name: editForm.name.trim(),
        image: editForm.photoURL.trim(),
      });

      if (error) {
        toast.error(error.message || "Failed to update profile!");
      } else {
        toast.success("Profile updated successfully!");
        setIsModalOpen(false);
        
        window.location.reload(); 
      }
    } catch (err) {
      toast.error("Something went wrong while updating profile!");
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center">
        <p className="text-center text-xs font-bold text-slate-400 animate-pulse">Loading profile data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center p-4">
        <p className="text-center text-xs font-bold text-red-400 bg-red-950/20 border border-red-900/30 px-6 py-4 rounded-2xl">
          No active login session detected! Please login first.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-slate-900 border border-white/5 rounded-3xl p-6 text-center space-y-6 relative shadow-xl">
        
        {/* Profile Image and Info */}
        <div className="space-y-3">
          <img 
            src={user.image || "/images/user.png"} 
            alt="User Profile" 
            className="w-24 h-24 rounded-2xl object-cover mx-auto border-2 border-indigo-500/40 p-1.5 bg-slate-950" 
          />
          <div>
            <h2 className="text-base font-black text-white">{user.name}</h2>
            <p className="text-xs text-indigo-400 font-semibold mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Edit Modal Button */}
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="w-full bg-slate-950 hover:bg-indigo-900/20 border border-slate-800 hover:border-indigo-500/30 text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-1.5"
        >
          <Edit2 size={12} /> Update Profile
        </button>

      </div>

      {/* Modal Window */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 w-full max-w-xs rounded-3xl p-5 relative shadow-2xl">
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-4">Update Profile Fields</h3>
            
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Name</label>
                <input 
                  type="text" 
                  value={editForm.name} 
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} 
                  required 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-semibold outline-none focus:border-indigo-500" 
                />
              </div>
              
              <div className="text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Photo (URL)</label>
                <input 
                  type="url" 
                  value={editForm.photoURL} 
                  onChange={(e) => setEditForm({ ...editForm, photoURL: e.target.value })} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-semibold outline-none focus:border-indigo-500" 
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  disabled={updating}
                  className="flex-1 bg-slate-950 border border-slate-800 text-slate-400 text-xs font-bold py-2.5 rounded-xl disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={updating}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase py-2.5 rounded-xl disabled:opacity-50"
                >
                  {updating ? "Saving..." : "On Submit"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { Star, Search, CalendarCheck, ShieldCheck, Users, CheckCircle2 } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function HeroBanner() {
  const slides = [
    {
      image: "/images/Banner-1.jpg",
      badge: "Verified Medical Excellence",
      title: "Your Health Journey, Guided by Trusted Experts",
      desc: "Connect with certified and top-rated doctors in your area. Book physical or digital consultations seamlessly with instant smart confirmation.",
    },
    {
      image: "/images/Banner-2.avif",
      badge: "24/7 Clinical Care Access",
      title: "Skip the Waiting Room, Consult Elite Specialists",
      desc: "Experience modern healthcare tailored to your schedule. Access premier clinical advice and personalized medical support anytime.",
    },
    {
      image: "/images/Banner-3.jpg",
      badge: "Advanced Healthcare Intelligence",
      title: "Precision Patient Care with Modern Solutions",
      desc: "Take proactive charge of your family's well-being. Navigate through highly experienced specialists and personalized treatment plans.",
    },
  ];

  return (
    <div className="w-full relative h-[85vh] sm:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect={"fade"}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full flex items-center">
              {/* Background Image with Overlays */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt="Healthcare Center"
                fill
                priority={index === 0}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-slate-950/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
            </div>

            {/* Content Centered Layout */}
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
              <div className="max-w-3xl w-full z-10 slide-in">
                
                {/* Glassmorphism Container */}
                <div className="w-full p-6 sm:p-10 rounded-3xl bg-slate-900/60 dark:bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl space-y-6 text-center">
                  
                  {/* Verified Badge */}
                  <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-400/30 px-4 py-1.5 rounded-full mx-auto">
                    <ShieldCheck size={14} className="text-indigo-400" />
                    <span className="text-[10px] sm:text-[11px] font-bold text-indigo-300 uppercase tracking-widest">
                      {slide.badge}
                    </span>
                  </div>

                  {/* Title & Description Box */}
                  <div className="space-y-3">
                    <h1 className="text-2xl sm:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                      {slide.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed opacity-95">
                      {slide.desc}
                    </p>
                  </div>

                  {/*  Dual Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
                    <Link href="/appointments">
                      <button className="flex items-center gap-2 bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-indigo-600/20 transform hover:-translate-y-0.5 cursor-pointer">
                        <Search size={15} />
                        Browse Doctors
                      </button>
                    </Link>

                    <Link href="/dashboard/my-bookings">
                      <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full text-xs sm:text-sm border border-white/10 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                        <CalendarCheck size={15} className="text-slate-300" />
                        My Bookings
                      </button>
                    </Link>
                  </div>

                  {/*  Minimalistic Stats Block */}
                  <div className="border-t border-white/10 pt-5">
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 text-white text-center">
                      
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                        <Users size={15} className="text-indigo-400" />
                        <div>
                          <span className="text-sm sm:text-lg font-extrabold block sm:inline">500+</span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block sm:ml-1">Doctors</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 border-x border-white/10 px-1">
                        <Star size={15} className="text-amber-400 fill-amber-400" />
                        <div>
                          <span className="text-sm sm:text-lg font-extrabold block sm:inline">4.9/5</span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block sm:ml-1">Rating</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                        <CheckCircle2 size={15} className="text-indigo-400" />
                        <div>
                          <span className="text-sm sm:text-lg font-extrabold block sm:inline">50k+</span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block sm:ml-1">Success</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
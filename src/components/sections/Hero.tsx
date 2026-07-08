"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import AnimatedCounter from "../AnimatedCounter";

const servicePills = [
  { label: "AI & ML", href: "#services" },
  { label: "Web Development", href: "#services" },
  { label: "Digital Marketing", href: "#services" },
  { label: "Mobile Apps", href: "#services" },
  { label: "Vibe Coding", href: "#generator", isNew: true },
];

const trustLogos = [
  "Google", "Meta", "Amazon", "Microsoft", "Adobe", "Stripe",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden section-dark pt-20 sm:pt-24 px-4"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#4ECDC4] opacity-10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#8b5cf6] opacity-10 blur-[120px]" />

      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block"
          style={{
            left: `${15 + (i * 9) % 70}%`,
            top: `${10 + (i * 13) % 80}%`,
          }}
          animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" className="opacity-30">
            <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#4ECDC4" />
          </svg>
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center max-w-5xl mx-auto w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass mb-6 sm:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-xs sm:text-sm font-medium text-white/80">
            AI-Powered Digital Solutions · 24/7 Global
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="r-heading-lg font-black tracking-tight mb-4 sm:mb-6 text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          10x Your Growth
          <br />
          With <span className="text-gradient">ParulSoftTechAI</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="r-text max-w-xl mx-auto mb-8 text-white/60 px-2"
        >
          Your one-stop creative-tech agency for AI, web, mobile, cloud, AR/VR, and blockchain solutions.
          Strategy + tech + automation = measurable revenue growth.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-lg mx-auto mb-6 px-2 sm:px-0"
        >
          <div className="relative flex items-center bg-white rounded-xl sm:rounded-2xl shadow-2xl">
            <Search className="absolute left-3 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-10 sm:pl-12 pr-24 sm:pr-28 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm text-gray-900 outline-none bg-transparent min-w-0"
            />
            <a
              href="#services"
              className="absolute right-1.5 sm:right-2 btn-primary text-xs sm:text-sm py-2 px-3 sm:px-5 whitespace-nowrap"
            >
              Search
            </a>
          </div>
        </motion.div>

        {/* Service Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 px-2"
        >
          {servicePills.map((pill) => (
            <a key={pill.label} href={pill.href} className="service-pill">
              {pill.label}
              {pill.isNew && <span className="badge-new">NEW</span>}
            </a>
          ))}
          <a
            href="#services"
            className="text-xs sm:text-sm font-semibold text-white/80 hover:text-[#4ECDC4] transition-colors flex items-center gap-1 ml-1"
          >
            More <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4ECDC4]" />
          </a>
        </motion.div>

        {/* Trust Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-10 opacity-60"
        >
          {trustLogos.map((logo) => (
            <span key={logo} className="text-sm sm:text-lg md:text-xl font-bold text-white/50">
              {logo}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 max-w-3xl mx-auto"
        >
          {[
            { label: "Projects Delivered", value: 250, suffix: "+" },
            { label: "Enterprise Clients", value: 85, suffix: "+" },
            { label: "Avg. ROI Growth", value: 340, suffix: "%" },
            { label: "Global Reach", value: 30, suffix: "+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] sm:text-xs text-white/50 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#4ECDC4]"
          />
        </div>
      </motion.div>
    </section>
  );
}

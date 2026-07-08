"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";

const footerSections = [
  {
    title: "Browse",
    links: [
      { label: "Work", href: "/#work" },
      { label: "Services", href: "/#services" },
      { label: "Partners", href: "/#partners" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "AI Services", href: "/#services" },
      { label: "Web Development", href: "/#services" },
      { label: "Mobile Apps", href: "/#services" },
      { label: "UI/UX Design", href: "/#services" },
      { label: "Blockchain & Web3", href: "/#services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "AI Project Estimator", href: "/#generator" },
      { label: "AI Chatbot", href: "/#assistant" },
      { label: "3D Experience", href: "/#experience" },
      { label: "Admin Dashboard", href: "/admin" },
      { label: "Book a Call", href: "/#contact" },
    ],
  },
];

const locations = [
  { city: "Global", country: "Remote First", desc: "Operating 24/7 worldwide" },
  { city: "India", country: "HQ", desc: "Our operational heartbeat" },
  { city: "USA", country: "Partnerships", desc: "Building across America" },
  { city: "UAE", country: "Dubai", desc: "Connecting global brands" },
];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="section-dark relative pt-12 sm:pt-16 pb-8">
      <div className="r-container max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 sm:mb-6">
              <Logo size={36} variant="dark" />
            </Link>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-sm mb-4 sm:mb-6 pr-4">
              Building the future with AI-powered solutions, immersive experiences, and enterprise-grade engineering.
              We transform bold ideas into world-class digital products.
            </p>
            <div className="space-y-2">
              <a href="mailto:parent0077@gmail.com" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-[#4ECDC4] transition-colors break-words">
                <Mail className="w-4 h-4 flex-shrink-0" /> <span className="break-words">parent0077@gmail.com</span>
              </a>
              <a href="tel:+917505134465" className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-[#4ECDC4] transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" /> +91 75051 34 465
              </a>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/60">
                <MapPin className="w-4 h-4 flex-shrink-0" /> Global · Remote First
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <motion.div key={section.title}>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white/40 mb-3 sm:mb-4">
                {section.title}
              </h4>
              <ul className="space-y-1 sm:space-y-1.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-white/60 hover:text-[#4ECDC4] transition-colors inline-block py-1.5 min-h-[28px] leading-tight"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Locations */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {locations.map((loc) => (
              <div key={loc.city}>
                <div className="text-xs sm:text-sm font-bold text-white">{loc.city}</div>
                <div className="text-[10px] sm:text-xs text-[#4ECDC4]">{loc.country}</div>
                <div className="text-[10px] sm:text-xs text-white/40 mt-1">{loc.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Social + Copyright */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2 sm:gap-3">
            <a href="mailto:parent0077@gmail.com" aria-label="Email" className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-all">
              <Mail className="w-4 h-4 text-white/70" />
            </a>
            <a href="#" aria-label="GitHub" className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-all">
              <GithubIcon className="w-4 h-4 text-white/70" />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-all">
              <LinkedinIcon className="w-4 h-4 text-white/70" />
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-right">
            <p className="text-xs sm:text-sm text-white/40">
              © 2026 ParulSoftTechAI
            </p>
            <div className="flex gap-4 text-[10px] sm:text-xs text-white/30">
              <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
              <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Globe, Zap, Target, TrendingUp } from "lucide-react";

const complianceBadges = [
  { label: "ISO 27001", desc: "Certified" },
  { label: "SOC 2", desc: "Type 2" },
  { label: "GDPR", desc: "Compliant" },
  { label: "CCPA", desc: "Compliant" },
  { label: "PCI DSS", desc: "Compliant" },
  { label: "ISO 27018", desc: "Certified" },
];

const reasons = [
  {
    icon: Target,
    title: "Revenue-Focused Strategy",
    desc: "We don't just design — we build growth engines. Every project is aligned to increase leads, simplify operations, and drive measurable ROI.",
    color: "#4ECDC4",
  },
  {
    icon: Zap,
    title: "Fast Turnarounds",
    desc: "Dedicated teams handle design, development, and marketing with rapid delivery. Pause, upgrade, or scale at any time.",
    color: "#FF6600",
  },
  {
    icon: Globe,
    title: "24/7 Global Team",
    desc: "A worldwide team across 30+ countries. We're always on — no waiting, no delays. Support when you need it most.",
    color: "#8b5cf6",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    desc: "30% increases in session duration, 25% reductions in bounce rate. We turn digital stacks into growth engines.",
    color: "#3b82f6",
  },
];

export default function WhyChoose() {
  return (
    <section id="why" className="section-light-gray r-section">
      <div className="r-container max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="r-heading font-black mb-3 sm:mb-4 text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            WHY CHOOSE <span className="text-gradient">ParulSoftTechAI?</span>
          </h2>
          <p className="r-text max-w-xl mx-auto text-gray-500 px-2">
            You already know you need better digital outcomes. We bring clarity to chaos —
            structured services that grow what matters: revenue.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-12 sm:mb-16">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="card flex gap-3 sm:gap-4 items-start"
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${reason.color}15`, color: reason.color }}
              >
                <reason.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2 text-gray-900">{reason.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compliance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6">
            {complianceBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white border border-gray-200"
              >
                <ShieldCheck className="w-4 h-4 text-[#4ECDC4] flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">{badge.label}</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">{badge.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-gray-400 italic max-w-xl mx-auto px-2">
            "We follow the principles of GDPR, CCPA, and are ISO standards certified to ensure
            security, privacy, and compliance across all operations."
          </p>
        </motion.div>

        {/* Trust badges row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 sm:mt-10"
        >
          {[
            { icon: Award, label: "Clutch Top Agency" },
            { icon: ShieldCheck, label: "G2 Verified Reviews" },
            { icon: Star, label: "5.0 Google Rating" },
            { icon: Award, label: "GoodFirms 2025" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-gray-400">
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6600] flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

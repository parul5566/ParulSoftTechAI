"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, NeuralCommerce",
    location: "USA",
    flag: "🇺🇸",
    avatar: "https://i.pravatar.cc/100?img=47",
    quote: "ParulSoftTechAI transformed our business. The AI features doubled our conversion rate and the team delivered ahead of schedule. Truly a growth partner.",
    rating: 5,
  },
  {
    name: "Dr. James Patel",
    role: "Chief Radiologist, MedVision",
    location: "USA",
    flag: "🇺🇸",
    avatar: "https://i.pravatar.cc/100?img=12",
    quote: "The diagnostic accuracy is remarkable. It's become an essential tool in our radiology department. The team understood our compliance needs perfectly.",
    rating: 5,
  },
  {
    name: "Marcus Reid",
    role: "CTO, ChainLedger",
    location: "UK",
    flag: "🇬🇧",
    avatar: "https://i.pravatar.cc/100?img=33",
    quote: "The platform handles billions in volume with zero downtime. Engineering excellence at every level. They scaled with us seamlessly.",
    rating: 5,
  },
  {
    name: "Prof. Emily Watson",
    role: "Dean, EduSphere",
    location: "Canada",
    flag: "🇨🇦",
    avatar: "https://i.pravatar.cc/100?img=45",
    quote: "Student engagement went through the roof. VR changed how we teach forever. ParulSoftTechAI's innovation is unmatched in the industry.",
    rating: 5,
  },
  {
    name: "Mayor David Kim",
    role: "City of Techville",
    location: "Singapore",
    flag: "🇸🇬",
    avatar: "https://i.pravatar.cc/100?img=51",
    quote: "Our city runs smarter and more efficiently thanks to this platform. The IoT solution saved us millions in operational costs.",
    rating: 5,
  },
  {
    name: "Alex Thompson",
    role: "Founder, GameVerse",
    location: "UAE",
    flag: "🇦🇪",
    avatar: "https://i.pravatar.cc/100?img=15",
    quote: "The performance is unmatched. Cloud gaming finally works flawlessly. They built a platform that scales to millions of players.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-light r-section">
      <div className="r-container max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="r-heading font-black mb-3 sm:mb-4 text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            WHAT OUR <span className="text-gradient">CLIENTS SAY</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-500">5.0 · Trusted by 250+ clients worldwide</span>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="card"
            >
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(t.rating)].map((_, idx) => (
                  <svg key={idx} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 sm:mb-6 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-bold text-xs sm:text-sm text-gray-900">{t.name}</div>
                  <div className="text-[10px] sm:text-xs text-gray-400">{t.role}</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">{t.flag} {t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

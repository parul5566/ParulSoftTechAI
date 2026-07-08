"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Google Cloud", emoji: "☁️" },
  { name: "Amazon AWS", emoji: "🚀" },
  { name: "Microsoft Azure", emoji: "💻" },
  { name: "Docker", emoji: "🐳" },
  { name: "GitHub", emoji: "🐙" },
  { name: "OpenAI", emoji: "🧠" },
  { name: "Eleven Labs", emoji: "🔊" },
  { name: "Vercel", emoji: "▲" },
  { name: "Stripe", emoji: "💳" },
  { name: "Figma", emoji: "🎨" },
];

export default function Partners() {
  return (
    <section id="partners" className="section-light py-12 sm:py-16 md:py-20">
      <div className="r-container max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-4xl font-black mb-2 sm:mb-3 text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Our <span className="text-gradient">Strategic Partners</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-lg mx-auto px-2">
            We work with the world's leading technology platforms to deliver best-in-class solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-1.5 sm:gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-default"
            >
              <span className="text-lg sm:text-2xl">{partner.emoji}</span>
              <span className="text-xs sm:text-sm font-bold text-gray-600">{partner.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = ["All", "AI & ML", "Web & Mobile", "Cloud & DevOps", "Design", "Blockchain"];

const services = [
  { title: "AI Services", category: "AI & ML", icon: "🤖", desc: "LLM integration, chatbots, computer vision, predictive analytics, and NLP solutions.", color: "#8b5cf6" },
  { title: "Machine Learning", category: "AI & ML", icon: "🧠", desc: "Deep learning, model training, MLOps, and recommendation systems.", color: "#06b6d4" },
  { title: "AI Project Generator", category: "AI & ML", icon: "⚡", desc: "AI-powered project concept generation with tech stack, timeline & cost estimates.", color: "#ec4899" },
  { title: "Web Development", category: "Web & Mobile", icon: "💻", desc: "React / Next.js, enterprise web, progressive web apps, and real-time applications.", color: "#3b82f6" },
  { title: "Mobile Apps", category: "Web & Mobile", icon: "📱", desc: "iOS & Android, Flutter & React Native, cross-platform, and app store deployment.", color: "#8b5cf6" },
  { title: "UI/UX Design", category: "Design", icon: "🎨", desc: "Design systems, user research, prototyping, and accessibility-first interfaces.", color: "#06b6d4" },
  { title: "Graphics & Design", category: "Design", icon: "✏️", desc: "Brand identity, motion graphics, illustrations, and visual content creation.", color: "#ec4899" },
  { title: "Cloud Computing", category: "Cloud & DevOps", icon: "☁️", desc: "AWS / Azure / GCP, serverless, microservices, and cloud migration.", color: "#3b82f6" },
  { title: "DevOps & SRE", category: "Cloud & DevOps", icon: "🔧", desc: "CI/CD pipelines, Kubernetes, infrastructure as code, and monitoring.", color: "#8b5cf6" },
  { title: "Cybersecurity", category: "Cloud & DevOps", icon: "🛡️", desc: "Penetration testing, security audits, zero trust, and compliance.", color: "#06b6d4" },
  { title: "AR/VR Development", category: "Web & Mobile", icon: "🕶️", desc: "WebXR, Unity / Unreal, AR experiences, and VR simulations.", color: "#ec4899" },
  { title: "Blockchain & Web3", category: "Blockchain", icon: "⛓️", desc: "Smart contracts, DeFi solutions, NFT platforms, and Web3 apps.", color: "#3b82f6" },
];

export default function Capabilities() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="section-light r-section">
      <div className="r-container max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="r-heading font-black mb-3 sm:mb-4 text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Why Hire a Full Team? <br />
            <span className="text-gradient">When You Can Have It All!</span>
          </h2>
          <p className="r-text max-w-xl mx-auto text-gray-500 px-2">
            11 service areas under one roof — from AI to blockchain, design to cloud.
          </p>
        </motion.div>

        {/* Category Filter — horizontally scrollable on mobile */}
        <div className="scroll-tabs hide-scroll mb-8 sm:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="r-grid-cards">
          {filtered.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: (i % 4) * 0.06 }}
              className="card group flex flex-col"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0"
                  style={{ background: `${service.color}15` }}
                >
                  {service.icon}
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-[#4ECDC4] group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-bold text-sm sm:text-lg mb-1.5 sm:mb-2 text-gray-900">{service.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed flex-1">{service.desc}</p>
              <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                <span className="text-[10px] sm:text-xs text-gray-400">{service.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12"
        >
          <a href="#contact" className="btn-primary text-sm sm:text-base">
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

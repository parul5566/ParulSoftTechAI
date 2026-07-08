"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Brain, Boxes } from "lucide-react";

const Scene3D = dynamic(() => import("@/components/three/Scene3D"), { ssr: false });

const scenes = [
  {
    id: "globe" as const,
    title: "Interactive Technology Globe",
    description:
      "Explore our global technology ecosystem. Every node represents a capability — from AI/ML to cloud infrastructure. Spin, zoom, and discover the full scope of our expertise.",
    icon: Globe,
    label: "Tech Globe",
  },
  {
    id: "neural" as const,
    title: "AI Neural Network",
    description:
      "Visualize the intelligence behind our solutions. Deep neural architectures power our computer vision, NLP, and predictive analytics systems across every platform we build.",
    icon: Brain,
    label: "Neural Net",
  },
  {
    id: "ecosystem" as const,
    title: "Floating Tech Ecosystem",
    description:
      "An immersive constellation of technologies orbiting in harmony. From blockchain to IoT, see how every piece of modern engineering connects into unified digital experiences.",
    icon: Boxes,
    label: "Ecosystem",
  },
];

export default function Experience3D() {
  const [activeScene, setActiveScene] = useState(0);
  const current = scenes[activeScene];

  return (
    <section id="experience" className="section-dark relative r-section overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#8b5cf6] opacity-10 blur-[120px]" />

      <div className="r-container max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#4ECDC4]">
            Immersive 3D
          </span>
          <h2 className="r-heading font-black mt-2 sm:mt-3 mb-3 sm:mb-4 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Experience Innovation <span className="text-gradient">in 3D</span>
          </h2>
          <p className="r-text max-w-xl mx-auto text-white/60 px-2">
            Interactive WebGL experiences powered by Three.js. Drag to rotate, explore the future.
          </p>
        </motion.div>

        {/* Scene Tabs — scrollable on mobile */}
        <div className="scroll-tabs hide-scroll mb-6 sm:mb-8 md:mb-12">
          {scenes.map((scene, i) => (
            <button
              key={scene.id}
              onClick={() => setActiveScene(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all flex-shrink-0 ${
                activeScene === i
                  ? "bg-[#4ECDC4] text-black"
                  : "glass text-white/70 hover:text-white"
              }`}
            >
              <scene.icon className="w-4 h-4" />
              {scene.label}
            </button>
          ))}
        </div>

        {/* 3D Canvas */}
        <motion.div
          layout
          className="relative w-full h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl glass-strong overflow-hidden glow-border"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Scene3D type={current.id} />
            </motion.div>
          </AnimatePresence>

          {/* Info Overlay */}
          <motion.div
            key={`info-${current.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 glass-strong"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#4ECDC4] flex items-center justify-center flex-shrink-0">
                <current.icon className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </div>
              <h3 className="text-sm sm:text-base md:text-xl font-bold text-white">{current.title}</h3>
            </div>
            <p className="text-xs sm:text-sm max-w-3xl text-white/60">
              {current.description}
            </p>
          </motion.div>
        </motion.div>

        <p className="text-center text-[10px] sm:text-xs md:text-sm mt-3 sm:mt-4 text-white/40">
          🖱️ Drag to rotate · Scroll to explore more
        </p>
      </div>
    </section>
  );
}

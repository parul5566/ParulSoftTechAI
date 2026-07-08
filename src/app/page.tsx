"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import SoundToggle from "@/components/SoundToggle";
import Hero from "@/components/sections/Hero";
import WhyChoose from "@/components/sections/WhyChoose";
import Capabilities from "@/components/sections/Capabilities";
import Experience3D from "@/components/sections/Experience3D";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import ProjectGenerator from "@/components/sections/ProjectGenerator";
import AIAssistant from "@/components/sections/AIAssistant";
import FAQ from "@/components/sections/FAQ";
import Partners from "@/components/sections/Partners";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
        style={{
          scaleX: progress,
          background: "linear-gradient(90deg, #4ECDC4, #FF6600)",
        }}
      />

      <AnalyticsTracker />
      <SoundToggle />
      <Navbar />

      <main>
        {/* Hero — dark */}
        <Hero />
        {/* Why Choose Us — light gray */}
        <WhyChoose />
        {/* Services — light */}
        <Capabilities />
        {/* Work / Portfolio — light gray */}
        <Portfolio />
        {/* Testimonials — light */}
        <Testimonials />
        {/* Strategic Partners — light */}
        <Partners />
        {/* 3D Experience — dark */}
        <Experience3D />
        {/* AI Chatbot — dark */}
        <AIAssistant />
        {/* AI Project Generator — light */}
        <ProjectGenerator />
        {/* FAQ — light gray */}
        <FAQ />
        {/* Contact — light gray */}
        <Contact />
      </main>
      <Footer />

      {/* Floating Support Widget */}
      <div className="floating-widget fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
        <a
          href="#assistant"
          className="w-14 h-14 rounded-full bg-[#4ECDC4] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="AI Chatbot"
        >
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.99.97 4.29L2 22l5.71-.97C9.01 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.3 0-2.54-.24-3.69-.67l-.45-.18-3.39.58.57-3.31-.22-.45C4.28 14.81 4 13.43 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
        </a>
        <a
          href="https://wa.me/917505134465"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="WhatsApp"
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>
      </div>
    </>
  );
}

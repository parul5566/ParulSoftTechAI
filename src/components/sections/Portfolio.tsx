"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, TrendingUp, Users, DollarSign, Star, X } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  metrics: { users: string; revenue: string; growth: string };
  testimonial: { quote: string; author: string; role: string };
  clientName: string;
  clientIndustry: string;
  gradient: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "NeuralCommerce AI",
    category: "AI / E-Commerce",
    description: "AI-powered e-commerce platform with visual search and personalized recommendations.",
    longDescription:
      "A next-generation e-commerce platform that uses computer vision for visual product search, LLM-powered chat for customer support, and deep learning recommendation engines that increased average order value by 47%.",
    techStack: ["Next.js", "Python", "TensorFlow", "AWS", "PostgreSQL", "Redis"],
    features: ["Visual Search", "AI Recommendations", "Voice Checkout", "AR Product Preview", "Smart Inventory"],
    metrics: { users: "2.4M", revenue: "$18M", growth: "340%" },
    testimonial: { quote: "ParulSoftTechAI transformed our business. The AI features doubled our conversion rate.", author: "Sarah Chen", role: "CEO, NeuralCommerce" },
    clientName: "NeuralCommerce",
    clientIndustry: "E-Commerce",
    gradient: "from-purple-600 to-pink-600",
    featured: true,
  },
  {
    id: 2,
    title: "MedVision Pro",
    category: "Healthcare AI",
    description: "Medical imaging platform with AI-powered diagnostic assistance.",
    longDescription:
      "An FDA-compliant medical imaging platform using deep learning to assist radiologists in detecting anomalies. Processes MRI, CT, and X-ray scans with 94% accuracy, reducing diagnosis time by 60%.",
    techStack: ["React Native", "FastAPI", "PyTorch", "Google Cloud", "Kubernetes"],
    features: ["AI Diagnostics", "3D Imaging", "HIPAA Compliant", "Real-time Collaboration", "Clinical Reports"],
    metrics: { users: "45K", revenue: "$6.2M", growth: "210%" },
    testimonial: { quote: "The diagnostic accuracy is remarkable. It's become an essential tool in our radiology department.", author: "Dr. James Patel", role: "Chief Radiologist, MedVision" },
    clientName: "MedVision Health",
    clientIndustry: "Healthcare",
    gradient: "from-cyan-600 to-blue-600",
    featured: true,
  },
  {
    id: 3,
    title: "ChainLedger Finance",
    category: "FinTech / Blockchain",
    description: "DeFi platform with smart contract automation and real-time analytics.",
    longDescription:
      "A decentralized finance platform handling $50M+ in daily transactions. Features automated yield farming, flash loans, and a custom DEX with sub-second settlement times.",
    techStack: ["Vue.js", "Solidity", "Rust", "Ethereum", "IPFS", "The Graph"],
    features: ["Smart Contracts", "Yield Farming", "Flash Loans", "Cross-chain Bridge", "Analytics Dashboard"],
    metrics: { users: "120K", revenue: "$24M", growth: "520%" },
    testimonial: { quote: "The platform handles billions in volume with zero downtime. Engineering excellence.", author: "Marcus Reid", role: "CTO, ChainLedger" },
    clientName: "ChainLedger Finance",
    clientIndustry: "FinTech",
    gradient: "from-pink-600 to-orange-600",
    featured: true,
  },
  {
    id: 4,
    title: "EduSphere VR",
    category: "Education / VR",
    description: "Immersive VR learning platform with AI tutoring.",
    longDescription:
      "A virtual reality education platform with AI-powered personalized tutoring. Students explore historical events, conduct virtual chemistry experiments, and practice languages in immersive environments.",
    techStack: ["Unity", "WebXR", "OpenAI", "Node.js", "MongoDB"],
    features: ["VR Classrooms", "AI Tutoring", "Multiplayer Labs", "Language Practice", "Progress Tracking"],
    metrics: { users: "85K", revenue: "$3.8M", growth: "180%" },
    testimonial: { quote: "Student engagement went through the roof. VR changed how we teach forever.", author: "Prof. Emily Watson", role: "Dean, EduSphere" },
    clientName: "EduSphere",
    clientIndustry: "Education",
    gradient: "from-blue-600 to-purple-600",
    featured: false,
  },
  {
    id: 5,
    title: "SmartCity IoT Hub",
    category: "IoT / Smart City",
    description: "City-wide IoT platform managing traffic, energy, and public services.",
    longDescription:
      "An IoT platform connecting 100K+ sensors across a smart city. Real-time traffic optimization reduced congestion by 35%, smart energy grids cut consumption by 28%, and predictive maintenance saved millions.",
    techStack: ["Flutter", "Go", "InfluxDB", "MQTT", "AWS IoT", "Grafana"],
    features: ["Traffic Optimization", "Energy Management", "Waste Management", "Air Quality", "Emergency Response"],
    metrics: { users: "500K", revenue: "$12M", growth: "260%" },
    testimonial: { quote: "Our city runs smarter and more efficiently thanks to this platform.", author: "Mayor David Kim", role: "City of Techville" },
    clientName: "City of Techville",
    clientIndustry: "Government",
    gradient: "from-green-600 to-cyan-600",
    featured: false,
  },
  {
    id: 6,
    title: "GameVerse Cloud",
    category: "Gaming / Cloud",
    description: "Cloud gaming platform with AI-driven content generation.",
    longDescription:
      "A cloud gaming platform streaming AAA titles to any device. Features AI-generated game content, real-time ray tracing, and social features. Handles 5M concurrent players with sub-20ms latency.",
    techStack: ["React", "C++", "WebRTC", "NVIDIA", "Redis", "Cassandra"],
    features: ["Cloud Streaming", "AI Content Gen", "Multiplayer", "Cross-platform", "Social Features"],
    metrics: { users: "5M", revenue: "$45M", growth: "680%" },
    testimonial: { quote: "The performance is unmatched. Cloud gaming finally works flawlessly.", author: "Alex Thompson", role: "Founder, GameVerse" },
    clientName: "GameVerse",
    clientIndustry: "Gaming",
    gradient: "from-orange-600 to-red-600",
    featured: false,
  },
];

const categories = ["All", "AI / E-Commerce", "Healthcare AI", "FinTech / Blockchain", "Education / VR", "IoT / Smart City", "Gaming / Cloud"];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="section-light-gray r-section">
      <div className="r-container max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="r-heading font-black mb-3 sm:mb-4 text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Our <span className="text-gradient">Work</span>
          </h2>
          <p className="r-text max-w-xl mx-auto text-gray-500 px-2">
            Real projects, real impact. Tap any card to explore the full story.
          </p>
        </motion.div>

        {/* Filter Tabs — scrollable on mobile */}
        <div className="scroll-tabs hide-scroll mb-8 sm:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                filter === cat ? "bg-black text-white" : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(project)}
                className="group bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-200 hover:shadow-xl hover:border-[#4ECDC4] hover:-translate-y-2 transition-all"
              >
                {/* Gradient Header */}
                <div className={`relative h-28 sm:h-36 md:h-40 bg-gradient-to-br ${project.gradient} overflow-hidden flex-shrink-0`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/90 px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                  {project.featured && (
                    <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-yellow-400 text-black text-[10px] sm:text-xs font-bold">
                      ★ Featured
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 text-gray-900 group-hover:text-[#4ECDC4] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-md bg-gray-100 text-gray-600">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-md bg-gray-100 text-gray-400">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {project.metrics.users}</span>
                      <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {project.metrics.growth}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-[#4ECDC4] flex items-center gap-1">
                      View <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="fixed inset-2 sm:inset-4 md:inset-x-8 md:inset-y-8 lg:inset-x-32 lg:inset-y-12 z-[90] rounded-2xl sm:rounded-3xl bg-white overflow-y-auto no-scrollbar"
            >
              {/* Header */}
              <div className={`relative h-32 sm:h-40 md:h-48 bg-gradient-to-br ${selected.gradient} flex items-end p-4 sm:p-6 md:p-8`}>
                <div className="absolute inset-0 bg-black/10" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
                <div className="relative z-10 pr-12">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/90 px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm">
                    {selected.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-black mt-2 sm:mt-3 text-white">{selected.title}</h2>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">{selected.clientName} · {selected.clientIndustry}</p>
                </div>
              </div>

              <div className="p-5 sm:p-8 md:p-12 space-y-6 sm:space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-gray-900">Project Overview</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {selected.longDescription}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {[
                    { label: "Active Users", value: selected.metrics.users, icon: Users },
                    { label: "Revenue Impact", value: selected.metrics.revenue, icon: DollarSign },
                    { label: "Growth Rate", value: selected.metrics.growth, icon: TrendingUp },
                  ].map((m) => (
                    <div key={m.label} className="p-3 sm:p-4 rounded-xl bg-gray-50 text-center border border-gray-100">
                      <m.icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 sm:mb-2 text-[#4ECDC4]" />
                      <div className="text-base sm:text-2xl font-bold text-gray-900">{m.value}</div>
                      <div className="text-[10px] sm:text-xs text-gray-400">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-gray-900">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-2xl">
                    {selected.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4ECDC4] flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-gray-900">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.techStack.map((tech) => (
                      <span key={tech} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-100 text-xs sm:text-sm font-medium text-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="p-4 sm:p-6 rounded-2xl bg-gray-50 border border-gray-100 relative">
                  <Star className="absolute top-4 left-4 sm:top-6 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 text-yellow-400/20" />
                  <blockquote className="text-sm sm:text-lg italic pl-8 sm:pl-12 text-gray-900">
                    &ldquo;{selected.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="pl-8 sm:pl-12 mt-3 sm:mt-4">
                    <div className="font-bold text-sm sm:text-base text-gray-900">{selected.testimonial.author}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{selected.testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

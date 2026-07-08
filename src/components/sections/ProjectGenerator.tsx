"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Loader2, CheckCircle2, DollarSign, Clock, Layers, Cpu } from "lucide-react";

const projectTypes = [
  "Mobile App", "Web Platform", "AI SaaS", "Enterprise SW",
  "Blockchain", "Healthcare", "Education", "FinTech",
  "E-Commerce", "ERP / CRM", "IoT Platform", "Smart City",
];

interface GeneratedConcept {
  name: string;
  description: string;
  techStack: string[];
  coreFeatures: string[];
  estimatedCost: string;
  estimatedTimeline: string;
  teamSize: string;
  phases: { phase: string; duration: string; tasks: string[] }[];
}

export default function ProjectGenerator() {
  const [projectType, setProjectType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [concept, setConcept] = useState<GeneratedConcept | null>(null);

  const generate = async () => {
    if (!projectType) return;
    setLoading(true);
    setConcept(null);

    try {
      const res = await fetch("/api/generate-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectType, description }),
      });
      const data = await res.json();
      setConcept(data.concept);
    } catch {
      setConcept({
        name: "Error",
        description: "Could not generate concept. Please try again.",
        techStack: [],
        coreFeatures: [],
        estimatedCost: "—",
        estimatedTimeline: "—",
        teamSize: "—",
        phases: [],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="generator" className="section-light r-section">
      <div className="r-container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#4ECDC4] flex items-center justify-center gap-2">
            AI-Powered <span className="badge-new">HOT</span>
          </span>
          <h2 className="r-heading font-black mt-2 sm:mt-3 mb-3 sm:mb-4 text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            AI Project <span className="text-gradient">Generator</span>
          </h2>
          <p className="r-text max-w-xl mx-auto text-gray-500 px-2">
            Describe your idea and our AI will generate a complete project concept with tech stack, features, timeline, and cost estimate.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-5 sm:p-8 rounded-2xl bg-white border border-gray-200"
          >
            <h3 className="text-base sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-gray-900">
              <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#4ECDC4]" />
              Describe Your Project
            </h3>

            <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-500">
              Project Type
            </label>
            <div className="grid grid-cols-2 gap-2 mb-4 sm:mb-5">
              {projectTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setProjectType(type)}
                  className={`text-[10px] sm:text-xs px-2 py-2 rounded-lg text-center transition-all ${
                    projectType === type
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-500">
              Additional Details (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., A platform that connects freelancers..."
              rows={3}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none text-xs sm:text-sm text-gray-900 resize-none mb-4 sm:mb-5 focus:border-[#4ECDC4] transition-colors"
            />

            <button
              onClick={generate}
              disabled={!projectType || loading}
              className="btn-primary w-full justify-center disabled:opacity-50 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" /> Generate Project Concept
                </>
              )}
            </button>
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-5 sm:p-8 rounded-2xl bg-gray-50 border border-gray-200 min-h-[300px] sm:min-h-[400px]"
          >
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full py-16"
                >
                  <div className="relative mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[#4ECDC4]/20" />
                    <motion.div
                      className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-transparent border-t-[#4ECDC4]"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <Wand2 className="absolute inset-0 m-auto w-5 h-5 sm:w-6 sm:h-6 text-[#4ECDC4]" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    AI is designing your project...
                  </p>
                </motion.div>
              )}

              {!loading && !concept && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full py-16 text-center"
                >
                  <Layers className="w-10 h-10 sm:w-12 sm:h-12 mb-4 text-gray-300" />
                  <p className="text-xs sm:text-sm text-gray-400 px-4">
                    Select a project type and click generate to see a complete concept.
                  </p>
                </motion.div>
              )}

              {!loading && concept && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 sm:space-y-5"
                >
                  <div>
                    <h3 className="text-lg sm:text-2xl font-black text-gradient mb-2">{concept.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {concept.description}
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 rounded-xl bg-white border border-gray-100 text-center">
                      <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-1 text-[#4ECDC4]" />
                      <div className="text-[10px] sm:text-xs font-bold text-gray-900">{concept.estimatedCost}</div>
                      <div className="text-[8px] sm:text-[10px] text-gray-400">Est. Cost</div>
                    </div>
                    <div className="p-2 sm:p-3 rounded-xl bg-white border border-gray-100 text-center">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-1 text-[#4ECDC4]" />
                      <div className="text-[10px] sm:text-xs font-bold text-gray-900">{concept.estimatedTimeline}</div>
                      <div className="text-[8px] sm:text-[10px] text-gray-400">Timeline</div>
                    </div>
                    <div className="p-2 sm:p-3 rounded-xl bg-white border border-gray-100 text-center">
                      <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-1 text-[#4ECDC4]" />
                      <div className="text-[10px] sm:text-xs font-bold text-gray-900">{concept.teamSize}</div>
                      <div className="text-[8px] sm:text-[10px] text-gray-400">Team Size</div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  {concept.techStack.length > 0 && (
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold mb-2 text-gray-900">Recommended Tech Stack</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {concept.techStack.map((tech) => (
                          <span key={tech} className="text-[10px] sm:text-xs px-2 py-1 rounded-lg bg-white border border-gray-200 text-gray-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Core Features */}
                  {concept.coreFeatures.length > 0 && (
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold mb-2 text-gray-900">Core Features</h4>
                      <ul className="space-y-1.5">
                        {concept.coreFeatures.map((f) => (
                          <li key={f} className="text-xs flex items-center gap-2 text-gray-500">
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-[#4ECDC4]" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Development Phases */}
                  {concept.phases.length > 0 && (
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold mb-2 text-gray-900">Development Phases</h4>
                      <div className="space-y-2 sm:space-y-3">
                        {concept.phases.map((phase, i) => (
                          <div key={i} className="p-2.5 sm:p-3 rounded-xl bg-white border border-gray-100">
                            <div className="flex items-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
                              <span className="text-[10px] sm:text-xs font-bold text-gray-900">Phase {i + 1}: {phase.phase}</span>
                              <span className="text-[8px] sm:text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-500">{phase.duration}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {phase.tasks.map((t) => (
                                <span key={t} className="text-[9px] sm:text-[10px] text-gray-400">· {t}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

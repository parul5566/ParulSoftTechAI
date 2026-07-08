"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Calendar, Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const projectTypes = [
    "AI / Machine Learning", "Web Development", "Mobile App", "AR/VR Experience",
    "Cloud / DevOps", "Blockchain / Web3", "Enterprise Software", "Other",
  ];

  const budgets = ["< $10K", "$10K - $50K", "$50K - $100K", "$100K - $500K", "$500K+"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", company: "", projectType: "", budget: "", timeline: "", message: "" });
    } catch {
      setStatus("success");
    }
  };

  return (
    <section id="contact" className="section-light-gray r-section">
      <div className="r-container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#4ECDC4]">
            Get Started
          </span>
          <h2 className="r-heading font-black mt-2 sm:mt-3 mb-3 sm:mb-4 text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Let's Build <span className="text-gradient">Together</span>
          </h2>
          <p className="r-text max-w-xl mx-auto text-gray-500 px-2">
            Tell us about your project and get a personalized response within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 p-5 sm:p-8 rounded-2xl bg-white border border-gray-200"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                >
                  <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 text-[#4ECDC4] mb-4 sm:mb-6" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">Thank You!</h3>
                <p className="mb-6 text-sm text-gray-500 px-4">
                  Your inquiry has been received. Our team will respond within 24 hours.
                </p>
                <button onClick={() => setStatus("idle")} className="btn-outline text-sm">
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 text-gray-500">Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 focus:border-[#4ECDC4] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 text-gray-500">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 focus:border-[#4ECDC4] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 text-gray-500">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 focus:border-[#4ECDC4] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 text-gray-500">Company</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 focus:border-[#4ECDC4] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 text-gray-500">Project Type</label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 focus:border-[#4ECDC4] transition-colors"
                    >
                      <option value="">Select...</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 text-gray-500">Budget Range</label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 focus:border-[#4ECDC4] transition-colors"
                    >
                      <option value="">Select...</option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1.5 text-gray-500">Project Description *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project goals..."
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm text-gray-900 focus:border-[#4ECDC4] transition-colors resize-none"
                  />
                </div>

                <button type="submit" disabled={status === "submitting"} className="btn-primary w-full justify-center disabled:opacity-50 text-sm">
                  {status === "submitting" ? "Sending..." : (
                    <>
                      <Send className="w-4 h-4" /> Send Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4 sm:space-y-5"
          >
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200">
              <h3 className="font-bold text-base sm:text-lg mb-4 text-gray-900">Contact Information</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "parent0077@gmail.com", href: "mailto:parent0077@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 75051 34 465", href: "tel:+917505134465" },
                  { icon: MapPin, label: "Location", value: "Global · Remote First" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#4ECDC4]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#4ECDC4]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-xs text-gray-400">{label}</div>
                      {href ? (
                        <a href={href} className="text-xs sm:text-sm font-medium text-gray-900 break-words hover:text-[#4ECDC4] transition-colors">
                          {value}
                        </a>
                      ) : (
                        <div className="text-xs sm:text-sm font-medium text-gray-900">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#4ECDC4] flex-shrink-0" />
                <h3 className="font-bold text-base sm:text-lg text-gray-900">Quick Stats</h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { label: "Response Time", value: "< 24 hours" },
                  { label: "Project Start", value: "2-4 weeks" },
                  { label: "Free Consultation", value: "Included" },
                  { label: "NDA Available", value: "On Request" },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between items-center gap-2">
                    <span className="text-xs sm:text-sm text-gray-500">{s.label}</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 text-right">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

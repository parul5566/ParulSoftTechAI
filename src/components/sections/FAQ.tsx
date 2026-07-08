"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What services does ParulSoftTechAI offer?",
    a: "ParulSoftTechAI is a global creative-tech agency offering end-to-end digital solutions across 11 service areas: AI Services, UI/UX Design, Web Development, Graphics & Design, Mobile App Development, Video & Animation, Digital Marketing (including SEO and PPC), Custom Software Development, Blockchain & Web3, and Cloud Computing & Security. All services are available via flexible task-based subscription or custom project engagement.",
  },
  {
    q: "How does the subscription model work?",
    a: "Instead of hiring a full in-house team, you subscribe to ParulSoftTechAI's services and submit requests as needed. Your dedicated team handles design, development, and marketing tasks on an ongoing basis — delivering high-quality work with fast turnarounds, unlimited revisions, and no hiring commitments. The model is scalable and flexible: pause, upgrade, or cancel at any time.",
  },
  {
    q: "What makes ParulSoftTechAI different from other agencies?",
    a: "ParulSoftTechAI combines creative design, advanced technology, and strategic marketing under one roof — eliminating the need to manage multiple vendors. We're a 24/7 global agency with a 5.0-star rating, transparent subscription pricing, ISO 27001 certification, and a track record of delivering measurable results — including 30% increases in session duration and 25% reductions in bounce rate.",
  },
  {
    q: "Which industries do you work with?",
    a: "ParulSoftTechAI works with businesses across a wide range of industries, including startups, e-commerce, technology, retail, healthcare, finance, real estate, hospitality, education, media, and professional services. Our solutions scale regardless of sector — from early-stage brands building their first website to established enterprises launching AI-powered platforms.",
  },
  {
    q: "How do I get started?",
    a: "Getting started is simple. Book a free consultation call directly from our website, or submit an enquiry via our contact form. You can also reach us by phone or WhatsApp at +91 75051 34 465. Once we receive your enquiry, our team schedules a call to understand your goals, scope your project, and send a customized proposal with clear timelines and pricing. We operate 24/7.",
  },
  {
    q: "Do you offer ongoing support and revisions?",
    a: "Yes — ongoing support is a core part of how we work. For subscription clients, revisions are unlimited and built into your plan. For project-based clients, we provide post-launch support, maintenance, and updates to ensure your digital product continues to perform.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-light-gray r-section">
      <div className="r-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="r-heading font-black mb-3 sm:mb-4 text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="text-gradient">FAQ</span>
          </h2>
          <p className="r-text text-gray-500">
            Got questions? We've got answers.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.05 }}
              className={`faq-item ${activeIndex === i ? "active" : ""}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-3"
              >
                <span className="font-bold text-sm sm:text-base text-gray-900">{faq.q}</span>
                <motion.div animate={{ rotate: activeIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                  <ChevronDown className={`w-5 h-5 ${activeIndex === i ? "text-[#4ECDC4]" : "text-gray-400"}`} />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

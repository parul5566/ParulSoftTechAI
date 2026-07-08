"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#partners", label: "Partners" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black",
          scrolled ? "py-2 shadow-lg shadow-black/50" : "py-2.5 sm:py-3"
        )}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <Logo size={32} variant="dark" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-white/10 text-white/80 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#assistant"
              className="px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-white/10 text-white/80 hover:text-white flex items-center gap-1.5"
            >
              AI Chatbot
              <span className="badge-new">NEW</span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Link
              href="/admin"
              className="hidden sm:block px-3 sm:px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/#contact"
              className="hidden sm:flex btn-primary text-xs sm:text-sm"
            >
              Get Started
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 -mr-1 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[82vw] max-w-sm bg-black p-5 sm:p-6 flex flex-col gap-1 border-l border-white/10 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <Logo size={30} variant="dark" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-white/10 text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3.5 px-4 text-base font-medium rounded-xl hover:bg-white/5 transition-colors text-white/80"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
              >
                <Link
                  href="/#assistant"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3.5 px-4 text-base font-medium rounded-xl hover:bg-white/5 transition-colors text-white/80 flex items-center gap-2"
                >
                  AI Chatbot
                  <span className="badge-new">NEW</span>
                </Link>
              </motion.div>
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-4 justify-center text-center"
              >
                Get Started
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="btn-glass mt-2 justify-center text-center text-sm"
              >
                Login
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

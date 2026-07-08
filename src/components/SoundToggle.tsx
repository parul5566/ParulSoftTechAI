"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { SoundManager } from "@/lib/sound";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Sound toggle button — appears as a floating control.
 * Also initializes audio on first user interaction (browser autoplay policy).
 */
export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    setEnabled(SoundManager.isEnabled());

    // Hide hint after a few seconds
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    const next = !enabled;
    SoundManager.setEnabled(next);
    setEnabled(next);
    if (next) SoundManager.play("toggle");
    setShowHint(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="hidden sm:block px-3 py-2 rounded-xl glass-strong text-xs whitespace-nowrap"
            style={{ color: "var(--text-secondary)" }}
          >
            Enable sound effects 🔊
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:bg-white/10 transition-colors"
        aria-label={enabled ? "Mute sound effects" : "Enable sound effects"}
      >
        <AnimatePresence mode="wait">
          {enabled ? (
            <motion.div key="on" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
              <Volume2 className="w-5 h-5 text-gradient-cyan" />
            </motion.div>
          ) : (
            <motion.div key="off" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
              <VolumeX className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

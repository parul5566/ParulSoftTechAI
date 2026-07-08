"use client";

import { useEffect, useState } from "react";
import { SoundManager } from "@/lib/sound";

/**
 * Hook for playing sound effects from any component.
 * Returns a play function that respects the global sound setting.
 */
export function useSound() {
  const play = (type: Parameters<typeof SoundManager.play>[0]) => {
    SoundManager.play(type);
  };

  return play;
}

/**
 * Hook for responsive breakpoint detection.
 * Returns the current breakpoint based on window width.
 */
type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("lg");

  useEffect(() => {
    const calculate = () => {
      const w = window.innerWidth;
      if (w < 400) setBreakpoint("xs");
      else if (w < 640) setBreakpoint("sm");
      else if (w < 768) setBreakpoint("md");
      else if (w < 1024) setBreakpoint("lg");
      else if (w < 1280) setBreakpoint("xl");
      else setBreakpoint("2xl");
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  return breakpoint;
}

/**
 * Hook for detecting touch devices
 */
export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
    );
  }, []);

  return isTouch;
}

/**
 * Hook for scroll progress (0-1) of the entire page
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => SmoothScroll(setProgress), []);

  return progress;
}

function SmoothScroll(setProgress: (v: number) => void) {
  const onScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    setProgress(Math.min(progress, 1));
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

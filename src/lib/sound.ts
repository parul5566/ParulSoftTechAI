"use client";

/**
 * SoundManager
 * Web Audio API-based sound effects — no audio files needed.
 * Generates UI sounds (hover, click, success, whoosh) procedurally.
 * Respects user interaction requirements (browsers block audio without gesture).
 */

type SoundType = "hover" | "click" | "success" | "whoosh" | "toggle" | "open" | "close" | "error";

class SoundManagerClass {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private enabled = true;
  private volume = 0.15;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("pst_sound");
      if (stored !== null) this.enabled = stored === "true";
    }
  }

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;
      this.masterGain.connect(this.ctx.destination);
    } catch {
      this.ctx = null;
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (typeof window !== "undefined") localStorage.setItem("pst_sound", String(enabled));
  }

  isEnabled() {
    return this.enabled;
  }

  setVolume(vol: number) {
    this.volume = vol;
    if (this.masterGain) this.masterGain.gain.value = vol;
  }

  play(type: SoundType) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    // Resume context if suspended (browser autoplay policy)
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    const now = this.ctx.currentTime;

    switch (type) {
      case "hover":
        this.tone(880, 0.05, 0.08, "sine", now);
        break;
      case "click":
        this.tone(523, 0.08, 0.12, "triangle", now);
        this.tone(659, 0.06, 0.1, "triangle", now + 0.02);
        break;
      case "toggle":
        this.tone(440, 0.1, 0.15, "square", now);
        this.tone(660, 0.08, 0.12, "square", now + 0.05);
        break;
      case "success":
        this.tone(523, 0.12, 0.2, "sine", now);
        this.tone(659, 0.12, 0.2, "sine", now + 0.08);
        this.tone(784, 0.15, 0.25, "sine", now + 0.16);
        break;
      case "whoosh":
        this.whoosh(now);
        break;
      case "open":
        this.tone(330, 0.15, 0.2, "sine", now);
        this.tone(440, 0.12, 0.15, "sine", now + 0.05);
        this.tone(550, 0.1, 0.12, "sine", now + 0.1);
        break;
      case "close":
        this.tone(550, 0.1, 0.15, "sine", now);
        this.tone(440, 0.12, 0.15, "sine", now + 0.05);
        this.tone(330, 0.15, 0.2, "sine", now + 0.1);
        break;
      case "error":
        this.tone(200, 0.2, 0.3, "sawtooth", now);
        this.tone(150, 0.2, 0.3, "sawtooth", now + 0.1);
        break;
    }
  }

  private tone(
    freq: number,
    duration: number,
    gain: number,
    type: OscillatorType,
    startTime: number
  ) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    // ADSR envelope
    env.gain.setValueAtTime(0, startTime);
    env.gain.linearRampToValueAtTime(gain, startTime + 0.005);
    env.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(env);
    env.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  private whoosh(startTime: number) {
    if (!this.ctx || !this.masterGain) return;

    // White noise burst through a filter sweep
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(200, startTime);
    filter.frequency.exponentialRampToValueAtTime(2000, startTime + 0.3);
    filter.Q.value = 2;

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0, startTime);
    env.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
    env.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

    noise.connect(filter);
    filter.connect(env);
    env.connect(this.masterGain);

    noise.start(startTime);
    noise.stop(startTime + 0.45);
  }
}

export const SoundManager = new SoundManagerClass();

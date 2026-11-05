// Zero-download Procedural Web Audio Engine for luxury ambient soundscapes and SFX

class LuxuryAudioEngine {
  constructor() {
    this.ctx = null;
    this.ambientGain = null;
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.ambientFilter = null;
    this.isMuted = true;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.initialized = true;
    } catch {
      // AudioContext unavailable
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (!muted) {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.startAmbientLounge();
    } else {
      this.stopAmbientLounge();
    }
  }

  startAmbientLounge() {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ambientGain) return; // Already running

      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.12, now + 3);

      this.ambientFilter = this.ctx.createBiquadFilter();
      this.ambientFilter.type = 'lowpass';
      this.ambientFilter.frequency.setValueAtTime(320, now);

      // Warm double sine drone (F# minor root)
      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(92.5, now); // F#2

      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(138.6, now); // C#3 fifth

      // Sub-harmonic vibrato LFO
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.18, now); // slow breathing
      lfoGain.gain.setValueAtTime(45, now);
      lfo.connect(this.ambientFilter.frequency);
      lfo.start(now);

      this.ambientOsc1.connect(this.ambientFilter);
      this.ambientOsc2.connect(this.ambientFilter);
      this.ambientFilter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1.start(now);
      this.ambientOsc2.start(now);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  stopAmbientLounge() {
    if (!this.ambientGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        try {
          if (this.ambientOsc1) this.ambientOsc1.stop();
          if (this.ambientOsc2) this.ambientOsc2.stop();
        } catch {}
        this.ambientGain = null;
        this.ambientOsc1 = null;
        this.ambientOsc2 = null;
        this.ambientFilter = null;
      }, 900);
    } catch {}
  }

  playDoorOpen() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      
      // Brass latch click
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(440, now);
      clickOsc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
      clickGain.gain.setValueAtTime(0.3, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      clickOsc.connect(clickGain);
      clickGain.connect(this.ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.15);

      // Deep architectural door swing rumble
      const rumbleOsc = this.ctx.createOscillator();
      const rumbleGain = this.ctx.createGain();
      rumbleOsc.type = 'sine';
      rumbleOsc.frequency.setValueAtTime(80, now + 0.05);
      rumbleOsc.frequency.linearRampToValueAtTime(55, now + 2.2);
      rumbleGain.gain.setValueAtTime(0.01, now);
      rumbleGain.gain.linearRampToValueAtTime(0.25, now + 0.6);
      rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
      rumbleOsc.connect(rumbleGain);
      rumbleGain.connect(this.ctx.destination);
      rumbleOsc.start(now);
      rumbleOsc.stop(now + 2.5);
    } catch {}
  }

  playThresholdWhoosh() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 1.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(4, now);
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.8);
      filter.frequency.exponentialRampToValueAtTime(400, now + 1.6);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 1.6);
    } catch {}
  }

  playPodHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.15); // A5 -> D6
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  }

  playPodSelect() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Luxury glass chord: D5, F#5, A5
      [587.33, 739.99, 880, 1174.66].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.06, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + idx * 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + 0.9);
      });
    } catch {}
  }

  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }
}

export const sound = new LuxuryAudioEngine();


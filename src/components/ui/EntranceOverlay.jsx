import { useState, useEffect } from 'react';
import { ArrowRight, Volume2, VolumeX, Eye } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function EntranceOverlay() {
  const { entranceState, openDoors, isSoundEnabled, toggleSound, setViewMode } = useExperienceStore();
  const [countdown, setCountdown] = useState(12);
  const totalSeconds = 12;

  // Auto-open countdown
  useEffect(() => {
    if (entranceState !== 'outside') return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleEnter();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [entranceState]);

  const handleEnter = () => {
    sound.init();
    if (isSoundEnabled) {
      sound.setMuted(false);
    }
    openDoors();
  };

  const handleSoundToggle = (e) => {
    e.stopPropagation();
    sound.playClick();
    const nextSound = !isSoundEnabled;
    toggleSound();
    sound.setMuted(!nextSound);
  };

  if (entranceState !== 'outside') return null;

  // SVG Circular progress computation
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ((totalSeconds - countdown) / totalSeconds) * circumference;

  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-between items-center pointer-events-none select-none overflow-hidden">
      {/* 1. Cinematic Vignettes (Must have pointer-events-none so raycasting clicks through to 3D doors) */}
      <div className="absolute inset-0 scene-vignette pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-44 vignette-top pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-52 vignette-bottom pointer-events-none" />

      {/* 2. Top Accent Line */}
      <div className="relative z-10 pt-20 flex flex-col items-center pointer-events-none">
        <div className="ornament-line w-44 mb-3 animate-fade-up opacity-80" />
        <div className="text-[10px] tracking-[0.4em] uppercase text-amber-300 font-semibold animate-fade-up-delay-1">
          Exclusive Event Architecture
        </div>
      </div>

      {/* 3. Center Theatrical Hero Floating Branding (pointer-events-none ensures clicking on doors works!) */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl -mt-6 pointer-events-none">
        <div className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.16em] text-zinc-100 text-glow-gold animate-fade-up-delay-1 leading-none mb-4">
          VIBE EVENTS
        </div>
        <p className="text-xs sm:text-sm md:text-base font-light tracking-[0.3em] uppercase text-zinc-300/90 max-w-2xl animate-fade-up-delay-2 mb-2">
          Where Grandeur Meets Masterpiece Production
        </p>
        <span className="text-[10px] tracking-[0.25em] uppercase text-amber-400/80 animate-fade-up-delay-3 font-semibold">
          ✦ Click either door directly to open or close ✦
        </span>
      </div>

      {/* 4. Bottom Interactive Staging (Button, Circular Timer, Minimal Controls) */}
      <div className="relative z-10 pb-12 sm:pb-16 flex flex-col items-center gap-6 px-4 pointer-events-none">
        {/* Main Enter Action Button with SVG progress halo */}
        <div className="pointer-events-auto flex items-center gap-4 animate-fade-up-delay-3">
          <button
            onClick={handleEnter}
            className="group relative px-9 sm:px-11 py-4 sm:py-5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-zinc-950 font-bold text-xs sm:text-sm tracking-[0.22em] uppercase shadow-2xl btn-glow-pulse hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
          >
            <span>Open Doors & Enter</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </button>

          {/* Circular Countdown Progress Badge */}
          <div
            onClick={handleEnter}
            className="relative w-14 h-14 rounded-full glass-pill flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            title={`Auto-entering in ${countdown}s`}
          >
            <svg className="w-14 h-14 -rotate-90">
              <circle
                cx="28"
                cy="28"
                r={radius}
                className="stroke-white/10"
                strokeWidth="2.5"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r={radius}
                className="stroke-amber-400 transition-all duration-1000 ease-linear"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-amber-300">
              {countdown}s
            </span>
          </div>
        </div>

        {/* Minimal Audio & 2D controls */}
        <div className="pointer-events-auto flex items-center gap-6 text-xs text-zinc-400 tracking-wider">
          <button
            onClick={handleSoundToggle}
            className="flex items-center gap-2 hover:text-amber-300 transition-colors cursor-pointer"
          >
            {isSoundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span className="text-zinc-200">Sound: On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-zinc-400" />
                <span>Sound: Off</span>
              </>
            )}
          </button>

          <span className="w-1 h-1 rounded-full bg-zinc-700" />

          <button
            onClick={() => {
              sound.playClick();
              setViewMode('2d');
            }}
            className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            <span>Classic 2D View</span>
          </button>
        </div>
      </div>
    </div>
  );
}

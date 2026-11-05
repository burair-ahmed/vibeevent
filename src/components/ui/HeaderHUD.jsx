import { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Calendar, Layers } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function HeaderHUD() {
  const {
    isSoundEnabled,
    toggleSound,
    viewMode,
    setViewMode,
    setActiveModal,
    setCameraWaypoint,
    entranceState,
    openDoors,
  } = useExperienceStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSoundClick = () => {
    sound.playClick();
    const nextSound = !isSoundEnabled;
    toggleSound();
    sound.setMuted(!nextSound);
  };

  const handleNavClick = (modalName) => {
    sound.playClick();
    setActiveModal(modalName);
    setMobileMenuOpen(false);
  };

  const handleModeToggle = () => {
    sound.playClick();
    const nextMode = viewMode === '3d' ? '2d' : '3d';
    setViewMode(nextMode);
  };

  const handleJumpToServices = () => {
    sound.playClick();
    if (entranceState === 'outside') {
      openDoors();
    }
    setCameraWaypoint('services');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Wordmark (No toy-box logo) */}
        <div
          onClick={() => {
            sound.playClick();
            setCameraWaypoint('entrance');
          }}
          className="pointer-events-auto flex flex-col cursor-pointer group"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-cinzel font-black tracking-[0.24em] text-lg md:text-xl text-zinc-100 transition-colors group-hover:text-amber-300">
              VIBE
            </span>
            <span className="font-cinzel font-light tracking-[0.3em] text-xs md:text-sm text-zinc-400 group-hover:text-zinc-200">
              EVENTS
            </span>
          </div>
          <div className="h-[1.5px] w-0 group-hover:w-full bg-gradient-to-r from-amber-400 to-transparent transition-all duration-300" />
        </div>

        {/* Center Desktop Navigation */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-7 text-xs font-semibold tracking-[0.2em] uppercase">
          <button
            onClick={handleJumpToServices}
            className="text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer py-1 relative group"
          >
            <span>Services Hall</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={() => handleNavClick('portfolio')}
            className="text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer py-1 relative group"
          >
            <span>Portfolio</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className="text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer py-1 relative group"
          >
            <span>Estimator</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer py-1 relative group"
          >
            <span>About</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 group-hover:w-full transition-all duration-300" />
          </button>
        </nav>

        {/* Right Controls */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* 3D vs 2D Mode Switcher */}
          <button
            onClick={handleModeToggle}
            className="glass-pill px-3.5 py-2 rounded-full text-xs font-medium tracking-wider text-zinc-300 hover:text-zinc-100 transition-all flex items-center gap-2 cursor-pointer shadow-md"
            title="Toggle between 3D Spatial Walkthrough and Classic 2D View"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{viewMode === '3d' ? '3D' : '2D'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundClick}
            className={`w-9 h-9 rounded-full glass-pill flex items-center justify-center transition-all cursor-pointer ${
              isSoundEnabled ? 'text-amber-400 border-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.25)]' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title={isSoundEnabled ? 'Mute Audio' : 'Enable Audio'}
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Book Now Consultation CTA */}
          <button
            onClick={() => handleNavClick('booking')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-zinc-950 font-bold text-xs tracking-wider uppercase shadow-xl btn-glow-pulse hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Event</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full glass-pill flex items-center justify-center text-zinc-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 p-5 rounded-2xl glass-panel-gold border border-amber-500/30 flex flex-col gap-3.5 animate-fade-up">
          <button
            onClick={handleJumpToServices}
            className="w-full text-left px-3 py-2 text-xs font-semibold tracking-widest uppercase text-zinc-200 hover:text-amber-300"
          >
            Services Exhibition Hall
          </button>
          <button
            onClick={() => handleNavClick('portfolio')}
            className="w-full text-left px-3 py-2 text-xs font-semibold tracking-widest uppercase text-zinc-200 hover:text-amber-300"
          >
            Masterpiece Portfolio
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className="w-full text-left px-3 py-2 text-xs font-semibold tracking-widest uppercase text-zinc-200 hover:text-amber-300"
          >
            Event Cost Estimator
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left px-3 py-2 text-xs font-semibold tracking-widest uppercase text-zinc-200 hover:text-amber-300"
          >
            About Vibe Events
          </button>
          <button
            onClick={() => handleNavClick('booking')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold text-center text-xs tracking-wider uppercase shadow-md mt-2"
          >
            Inquire & Book Event
          </button>
        </div>
      )}
    </header>
  );
}

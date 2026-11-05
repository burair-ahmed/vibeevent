import { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { sound } from '../../utils/audioSystem';

export default function WaypointDock() {
  const { entranceState, cameraWaypoint, setCameraWaypoint, closeServiceDrawer, activeService } = useExperienceStore();
  const [showHint, setShowHint] = useState(true);

  // Fade out interaction hint after 5 seconds
  useEffect(() => {
    if (entranceState === 'inside') {
      const timer = setTimeout(() => setShowHint(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [entranceState]);

  if (entranceState !== 'inside') return null;

  const handleWaypoint = (wp) => {
    sound.playClick();
    if (activeService) {
      closeServiceDrawer();
    }
    setCameraWaypoint(wp);
  };

  const waypoints = [
    { id: 'entrance', label: 'Entrance Portal' },
    { id: 'hall', label: 'Grand Hall' },
    { id: 'services', label: 'Service Pods' },
    { id: 'stage', label: 'VIP Stage' },
  ];

  return (
    <>
      {/* 1. Desktop Vertical Spatial Dock (Left edge) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4 pointer-events-auto">
        <div className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-1 pl-2">
          Waypoints
        </div>
        <div className="flex flex-col gap-2 p-2 rounded-2xl glass-panel border border-white/10 shadow-2xl backdrop-blur-2xl">
          {waypoints.map((wp) => {
            const isActive = cameraWaypoint === wp.id && !activeService;
            return (
              <button
                key={wp.id}
                onClick={() => handleWaypoint(wp.id)}
                className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400/15 border border-amber-400/40 text-amber-300'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24] scale-125'
                      : 'bg-zinc-600 group-hover:bg-zinc-400'
                  }`}
                />
                <span className="text-[11px] font-semibold tracking-[0.16em] uppercase whitespace-nowrap">
                  {wp.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Mobile Bottom Horizontal Dock */}
      <div className="fixed bottom-6 left-0 right-0 z-30 md:hidden flex justify-center pointer-events-none px-4">
        <div className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full glass-pill border border-white/15 shadow-2xl backdrop-blur-xl">
          {waypoints.map((wp) => {
            const isActive = cameraWaypoint === wp.id && !activeService;
            return (
              <button
                key={wp.id}
                onClick={() => handleWaypoint(wp.id)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {wp.label.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Subtle Interaction Hint Toast (fades after 5s) */}
      {showHint && (
        <div className="fixed bottom-6 right-6 z-30 pointer-events-none transition-opacity duration-1000 hidden sm:block">
          <div className="px-3.5 py-2 rounded-full glass-panel border border-white/10 text-[10px] text-zinc-400 flex items-center gap-2.5 shadow-xl">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '9s' }} />
            <span>Drag mouse or swipe to look around • Click glowing pods to inspect</span>
          </div>
        </div>
      )}
    </>
  );
}

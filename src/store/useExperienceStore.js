import { useState, useEffect } from 'react';

// Simple, fast reactive global store without heavy extra state libraries
let globalState = {
  entranceState: 'outside', // 'outside' | 'opening' | 'inside'
  doorAngle: 0, // 0 (closed) to 1.45 rad (~85 deg open)
  activeService: null,
  activeModal: null, // 'portfolio' | 'calculator' | 'about' | 'booking' | null
  isSoundEnabled: false,
  viewMode: '3d', // '3d' | '2d'
  cameraWaypoint: 'entrance', // 'entrance' | 'hall' | 'services' | 'stage'
  isMobile: false,
};

const listeners = new Set();

function notifyListeners() {
  listeners.forEach((listener) => listener({ ...globalState }));
}

export function setExperienceState(updater) {
  if (typeof updater === 'function') {
    globalState = { ...globalState, ...updater(globalState) };
  } else {
    globalState = { ...globalState, ...updater };
  }
  notifyListeners();
}

export function useExperienceStore() {
  const [state, setState] = useState({ ...globalState });

  useEffect(() => {
    listeners.add(setState);
    return () => listeners.delete(setState);
  }, []);

  // Quick action helpers
  const openDoors = () => {
    if (globalState.entranceState !== 'outside') return;
    setExperienceState({ entranceState: 'opening' });
  };

  const finishDoorEntrance = () => {
    setExperienceState({ entranceState: 'inside', cameraWaypoint: 'hall' });
  };

  const setActiveService = (service) => {
    setExperienceState({ activeService: service });
  };

  const closeServiceDrawer = () => {
    setExperienceState({ activeService: null });
  };

  const setActiveModal = (modalName) => {
    setExperienceState({ activeModal: modalName });
  };

  const closeModal = () => {
    setExperienceState({ activeModal: null });
  };

  const toggleSound = () => {
    setExperienceState((prev) => ({ isSoundEnabled: !prev.isSoundEnabled }));
  };

  const setViewMode = (mode) => {
    setExperienceState({ viewMode: mode });
  };

  const setCameraWaypoint = (waypoint) => {
    setExperienceState({ 
      cameraWaypoint: waypoint,
      // If jumping to hall or services while outside, also ensure doors are open
      entranceState: globalState.entranceState === 'outside' && waypoint !== 'entrance' ? 'inside' : globalState.entranceState
    });
  };

  return {
    ...state,
    openDoors,
    finishDoorEntrance,
    setActiveService,
    closeServiceDrawer,
    setActiveModal,
    closeModal,
    toggleSound,
    setViewMode,
    setCameraWaypoint,
  };
}


import { useState, useEffect } from 'react';

// Simple, fast reactive global store without heavy extra state libraries
let globalState = {
  entranceState: 'outside', // 'outside' | 'opening' | 'inside'
  leftDoorOpen: false,      // independent left door state (true = open, false = closed)
  rightDoorOpen: false,     // independent right door state (true = open, false = closed)
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

  // Open both doors and transition inside
  const openDoors = () => {
    setExperienceState({
      entranceState: 'opening',
      leftDoorOpen: true,
      rightDoorOpen: true,
    });
  };

  // Toggle individual doors cleanly
  const toggleLeftDoor = () => {
    setExperienceState((prev) => ({
      leftDoorOpen: !prev.leftDoorOpen,
    }));
  };

  const toggleRightDoor = () => {
    setExperienceState((prev) => ({
      rightDoorOpen: !prev.rightDoorOpen,
    }));
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
      entranceState: globalState.entranceState === 'outside' && waypoint !== 'entrance' ? 'inside' : globalState.entranceState,
      leftDoorOpen: waypoint !== 'entrance' ? true : globalState.leftDoorOpen,
      rightDoorOpen: waypoint !== 'entrance' ? true : globalState.rightDoorOpen,
    });
  };

  return {
    ...state,
    openDoors,
    toggleLeftDoor,
    toggleRightDoor,
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

export const motion = {
  fast: 150, // state feedback: press, toggle
  base: 250, // element transitions: enter/exit
  slow: 400, // large surfaces: sheets, screens
} as const;

// Shared pressed/disabled feedback for every tappable component.
export const states = {
  pressedOpacity: 0.7,
  disabledOpacity: 0.4,
} as const;

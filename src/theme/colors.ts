// Brand palette from the design system reference. Light only for now: a dark
// palette is added as a second object here, not by changing components.
const light = {
  primary: "#020617",
  secondary: "#6366F1",
  accent: "#E0E7FF",
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
  surface: "#F1F5F9",
  background: "#FAFAFC",
  gradientStart: "#6366F1",
  gradientEnd: "#A5B4FC",

  card: "#FFFFFF",
  border: "#E2E8F0",
  borderStrong: "#CBD5E1",
  onPrimary: "#FFFFFF",
  accentSoft: "#EEF2FF",
  accentStrong: "#C7D2FE",
  // Status: `x` fills icons, `xSoft` is the background, `xLine` the border, and
  // `xText` is the darker shade that keeps small text at 4.5:1 on `xSoft`.
  success: "#16A34A",
  successSoft: "#DCFCE7",
  successLine: "#BBF7D0",
  successText: "#15803D",
  warning: "#F59E0B",
  warningSoft: "#FEF3C7",
  warningLine: "#FDE68A",
  warningText: "#B45309",
  danger: "#DC2626",
  dangerSoft: "#FEE2E2",
  dangerLine: "#FECACA",
  dangerText: "#B91C1C",
  overlayOnDark: "rgba(255, 255, 255, 0.12)",
  glass: "rgba(255, 255, 255, 0.88)",
  transparent: "transparent",
} as const;

export const colors = light;

export type ColorToken = keyof typeof colors;

export const gradients = {
  brand: [colors.gradientStart, colors.gradientEnd],
  accountLight: [colors.accentSoft, colors.accentStrong],
  // `background` from nearly opaque to clear, so overlaid text reads on any photo.
  heroFade: ["rgba(250, 250, 252, 0.95)", "rgba(250, 250, 252, 0)"],
} as const;

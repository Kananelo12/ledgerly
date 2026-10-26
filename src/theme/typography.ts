import type { TextStyle } from "react-native";

// Weight comes from the font family name (one static file per weight), so
// fontWeight is never set: Android would otherwise fall back to the system font.
export const fonts = {
  displayBold: "SpaceGrotesk_700Bold",
  displaySemiBold: "SpaceGrotesk_600SemiBold",
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
} as const;

export const type = {
  display: { fontFamily: fonts.displayBold, fontSize: 56, lineHeight: 56, letterSpacing: -1 },
  wordmark: { fontFamily: fonts.displayBold, fontSize: 40, lineHeight: 44, letterSpacing: -1 },
  wordmarkSm: { fontFamily: fonts.displayBold, fontSize: 24, lineHeight: 28, letterSpacing: -0.5 },
  headingLarge: { fontFamily: fonts.displayBold, fontSize: 32, lineHeight: 38, letterSpacing: -0.5 },
  heading: { fontFamily: fonts.displaySemiBold, fontSize: 28, lineHeight: 34 },
  amount: { fontFamily: fonts.displaySemiBold, fontSize: 24, lineHeight: 30 },
  lead: { fontFamily: fonts.regular, fontSize: 20, lineHeight: 26 },
  title: { fontFamily: fonts.semiBold, fontSize: 16, lineHeight: 22 },
  body: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24 },
  button: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 19 },
  caption: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20 },
  small: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16 },
  smallMedium: { fontFamily: fonts.medium, fontSize: 12, lineHeight: 16 },
} as const satisfies Record<string, TextStyle>;

export type TextVariant = keyof typeof type;

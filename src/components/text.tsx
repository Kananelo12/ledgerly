import { Text as RNText, type TextProps as RNTextProps } from "react-native";

import { colors, type, type ColorToken, type TextVariant } from "@/theme";

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  color?: ColorToken;
};

export function Text({ variant = "body", color = "textPrimary", style, ...props }: TextProps) {
  return <RNText style={[type[variant], { color: colors[color] }, style]} {...props} />;
}

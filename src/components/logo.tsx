import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, sizes, spacing } from "@/theme";

import { Text } from "./text";

const variants = {
  md: { mark: sizes.logoMark.md, text: "wordmarkSm", gap: spacing.sm, corner: radius.sm },
  lg: { mark: sizes.logoMark.lg, text: "wordmark", gap: spacing.md, corner: radius.lg },
} as const;

// TODO: logo mark. Replace the placeholder tile with the brand mark from
// assets/ once it is provided (the "L" mark in the design reference).
export function Logo({ size = "lg", style }: { size?: keyof typeof variants; style?: StyleProp<ViewStyle> }) {
  const v = variants[size];

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel="Ledgerly"
      style={[styles.row, { gap: v.gap }, style]}
    >
      <View style={[styles.markPlaceholder, { width: v.mark, height: v.mark, borderRadius: v.corner }]}>
        <Text variant={v.text} color="onPrimary">
          L
        </Text>
      </View>
      <Text variant={v.text} color="primary">
        Ledgerly
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  markPlaceholder: {
    borderCurve: "continuous",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

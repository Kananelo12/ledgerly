import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, sizes, spacing } from "@/theme";

export type PageDotsProps = {
  count: number;
  index: number;
  // Round dots for carousels, short bars for onboarding.
  variant?: "dot" | "bar";
  style?: StyleProp<ViewStyle>;
};

export function PageDots({ count, index, variant = "dot", style }: PageDotsProps) {
  const bar = variant === "bar";

  return (
    <View
      accessible
      accessibilityLabel={`${bar ? "Slide" : "Page"} ${index + 1} of ${count}`}
      style={[styles.row, bar && styles.barRow, style]}
    >
      {Array.from({ length: count }, (_, i) => (
        <View
          key={i}
          style={[
            bar ? styles.bar : styles.dot,
            { backgroundColor: colors[i === index ? "primary" : bar ? "borderStrong" : "border"] },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "center", gap: spacing.sm },
  barRow: { justifyContent: "flex-start" },
  dot: { width: sizes.dot, height: sizes.dot, borderRadius: radius.full },
  bar: { width: sizes.pageBar.width, height: sizes.pageBar.height, borderRadius: radius.full },
});

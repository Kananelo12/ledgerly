import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, sizes, type ColorToken } from "@/theme";

const tones = {
  primary: "primary",
  warning: "warning",
  danger: "danger",
} as const satisfies Record<string, ColorToken>;

export type ProgressBarProps = {
  // 0 to 1; values outside are clamped.
  value: number;
  tone?: keyof typeof tones;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

// Color alone never carries the state: callers always show the percentage or a
// status text next to the bar.
export function ProgressBar({ value, tone = "primary", accessibilityLabel, style }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, value));
  const percent = Math.round(clamped * 100);

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: percent, text: `${percent}%` }}
      style={[styles.track, style]}
    >
      <View style={[styles.fill, { width: `${percent}%`, backgroundColor: colors[tones[tone]] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: sizes.progress,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  fill: { height: "100%", borderRadius: radius.full },
});

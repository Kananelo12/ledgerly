import type { LucideIcon } from "lucide-react-native";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, sizes, spacing, type ColorToken } from "@/theme";

import { Icon } from "./icon";
import { Text } from "./text";

const tones = {
  accent: { bg: "accent", fg: "secondary" },
  info: { bg: "accentSoft", fg: "secondary" },
  neutral: { bg: "surface", fg: "textPrimary" },
  warning: { bg: "warningSoft", fg: "warningText" },
  success: { bg: "successSoft", fg: "successText" },
  primary: { bg: "primary", fg: "onPrimary" },
  danger: { bg: "dangerSoft", fg: "dangerText" },
} as const satisfies Record<string, { bg: ColorToken; fg: ColorToken }>;

export type BadgeProps = {
  label: string;
  tone?: keyof typeof tones;
  icon?: LucideIcon;
  // A small leading dot in the tone color ("New").
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Badge({ label, tone = "neutral", icon, dot = false, style }: BadgeProps) {
  const t = tones[tone];

  return (
    <View style={[styles.badge, { backgroundColor: colors[t.bg] }, style]}>
      {dot ? <View style={[styles.dot, { backgroundColor: colors[t.fg] }]} /> : null}
      {icon ? <Icon icon={icon} size="sm" color={t.fg} /> : null}
      <Text variant="caption" color={t.fg}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing.sm,
    minHeight: sizes.tag,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  dot: { width: sizes.dot, height: sizes.dot, borderRadius: radius.full },
});

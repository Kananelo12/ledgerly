import { Check, X } from "lucide-react-native";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, sizes, spacing, type ColorToken } from "@/theme";

import { Icon } from "./icon";
import { Text } from "./text";

const tones = {
  success: { fill: "success", bg: "successSoft", line: "successLine", text: "successText" },
  warning: { fill: "warning", bg: "warningSoft", line: "warningLine", text: "warningText" },
  danger: { fill: "danger", bg: "dangerSoft", line: "dangerLine", text: "dangerText" },
} as const satisfies Record<string, Record<string, ColorToken>>;

export type BannerProps = {
  tone: keyof typeof tones;
  message: string;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
};

// The icon shape differs by tone (check vs "!") so status never relies on color alone.
export function Banner({ tone, message, onDismiss, style }: BannerProps) {
  const t = tones[tone];

  return (
    <View
      accessibilityRole="alert"
      style={[styles.banner, { backgroundColor: colors[t.bg], borderColor: colors[t.line] }, style]}
    >
      <View style={[styles.status, { backgroundColor: colors[t.fill] }]}>
        {tone === "success" ? (
          <Icon icon={Check} size="xs" color="onPrimary" strokeWidth={3} />
        ) : (
          // Lucide has no bare "!" glyph, so it is set as text inside the filled circle.
          <Text variant="smallMedium" color="onPrimary" maxFontSizeMultiplier={1}>
            !
          </Text>
        )}
      </View>
      <Text variant="small" color={t.text} style={styles.message}>
        {message}
      </Text>
      {onDismiss ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          onPress={onDismiss}
          hitSlop={spacing.md}
        >
          <Icon icon={X} size="sm" color={t.text} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    minHeight: sizes.iconButtonSm,
    borderRadius: radius.md,
    borderCurve: "continuous",
    borderWidth: sizes.hairline,
  },
  status: {
    width: sizes.statusIcon,
    height: sizes.statusIcon,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  message: { flex: 1 },
});

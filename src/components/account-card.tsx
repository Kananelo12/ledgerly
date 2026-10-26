import { LinearGradient } from "expo-linear-gradient";
import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, gradients, radius, sizes, spacing, states } from "@/theme";

import { Icon } from "./icon";
import { Text } from "./text";

const tones = {
  dark: { text: "onPrimary", muted: "onPrimary", tile: "transparent", tileIcon: "onPrimary", chevron: "overlayOnDark", chevronIcon: "onPrimary" },
  light: { text: "textPrimary", muted: "textSecondary", tile: "secondary", tileIcon: "onPrimary", chevron: "card", chevronIcon: "textPrimary" },
} as const;

export type AccountCardProps = {
  tone?: keyof typeof tones;
  icon: LucideIcon;
  title: string;
  last4: string;
  // Already formatted by the caller (currency and locale are not this component's job).
  amount: string;
  caption: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function AccountCard({
  tone = "dark",
  icon,
  title,
  last4,
  amount,
  caption,
  onPress,
  style,
}: AccountCardProps) {
  const t = tones[tone];

  const content = (
    <>
      <View style={styles.header}>
        <View style={[styles.tile, { backgroundColor: colors[t.tile] }]}>
          <Icon icon={icon} size="md" color={t.tileIcon} />
        </View>
        <View style={styles.headerText}>
          <Text variant="caption" color={t.text}>
            {title}
          </Text>
          <Text variant="small" color={t.muted}>
            •••• {last4}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.headerText}>
          <Text variant="amount" color={t.text}>
            {amount}
          </Text>
          <Text variant="small" color={t.muted}>
            {caption}
          </Text>
        </View>
        <View style={[styles.chevron, { backgroundColor: colors[t.chevron] }]}>
          <Icon icon={ChevronRight} size="sm" color={t.chevronIcon} />
        </View>
      </View>
    </>
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ending ${last4}, ${amount} ${caption}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        tone === "dark" && { backgroundColor: colors.primary },
        { opacity: pressed ? states.pressedOpacity : 1 },
        style,
      ]}
    >
      {tone === "light" ? (
        <LinearGradient
          colors={gradients.accountLight}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: sizes.accountCard.width,
    minHeight: sizes.accountCard.minHeight,
    padding: spacing.lg,
    gap: spacing.lg,
    justifyContent: "space-between",
    borderRadius: radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  header: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  headerText: { flexShrink: 1, gap: spacing.xxs },
  tile: {
    width: sizes.iconTile,
    height: sizes.iconTile,
    borderRadius: radius.md,
    borderCurve: "continuous",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" },
  chevron: {
    width: sizes.avatar,
    height: sizes.avatar,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
});

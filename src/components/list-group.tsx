import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { Children, Fragment, type ReactNode } from "react";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, sizes, spacing } from "@/theme";

import { Icon } from "./icon";
import { Text } from "./text";

// Rows share one background and are split by hairlines inset past the icon.
export function ListGroup({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const rows = Children.toArray(children);
  return (
    <View style={[styles.group, style]}>
      {rows.map((row, i) => (
        <Fragment key={i}>
          {i > 0 ? <View style={styles.separator} /> : null}
          {row}
        </Fragment>
      ))}
    </View>
  );
}

export type ListRowProps = {
  icon: LucideIcon;
  label: string;
  // Shows the icon white on a dark circle, as the design does for the profile row.
  avatar?: boolean;
  onPress?: () => void;
};

export function ListRow({ icon, label, avatar = false, onPress }: ListRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.surface }]}
    >
      <View style={[styles.iconSlot, avatar && styles.avatar]}>
        <Icon icon={icon} size={avatar ? "md" : "lg"} color={avatar ? "onPrimary" : "textPrimary"} />
      </View>
      <Text variant="caption" style={styles.label}>
        {label}
      </Text>
      <Icon icon={ChevronRight} size="md" color="textSecondary" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  group: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  separator: {
    height: sizes.hairline,
    backgroundColor: colors.border,
    marginLeft: spacing.lg + sizes.avatar + spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: sizes.row,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  iconSlot: { width: sizes.avatar, height: sizes.avatar, alignItems: "center", justifyContent: "center" },
  avatar: { borderRadius: radius.full, backgroundColor: colors.primary },
  label: { flex: 1 },
});

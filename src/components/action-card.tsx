import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, shadows, sizes, spacing } from "@/theme";

import { Icon } from "./icon";
import { Text } from "./text";

export type ActionCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function ActionCard({ icon, title, description, onPress, style }: ActionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${description}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors[pressed ? "surface" : "card"] },
        style,
      ]}
    >
      <View style={styles.tile}>
        <Icon icon={icon} size="md" color="secondary" />
      </View>
      <View style={styles.text}>
        <Text variant="caption">{title}</Text>
        <Text variant="small" color="textSecondary">
          {description}
        </Text>
      </View>
      <Icon icon={ChevronRight} size="md" color="secondary" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderCurve: "continuous",
    borderWidth: sizes.hairline,
    borderColor: colors.border,
    boxShadow: shadows.card,
  },
  tile: {
    width: sizes.iconTile,
    height: sizes.iconTile,
    borderRadius: radius.md,
    borderCurve: "continuous",
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { flex: 1, gap: spacing.xxs },
});

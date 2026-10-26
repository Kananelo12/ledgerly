import type { LucideIcon } from "lucide-react-native";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, sizes, spacing } from "@/theme";

import { Icon } from "./icon";
import { Text } from "./text";

export type ChipProps = {
  label: string;
  icon?: LucideIcon;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Chip({ label, icon, selected = false, onPress, style }: ChipProps) {
  const fg = selected ? "onPrimary" : "textPrimary";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: sizes.chip,
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.sm,
          borderRadius: radius.full,
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.sm,
          backgroundColor: colors[selected ? "primary" : pressed ? "border" : "surface"],
        },
        style,
      ]}
    >
      {icon ? <Icon icon={icon} size="md" color={fg} /> : null}
      <Text variant="caption" color={fg}>
        {label}
      </Text>
    </Pressable>
  );
}

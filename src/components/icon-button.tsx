import type { LucideIcon } from "lucide-react-native";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, sizes, spacing, states } from "@/theme";

import { Icon } from "./icon";

const dimensions = {
  md: { box: sizes.iconButton, icon: "lg" },
  sm: { box: sizes.iconButtonSm, icon: "md" },
} as const;

export type IconButtonProps = {
  icon: LucideIcon;
  // Required: an icon-only control has no visible text for screen readers.
  accessibilityLabel: string;
  size?: keyof typeof dimensions;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  icon,
  accessibilityLabel,
  size = "md",
  selected,
  disabled = false,
  onPress,
  style,
}: IconButtonProps) {
  const d = dimensions[size];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled, selected }}
      disabled={disabled}
      onPress={onPress}
      hitSlop={size === "sm" ? spacing.xs : 0}
      style={({ pressed }) => [
        {
          width: d.box,
          height: d.box,
          borderRadius: radius.full,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors[selected ? "primary" : pressed ? "border" : "surface"],
          opacity: disabled ? states.disabledOpacity : 1,
        },
        style,
      ]}
    >
      <Icon icon={icon} size={d.icon} color={selected ? "onPrimary" : "textPrimary"} />
    </Pressable>
  );
}

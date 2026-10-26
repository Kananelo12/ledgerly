import type { LucideIcon } from "lucide-react-native";

import { colors, sizes, type ColorToken, type IconSize } from "@/theme";

export type IconProps = {
  icon: LucideIcon;
  size?: IconSize;
  color?: ColorToken;
  strokeWidth?: number;
};

// Decorative by default: the control that contains the icon carries the label.
export function Icon({
  icon: LucideComponent,
  size = "md",
  color = "textPrimary",
  strokeWidth = sizes.iconStroke,
}: IconProps) {
  return (
    <LucideComponent
      size={sizes.icon[size]}
      color={colors[color]}
      strokeWidth={strokeWidth}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
}

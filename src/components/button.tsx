import type { LucideIcon } from "lucide-react-native";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, radius, sizes, spacing, states, type ColorToken } from "@/theme";

import { Icon } from "./icon";
import { Text } from "./text";

const variants = {
  primary: { background: "primary", pressed: "primary", text: "onPrimary", icon: "onPrimary" },
  secondary: { background: "accent", pressed: "accentStrong", text: "textPrimary", icon: "secondary" },
} as const satisfies Record<string, Record<string, ColorToken>>;

export type ButtonProps = {
  title: string;
  variant?: keyof typeof variants;
  icon?: LucideIcon;
  trailingIcon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  variant = "primary",
  icon,
  trailingIcon,
  loading = false,
  disabled = false,
  onPress,
  style,
}: ButtonProps) {
  const v = variants[variant];
  const inactive = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: colors[pressed && variant !== "primary" ? v.pressed : v.background],
          opacity: disabled
            ? states.disabledOpacity
            : pressed && variant === "primary"
              ? states.pressedOpacity
              : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors[v.text]} />
      ) : (
        <>
          {icon ? <Icon icon={icon} size="lg" color={v.icon} /> : null}
          <Text variant="button" color={v.text}>
            {title}
          </Text>
          {trailingIcon ? (
            <View style={styles.trailing}>
              <Icon icon={trailingIcon} size="lg" color={v.icon} />
            </View>
          ) : null}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: sizes.control,
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  // The design keeps the label centered and pins the trailing arrow to the edge.
  trailing: { position: "absolute", right: spacing.xxl },
});

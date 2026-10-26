import { Eye, EyeOff, type LucideIcon } from "lucide-react-native";
import { useState, type Ref } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";

import { colors, fonts, radius, sizes, spacing, type } from "@/theme";

import { Icon } from "./icon";

export type TextFieldProps = Omit<TextInputProps, "style" | "secureTextEntry"> & {
  icon?: LucideIcon;
  // Hides the value and adds a show/hide toggle.
  secure?: boolean;
  ref?: Ref<TextInput>;
  style?: StyleProp<ViewStyle>;
};

export function TextField({
  icon,
  secure = false,
  ref,
  style,
  onFocus,
  onBlur,
  placeholder,
  accessibilityLabel,
  ...props
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  return (
    <View
      style={[
        styles.container,
        { borderColor: colors[focused ? "secondary" : "border"] },
        style,
      ]}
    >
      {icon ? <Icon icon={icon} size="lg" color="textPrimary" /> : null}
      <TextInput
        {...props}
        ref={ref}
        placeholder={placeholder}
        numberOfLines={1}
        accessibilityLabel={accessibilityLabel ?? placeholder}
        placeholderTextColor={colors.textSecondary}
        cursorColor={colors.secondary}
        selectionColor={colors.accentStrong}
        secureTextEntry={secure && hidden}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={styles.input}
      />
      {secure ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={hidden ? "Show password" : "Hide password"}
          onPress={() => setHidden((h) => !h)}
          hitSlop={spacing.md}
        >
          <Icon icon={hidden ? EyeOff : Eye} size="lg" color="textPrimary" />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: sizes.control,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderCurve: "continuous",
    borderWidth: sizes.focusBorder,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    // lineHeight is left out: on Android it misaligns single-line input text.
    fontFamily: fonts.regular,
    fontSize: type.body.fontSize,
    color: colors.textPrimary,
    paddingVertical: spacing.md,
  },
});

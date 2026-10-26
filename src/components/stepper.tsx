import { Minus, Plus, type LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, sizes, spacing, states } from "@/theme";

import { Icon } from "./icon";
import { Text } from "./text";

export type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  accessibilityLabel: string;
  min?: number;
  max?: number;
  step?: number;
  style?: StyleProp<ViewStyle>;
};

export function Stepper({
  value,
  onChange,
  accessibilityLabel,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  style,
}: StepperProps) {
  const canDecrement = value - step >= min;
  const canIncrement = value + step <= max;
  const decrement = () => canDecrement && onChange(value - step);
  const increment = () => canIncrement && onChange(value + step);

  return (
    // One adjustable element for screen readers: swipe up/down to change.
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ text: String(value) }}
      accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
      onAccessibilityAction={(e) =>
        e.nativeEvent.actionName === "increment" ? increment() : decrement()
      }
      style={[styles.container, style]}
    >
      <StepButton icon={Minus} enabled={canDecrement} onPress={decrement} />
      <Text variant="title" style={styles.value}>
        {value}
      </Text>
      <StepButton icon={Plus} enabled={canIncrement} onPress={increment} />
    </View>
  );
}

function StepButton({
  icon,
  enabled,
  onPress,
}: {
  icon: LucideIcon;
  enabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      disabled={!enabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && { backgroundColor: colors.border },
        !enabled && { opacity: states.disabledOpacity },
      ]}
    >
      <Icon icon={icon} size="lg" color="textPrimary" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    minHeight: sizes.stepper,
    paddingHorizontal: spacing.xxs,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
  button: {
    width: sizes.iconButtonSm,
    height: sizes.iconButtonSm,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  value: { minWidth: sizes.iconButtonSm, textAlign: "center" },
});

import { useEffect } from "react";
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { colors, motion, radius, shadows, sizes, spacing, states } from "@/theme";

const { width, height, thumb } = sizes.toggle;
const inset = (height - thumb) / 2;
const travel = width - thumb - inset * 2;

export type ToggleProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  // Required: the switch has no visible text of its own.
  accessibilityLabel: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Toggle({ value, onValueChange, accessibilityLabel, disabled = false, style }: ToggleProps) {
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: motion.fast });
  }, [value, progress]);

  // Static hex values (not PlatformColor), as Reanimated requires.
  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [colors.accentStrong, colors.secondary]),
  }));
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * travel }],
  }));

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      hitSlop={spacing.sm}
      style={[{ opacity: disabled ? states.disabledOpacity : 1 }, style]}
    >
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: { width, height, borderRadius: radius.full, padding: inset },
  thumb: {
    width: thumb,
    height: thumb,
    borderRadius: radius.full,
    backgroundColor: colors.card,
    boxShadow: shadows.raised,
  },
});

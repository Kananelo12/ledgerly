import type { LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, shadows, sizes, spacing } from "@/theme";

import { Icon } from "./icon";
import { Text } from "./text";

export type TabBarItem<K extends string> = { key: K; label: string; icon: LucideIcon };

export type TabBarProps<K extends string> = {
  items: readonly TabBarItem<K>[];
  activeKey: K;
  onSelect: (key: K) => void;
  style?: StyleProp<ViewStyle>;
};

// Floating pill tab bar. Navigation-agnostic: Expo Router's Tabs `tabBar` prop
// maps its state onto `activeKey` and `onSelect`.
export function TabBar<K extends string>({ items, activeKey, onSelect, style }: TabBarProps<K>) {
  return (
    <View accessibilityRole="tablist" style={[styles.bar, style]}>
      {items.map((item) => {
        const selected = item.key === activeKey;
        const fg = selected ? "onPrimary" : "textSecondary";
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityLabel={item.label}
            accessibilityState={{ selected }}
            onPress={() => onSelect(item.key)}
            style={({ pressed }) => [
              styles.tab,
              selected && { backgroundColor: colors.primary },
              !selected && pressed && { backgroundColor: colors.surface },
            ]}
          >
            <Icon icon={item.icon} size="md" color={fg} />
            {/* Chrome with four fixed slots: let labels grow a little, then stop. */}
            <Text variant="smallMedium" color={fg} maxFontSizeMultiplier={1.3} numberOfLines={1}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    minHeight: sizes.tabBar,
    padding: spacing.xs,
    gap: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.card,
    boxShadow: shadows.raised,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxs,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
});

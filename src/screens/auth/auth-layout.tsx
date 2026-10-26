import type { ReactNode } from "react";
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Logo } from "@/components/logo";
import { Text } from "@/components/text";
import { colors, sizes, spacing, states } from "@/theme";

export type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: { prompt: string; action: string; onPress: () => void };
};

// Shared frame for sign up and sign in: logo, title, form, and a switch link.
export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    // Android is edge-to-edge, so the window doesn't resize for the keyboard:
    // padding is needed on both platforms.
    <KeyboardAvoidingView style={styles.flex} behavior="padding">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.sm, paddingBottom: insets.bottom + spacing.xxl },
        ]}
      >
        <Logo size="md" style={styles.logo} />
        <View style={styles.heading}>
          <Text variant="headingLarge" color="primary" accessibilityRole="header">
            {title}
          </Text>
          <Text color="textSecondary">{subtitle}</Text>
        </View>
        <View style={styles.form}>{children}</View>
        <View style={styles.footer}>
          <Text variant="caption" color="textSecondary">
            {footer.prompt}
          </Text>
          <Pressable
            accessibilityRole="link"
            onPress={footer.onPress}
            hitSlop={spacing.md}
            style={({ pressed }) => ({ opacity: pressed ? states.pressedOpacity : 1 })}
          >
            <Text variant="caption" color="secondary">
              {footer.action}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, paddingHorizontal: spacing.xxl, gap: spacing.xxxl },
  logo: { minHeight: sizes.row },
  heading: { gap: spacing.sm },
  form: { gap: spacing.lg },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.xs,
    marginTop: "auto",
  },
});

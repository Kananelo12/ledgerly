import { CircleAlert } from "lucide-react-native";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { Badge } from "@/components/badge";
import { Icon } from "@/components/icon";
import { ProgressBar } from "@/components/progress-bar";
import { Text } from "@/components/text";
import { colors, radius, shadows, spacing } from "@/theme";

import type { ExampleCardData } from "./slides";

// Floating "glass" card on the onboarding photo. Read as one element.
export function ExampleCard({ card, style }: { card: ExampleCardData; style?: StyleProp<ViewStyle> }) {
  return (
    <View accessible accessibilityLabel={card.summary} style={[styles.card, style]}>
      <View style={styles.header}>
        <Icon icon={card.icon} size="md" color="textPrimary" />
        <View style={styles.headerText}>
          <Text variant="small" color="textSecondary">
            {card.label}
          </Text>
          <Text variant="caption">{card.title}</Text>
        </View>
      </View>

      {card.kind === "logged" ? (
        <View style={styles.row}>
          <Badge label={card.category} tone="accent" />
          <Text variant="smallMedium">{card.detail}</Text>
        </View>
      ) : (
        <>
          <View style={styles.row}>
            <ProgressBar value={card.value} tone={card.tone} style={styles.bar} />
            <Text variant="smallMedium">{Math.round(card.value * 100)}%</Text>
          </View>
          <Text variant="smallMedium">
            {card.spent}
            <Text variant="small" color="textSecondary">
              {" "}/ {card.limit}
            </Text>
          </Text>
          {card.status ? (
            <View style={styles.status}>
              <Icon icon={CircleAlert} size="sm" color="warningText" />
              <Text variant="smallMedium" color="warningText">
                {card.status}
              </Text>
            </View>
          ) : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderCurve: "continuous",
    backgroundColor: colors.glass,
    boxShadow: shadows.raised,
  },
  header: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  headerText: { flex: 1, gap: spacing.xxs },
  row: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: spacing.md },
  bar: { flex: 1 },
  status: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
});

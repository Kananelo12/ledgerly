import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { PageDots } from "@/components/page-dots";
import { Text } from "@/components/text";
import { colors, gradients, sizes, spacing } from "@/theme";

import { ExampleCard } from "./example-card";
import { SheetCurve } from "./sheet-curve";
import type { Slide as SlideData } from "./slides";

// Card sits about a fifth of the way down the screen, as in the design.
const CARD_TOP = 0.22;
const CARD_WIDTH = 0.7;
const CARD_MIN_WIDTH = 240;
const CARD_MAX_WIDTH = 320;
// Keeps the sheet edge near 60% down the screen when the copy is short.
const SHEET_MIN_HEIGHT = 0.34;
// The design sets the copy in a narrower column than the screen.
const TEXT_MAX_WIDTH = 300;
const FADE_HEIGHT = 0.3;

export type SlideProps = {
  slide: SlideData;
  index: number;
  count: number;
  width: number;
  height: number;
  // Space kept free at the bottom for the fixed button.
  bottomReserve: number;
};

export function Slide({ slide, index, count, width, height, bottomReserve }: SlideProps) {
  const [heroHeight, setHeroHeight] = useState(height);
  const [cardHeight, setCardHeight] = useState(0);
  const cardTop = height * CARD_TOP;
  // With very large text the card would run under the sheet curve: hide it.
  // It stays mounted (invisible) so its height is still measured.
  const cardFits = cardTop + cardHeight <= heroHeight - sizes.sheetCurve;

  return (
    <View style={{ width, height }}>
      <View style={styles.hero} onLayout={(e) => setHeroHeight(e.nativeEvent.layout.height)}>
        <Image
          source={slide.photo}
          contentFit="cover"
          transition={300}
          cachePolicy="memory-disk"
          style={[StyleSheet.absoluteFill, styles.photo]}
          accessible={false}
        />
        <LinearGradient
          colors={gradients.heroFade}
          style={[styles.fade, { height: height * FADE_HEIGHT }]}
          pointerEvents="none"
        />
        <View
          onLayout={(e) => setCardHeight(e.nativeEvent.layout.height)}
          accessibilityElementsHidden={!cardFits}
          importantForAccessibility={cardFits ? "auto" : "no-hide-descendants"}
          style={{
            position: "absolute",
            top: cardTop,
            width: Math.min(CARD_MAX_WIDTH, Math.max(CARD_MIN_WIDTH, width * CARD_WIDTH)),
            alignSelf: "center",
            opacity: cardFits ? 1 : 0,
          }}
        >
          <ExampleCard card={slide.card} />
        </View>
      </View>

      <View style={[styles.sheet, { minHeight: height * SHEET_MIN_HEIGHT, paddingBottom: bottomReserve }]}>
        <SheetCurve width={width} />
        <PageDots count={count} index={index} variant="bar" style={styles.dots} />
        <View style={styles.copy}>
          <Text variant="headingLarge" color="primary" accessibilityRole="header">
            {slide.title}
          </Text>
          <Text color="textSecondary" style={styles.body}>
            {slide.body}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { flex: 1, backgroundColor: colors.surface },
  // Extends under the sheet curve so no gap shows behind it.
  photo: { bottom: -sizes.sheetCurve },
  fade: { position: "absolute", top: 0, left: 0, right: 0 },
  sheet: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xxl,
  },
  dots: { marginTop: spacing.xs, marginBottom: spacing.xl },
  copy: { maxWidth: TEXT_MAX_WIDTH },
  body: { marginTop: spacing.md },
});

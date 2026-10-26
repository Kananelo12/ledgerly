import { Image } from "expo-image";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Logo } from "@/components/logo";
import { Text } from "@/components/text";
import { colors, sizes, spacing, states } from "@/theme";

import { Slide } from "./slide";
import { slides, type Slide as SlideData } from "./slides";

export function OnboardingScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const list = useRef<FlatList<SlideData>>(null);
  const [index, setIndex] = useState(0);
  const last = index === slides.length - 1;

  useEffect(() => {
    // Failures are fine: each photo falls back to the surface color.
    Image.prefetch(slides.map((s) => s.photo)).catch(() => {});
  }, []);

  const buttonBottom = insets.bottom + spacing.xxl;
  const bottomReserve = buttonBottom + sizes.control + spacing.lg;

  const next = () => {
    if (last) {
      router.push("/sign-up");
    } else {
      list.current?.scrollToIndex({ index: index + 1 });
    }
  };

  return (
    <View style={styles.screen}>
      <FlatList
        ref={list}
        data={slides}
        keyExtractor={(s) => s.key}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        scrollEventThrottle={16}
        onScroll={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          if (i !== index && i >= 0 && i < slides.length) setIndex(i);
        }}
        renderItem={({ item, index: i }) => (
          <Slide
            slide={item}
            index={i}
            count={slides.length}
            width={width}
            height={height}
            bottomReserve={bottomReserve}
          />
        )}
      />

      <View style={[styles.topBar, { top: insets.top + spacing.sm }]} pointerEvents="box-none">
        <Logo size="md" />
        {last ? null : (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Skip onboarding"
            onPress={() => router.push("/sign-up")}
            hitSlop={spacing.md}
            style={({ pressed }) => [styles.skip, { opacity: pressed ? states.pressedOpacity : 1 }]}
          >
            <Text variant="caption" color="textSecondary">
              Skip
            </Text>
          </Pressable>
        )}
      </View>

      <Button
        title={last ? "Get started" : "Next"}
        trailingIcon={ArrowRight}
        onPress={next}
        style={[styles.button, { bottom: buttonBottom }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  topBar: {
    position: "absolute",
    left: spacing.xxl,
    right: spacing.xxl,
    // Same height with or without Skip, so the logo doesn't move on the last slide.
    minHeight: sizes.row,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skip: { minHeight: sizes.row, justifyContent: "center" },
  button: { position: "absolute", left: spacing.xxl, right: spacing.xxl },
});

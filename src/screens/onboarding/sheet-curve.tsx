import Svg, { Path } from "react-native-svg";

import { colors, sizes } from "@/theme";

// The convex top edge of the onboarding sheet: high on the left, sweeping down
// to the right edge. Sits directly above the sheet, filled with its color.
export function SheetCurve({ width }: { width: number }) {
  const h = sizes.sheetCurve;
  const d = `M0 ${h * 0.2} C ${width * 0.3} ${-h * 0.15} ${width * 0.7} ${h * 0.1} ${width} ${h} L ${width} ${h + 1} L 0 ${h + 1} Z`;

  return (
    <Svg width={width} height={h + 1} style={{ position: "absolute", top: -h, left: 0 }} pointerEvents="none">
      <Path d={d} fill={colors.background} />
    </Svg>
  );
}

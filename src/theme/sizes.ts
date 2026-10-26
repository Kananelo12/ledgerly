// Control sizes are minimums: text-bearing controls use minHeight so they grow
// with the system font size.
export const sizes = {
  control: 52,
  iconButton: 56,
  iconButtonSm: 40,
  chip: 40,
  tag: 32,
  segment: 44,
  stepper: 48,
  toggle: { width: 52, height: 32, thumb: 26 },
  tabBar: 68,
  iconTile: 40,
  avatar: 32,
  row: 44,
  dot: 6,
  pageBar: { width: 24, height: 3 },
  progress: 8,
  sheetCurve: 40,
  logoMark: { md: 32, lg: 56 },
  statusIcon: 20,
  icon: { xs: 12, sm: 16, md: 20, lg: 24 },
  iconStroke: 1.75,
  accountCard: { width: 280, minHeight: 140 },
  hairline: 1,
  focusBorder: 1.5,
} as const;

export type IconSize = keyof typeof sizes.icon;

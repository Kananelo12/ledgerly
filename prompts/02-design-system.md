# 02 · Design system & UI foundation

Status: done

## Goal

Every screen in Ledgerly draws from one theme (colors, type, spacing, radius, sizes, shadows, motion) and one set of shared components, built to match the 15 sections of the design system reference. A dev-only showcase screen renders all 15 sections so they can be compared with the design on the Android phone.

## Decisions

- **Source of truth:** the attached design system reference (15 sections). No theme exists yet (the template's `src/constants/theme.ts` was deleted), so `src/theme/` is created fresh and is the only token entry point. Follows the `expo-design-system` skill.
- **Brand palette, not platform semantic colors:** the design specifies every color, so tokens are fixed hex values. The skill's `Color`/`PlatformColor` pattern is not used.
- **Light only:** `userInterfaceStyle` becomes `"light"` in `app.json`. Colors live in one `palette.light` object exported as `colors`, so a dark palette can be added later behind a hook without touching component APIs.
- **Fonts:** `@expo-google-fonts/space-grotesk` (600 SemiBold, 700 Bold) and `@expo-google-fonts/inter` (400 Regular, 500 Medium, 600 SemiBold), loaded with `useFonts` in the root layout while the splash screen stays up. `useFonts` is used instead of the config plugin because the config plugin doesn't work in Expo Go. Weight is set through `fontFamily` (`Inter_500Medium`) with no `fontWeight`, so Android doesn't fall back to the system font.
- **Icons:** `lucide-react-native` with its peer `react-native-svg` (included in Expo Go). One `Icon` wrapper fixes the size and stroke tokens. The default stroke is 1.75 to match the design's thin strokes.
- **Gradients:** `expo-linear-gradient` (included in Expo Go) draws the `gradient` token (#6366F1 → #A5B4FC) and the light account card.
- **Custom controls where the design differs from native:** Toggle, SegmentedControl, and Stepper are custom, because Android's `Switch` and `@expo/ui` controls can't match the design's pill shapes and colors. Each one exposes the matching accessibility role and state (`switch` + checked, `tab` + selected, `adjustable` with increment/decrement actions).
- **Accessibility from the start:** each tappable component has pressed feedback, a role, and state. Icon-only controls take a required `accessibilityLabel` prop, enforced by the type. Status (Banner, Badge) always pairs color with an icon or text, so it never relies on color alone. Text scales with the system font size: components use `minHeight` and padding instead of fixed heights so rows can grow. Only the tab bar labels cap at `maxFontSizeMultiplier={1.3}`.
- **Showcase route:** `src/app/design-system.tsx`, open in development only (`__DEV__`; production redirects to `/`). Open it with a deep link, `exp://<dev server>/--/design-system`.
- **Where files live:** tokens go in `src/theme/` and shared components in `src/components/` (flat, kebab-case files, named exports). Domain components (AccountCard, TabBar) also live there, since every later slice uses them.
- **Default (picked by me):** the logo mark isn't in `assets/`. `Logo` renders the "Ledgerly" wordmark in Space Grotesk Bold next to a marked placeholder tile until the SVG or PNG is provided. App icon, adaptive icon, and splash image stay as they are (listed under You need to). Only the splash `backgroundColor` changes to `background` (#FAFAFC).
- **Default (picked by me):** the showcase renders `TabBar` standalone. Wiring it into Expo Router `Tabs` through the `tabBar` prop happens in feature 4, which creates the tabs.
- **Default (picked by me):** the budget progress meter isn't in the reference. It's built in feature 6 under the "never color alone" rule recorded here.

### Tokens

Values in the palette (section 02) are exact. Every other value was estimated from the reference image, which is roughly 1:1 with phone dp. Those estimates are marked *(est.)*. Values the palette doesn't name are **proposed new tokens**.

**Colors** (`src/theme/colors.ts`)

| Token | Value | Use |
|---|---|---|
| `primary` | #020617 | brand, primary buttons, active chips/tab/segment, dark card |
| `secondary` | #6366F1 | links, secondary button text/icon, focused border, toggle on, tag text |
| `accent` | #E0E7FF | secondary button bg, selections, Savings tag bg |
| `textPrimary` | #0F172A | body and important text |
| `textSecondary` | #64748B | supporting text, labels, placeholders, inactive tab |
| `surface` | #F1F5F9 | inputs, chips, icon buttons, stepper, neutral tags |
| `background` | #FAFAFC | app background |
| `gradientStart` / `gradientEnd` | #6366F1 / #A5B4FC | hero, illustrations |
| **proposed** `card` | #FFFFFF | card, row group, and tab bar fill |
| **proposed** `border` | #E2E8F0 *(est.)* | input/card outlines, hairlines |
| **proposed** `onPrimary` | #FFFFFF | text and icons on `primary` |
| **proposed** `accentSoft` | #EEF2FF *(est.)* | Investment tag bg, light card gradient start |
| **proposed** `accentStrong` | #C7D2FE *(est.)* | light card gradient end, toggle off track |
| **proposed** `success` / `successSoft` | #16A34A / #DCFCE7 *(est.)* | completed, success banner |
| **proposed** `warning` / `warningSoft` | #D97706 / #FEF3C7 *(est.)* | pending, low balance banner |
| **proposed** `danger` / `dangerSoft` | #DC2626 / #FEE2E2 *(est.)* | errors, high priority |
| **proposed** `overlayOnDark` | rgba(255,255,255,0.12) *(est.)* | icon tiles and chevron button on the dark card |

**Type** (`src/theme/typography.ts`, variants of `Text`)

| Variant | Font | Size / line height | Source |
|---|---|---|---|
| `display` | SpaceGrotesk_700Bold | 56 / 56, letterSpacing −1 *(est.)* | ref: 56–64, 1.0 |
| `heading` | SpaceGrotesk_600SemiBold | 28 / 34 | ref: 28–32, 1.2 |
| `body` | Inter_400Regular | 16 / 24 | ref |
| `caption` | Inter_500Medium | 14 / 20 | ref: 14, 1.4 |
| `button` | Inter_500Medium | 16 / 19 | ref: 16, 1.2 |
| **proposed** `wordmark` | SpaceGrotesk_700Bold | 40 / 44 | Logo |
| **proposed** `amount` | SpaceGrotesk_600SemiBold | 24 / 30 | card balances |
| **proposed** `title` | Inter_600SemiBold | 16 / 22 | section titles, card titles, row labels |
| **proposed** `small` | Inter_400Regular | 12 / 16 | card subtext, policy descriptions, tab labels (Inter_500Medium) |

Default text color is `textPrimary`. Callers pass a `color` token prop (`"textSecondary"`, `"onPrimary"`, ...) instead of a raw style. The reference's display text ("Find your financial flow") wraps to more lines at 56 on a phone, and that's intended.

**Spacing** (`src/theme/spacing.ts`, 4-point grid): `xxs 2, xs 4, sm 8, md 12, lg 16, xl 20, xxl 24, xxxl 32, huge 48`. Screen side padding is `lg` (16). The 12 and 20 steps recur in the design (chip gaps, card padding).

**Radius** (`src/theme/radius.ts`): `sm 8, md 12, lg 16, xl 20, full 9999`. Every non-full radius gets `borderCurve: "continuous"`.

**Sizes** (proposed `src/theme/sizes.ts`, all *(est.)*): `control 52` (buttons, inputs), `iconButton 56`, `iconButtonSm 40`, `chip 40`, `tag 32`, `segment 44`, `stepper 48`, `toggle {w: 52, h: 32, thumb: 26}`, `tabBar 68`, `iconTile 40`, `avatar 32`, `dot 6`, `icon {sm: 16, md: 20, lg: 24}`, `iconStroke 1.75`.

**Shadows** (`src/theme/shadows.ts`, `boxShadow` strings, *(est.)*): `card "0 1px 2px rgba(15, 23, 42, 0.04)"`, `raised "0 8px 24px rgba(15, 23, 42, 0.08)"` (tab bar, toggle thumb).

**Motion** (`src/theme/motion.ts`): `fast 150` (press, toggle thumb), `base 250`, `slow 400`.

**Pressed state** (shared): opacity 0.7 on dark fills, `surface` → `border` background on light fills. Disabled is opacity 0.4.

### Components (one per reference section)

| # | Section | Component(s) | Notes |
|---|---|---|---|
| 01 | Brand | `Logo` | mark (placeholder) + wordmark. Tagline "Smarter money decisions. Every day." is `heading`-sized Inter_400Regular in `textSecondary` on the showcase only |
| 02 | Color palette | tokens | showcase swatch grid with name, hex, use |
| 03 | Typography | `Text` | `variant` + `color` props, scaling on |
| 04 | Buttons | `Button`, `IconButton` | Button `variant: primary \| secondary`, optional `icon` (leading, e.g. Mail) and `trailingIcon` (e.g. ArrowRight), `loading`, `disabled`, full pill, height `control`. Primary: `primary` bg, `onPrimary` text. Secondary: `accent` bg, `textPrimary` text, `secondary` icon. IconButton: circle, `surface` bg, `textPrimary` icon, `size: md (56) \| sm (40)`, required `accessibilityLabel` |
| 05 | Input fields | `TextField` | leading icon, `surface` bg, 1px transparent border → 1.5px `secondary` when focused, radius `lg`, `secure` adds an eye/eye-off toggle (EyeOff when hidden, as in the design). Search field = `TextField` with Search icon. Placeholders in `textSecondary` |
| 06 | Filter chips | `Chip` | `selected` → `primary` bg + `onPrimary` text, otherwise `surface` + `textPrimary`. Optional leading icon (House, Utensils, Car, FileText, ShoppingBag). Height `chip`, full radius, role `button` + selected state |
| 07 | Listing card | `AccountCard`, `PageDots` | `tone: dark` (`primary` bg, `onPrimary` text, icon tile `overlayOnDark`) or `light` (accentSoft → accentStrong gradient, `textPrimary`), icon tile, title, masked number "•••• 7421", `amount`, caption, round chevron button. Radius `xl`, about 200×118 in the reference, sized to 280 wide in a horizontal paging list. PageDots: active `primary`, inactive `border` |
| 08 | Policy card | `ActionCard` | `card` bg, `border` outline, radius `lg`, icon tile (`accent` bg, `secondary` icon: ShieldCheck, ChartColumnIncreasing), `title` + `small` description, ChevronRight in `secondary`. Whole card is one button |
| 09 | Profile row | `ListGroup`, `ListRow` | group = `card` bg, radius `lg`, hairline `border` separators inset after the icon. Row = icon (User in a `primary` avatar circle, CreditCard, Clock, Settings), `caption`-sized label, ChevronRight in `textSecondary`, `minHeight` 44 |
| 10 | Bottom navigation | `TabBar` | fully rounded `card` pill, `raised` shadow. Active tab = `primary` pill with `onPrimary` icon + label. Inactive = `textSecondary`. Tabs: Home (House), History (History), Insights (ChartNoAxesColumn), More (LayoutGrid). Takes Expo Router `BottomTabBarProps`-compatible props so feature 4 can pass it to `Tabs` |
| 11 | Iconography | `Icon` | wraps a Lucide component with `size` and `color` tokens and stroke 1.75. Showcase grid: House, Search, Heart, Calendar, User, Settings, RefreshCw, ChartLine, Wallet, ArrowLeftRight, Bell, Shield, Sparkles, each in an `iconButtonSm` circle |
| 12 | Segmented control | `SegmentedControl` | `surface` track, `primary` selected pill with `onPrimary` text, each segment role `tab` + selected state, height `segment`, generic `options` / `value` / `onChange` |
| 13 | Toggles / steppers | `Toggle`, `Stepper` | Toggle: track `secondary` on / `accentStrong` off, white thumb with `raised` shadow, thumb slides with Reanimated `withTiming(motion.fast)`. Stepper: `surface` pill, Minus / value (`title`) / Plus, `min`/`max`/`step`, buttons disable at the limits |
| 14 | Status / alerts | `Banner` | `tone: success \| warning \| danger`, soft bg + 1px border in tone at low opacity, filled tone circle with white Check / `!`, message in tone color (`small`), dismiss X with label "Dismiss". Role `alert` |
| 15 | Tags / badges | `Badge` | `tone: accent` (Savings), `info` (Investment, `accentSoft` + `secondary`), `neutral` (Monthly, Add funds), `warning` (Pending), `success` (Completed, New), `primary` (Premium), `danger` (High priority). Optional leading `icon` or `dot`. Height `tag`, full radius, `caption` text |

Icon names are the closest Lucide matches to the reference, and any of them may be swapped after the screenshot comparison.

## Out of scope

- Dark mode values.
- Wiring `TabBar` into navigation and building any real screen (feature 4).
- Budget progress meter (feature 6).
- Final brand assets: logo mark, app icon, adaptive icon, splash image.
- Web-specific styling. The app targets Android first, and web gets no extra treatment.

## Steps

### 1. Install dependencies and load fonts

Run `npx expo install @expo-google-fonts/space-grotesk @expo-google-fonts/inter expo-linear-gradient lucide-react-native react-native-svg`. In `src/app/_layout.tsx`, call `SplashScreen.preventAutoHideAsync()` at module scope, load SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, Inter_400Regular, Inter_500Medium, and Inter_600SemiBold with `useFonts`, hide the splash when `loaded || error`, and return `null` while neither is set. Set the Stack's `contentStyle` to the `background` color. In `app.json`, set `userInterfaceStyle: "light"` and the splash `backgroundColor` to `#FAFAFC`. Done when the app boots in Expo Go and `npx expo-doctor` passes.

### 2. Theme tokens

Create `src/theme/colors.ts`, `typography.ts`, `spacing.ts`, `radius.ts`, `sizes.ts`, `shadows.ts`, `motion.ts`, and `index.ts` (re-exports everything) with exactly the values in Tokens above, all `as const`. Export `ColorToken = keyof typeof colors` and `TextVariant = keyof typeof type`. Done when `npx tsc --noEmit` passes.

### 3. Foundation components: Text, Icon, Logo

`src/components/text.tsx` (`variant`, `color`, `style` merged last), `icon.tsx` (`icon: LucideIcon`, `size: "sm" | "md" | "lg"`, `color: ColorToken`), and `logo.tsx` (placeholder mark tile clearly labelled `TODO: logo mark` in code, plus the wordmark). Replace `src/app/index.tsx`'s raw `Text` with the `Text` component.

### 4. Controls: Button, IconButton, TextField, Chip, SegmentedControl, Toggle, Stepper

One file each in `src/components/`, following the component contract (variants, sizes, pressed/disabled/loading states, `style` merged last, roles and state). Only tokens, no literals except commented optical nudges.

### 5. Content: AccountCard, PageDots, ActionCard, ListGroup, ListRow, Banner, Badge, TabBar

One file each. Content goes in through `children` or a small set of typed props, never a dozen content props.

### 6. Showcase screen

`src/app/design-system.tsx`: a `ScrollView` on `background` with 16 side padding, one titled section per reference section (01–15 with the reference's numbering and titles), each in a `card` panel. It uses interactive state (chips, segment, toggle, stepper, focused input, dismissible banners) so states can be tried. In production it renders `<Redirect href="/" />`.

### 7. Compare with the design on the phone

Start the dev server, then deep link with `adb shell am start -a android.intent.action.VIEW -d "exp://<dev server address>/--/design-system"`. Take a screenshot of each scroll position with `adb exec-out screencap -p > <path>`. Compare each section with the reference, list every difference, fix it in tokens or components (not in the showcase), and repeat. Then check with the system font size at its largest and with TalkBack on.

## Verification

- `npx expo lint` and `npx tsc --noEmit` pass. `npx expo-doctor` passes.
- App boots in Expo Go on the Android phone with Space Grotesk and Inter visibly rendered (no system font fallback).
- `/design-system` shows all 15 sections. Screenshot comparison against the reference finds no remaining differences except listed estimates and the logo placeholder.
- Interactions: chips select one at a time, segment switches, toggle animates and flips, stepper stops at min/max, the password eye toggles visibility, input border turns indigo on focus, banners dismiss, buttons show pressed and loading states.
- Largest system font size: no text is clipped. Rows and buttons grow, and tab labels cap at 1.3×.
- TalkBack: every icon-only control reads a label, the toggle reads "switch, on/off", the selected chip and segment read "selected", and the stepper reads its value and responds to swipe up/down.
- `rg "#[0-9A-Fa-f]{3,8}" src --glob '!src/theme/**'` finds no hex outside the theme. Font sizes and spacing literals only appear in `src/theme/`.

## AGENTS.md updates

Add a `## Design system` section (fold "Building from designs" token rules into it):

- Tokens live only in `src/theme/` (import from `@/theme`), and shared components live in `src/components/`. Screens use components and never redefine colors, fonts, or sizes. No hex, font size, or spacing literal outside `src/theme/` unless it has a comment saying why.
- Light only for now. Colors are brand hex tokens, so dark mode means adding a palette, not changing components.
- Fonts: Space Grotesk (display, headings, amounts) and Inter (everything else), set by `fontFamily` with no `fontWeight`. Icons: Lucide through the `Icon` component, stroke 1.75. Gradients: `expo-linear-gradient`.
- Status and budget states never rely on color alone. They pair it with an icon or text. Icon-only controls require an accessibility label. Never disable font scaling. Use `minHeight` and padding, not fixed heights.
- `/design-system` is the dev-only showcase. New shared components get a showcase entry.

## Result

Built as planned: tokens in `src/theme/`, 18 components in `src/components/`, and the dev-only `/design-system` showcase covering all 15 sections. Checked on a Galaxy A07 in Expo Go 57.0.9 against the reference. Lint, type check, expo-doctor, and an Android export pass.

Changes from the plan:
- Extra tokens added while building: `transparent`, the `successLine`/`successText`, `warningLine`/`warningText`, and `dangerLine`/`dangerText` shades (the base tones fail 4.5:1 contrast for small text on their soft backgrounds), `warning` changed to #F59E0B for the icon fill, plus `lead` (Inter 20/26, brand tagline) and `smallMedium` type, and the `row`, `statusIcon`, `accountCard`, `hairline`, `focusBorder`, and `icon.xs` sizes.
- `TabBar` takes `items`/`activeKey`/`onSelect` instead of React Navigation's `BottomTabBarProps`, so it doesn't import types from a transitive dependency. Feature 4 maps the `Tabs` state onto these props.
- `Button` has no `size` prop, because the reference shows one size.
- Fixes from the screenshot comparison: header title font, tagline size, single-line placeholder, bare icon on the dark account card, alert icon on the High priority badge, and `keyboardShouldPersistTaps="handled"` on the showcase.

Known gaps: the logo mark is a placeholder. The Premium star is outlined, where the design shows it filled. The Completed and Investment icons are close Lucide matches, not exact. At font scale 2.0, the long search placeholder wraps inside the field (a React Native Android placeholder issue, not fixed). TalkBack's spoken output wasn't run, but labels, roles, and states were confirmed with `uiautomator dump`.

# 03 · Onboarding & auth screens

Status: done

## Goal

A signed-out user opens Ledgerly to a three-slide onboarding that matches the attached design: hero photo, floating example card, curved white sheet, bar indicator, and "Get started". They can swipe or tap through it, skip it, and land on a sign-up screen that links to sign in. The auth screens are UI shells that feature 4 connects to Clerk.

## Decisions

- **Spec:** the attached Ledgerly onboarding design (slide 3 of 3). Roam is inspiration only. Its yellow button, "Continue with Google", and Skip pill are not used. Ledgerly's plain "Skip" text and dark button are.
- **Card content shows real features, with the design's look:** the design's "Savings goal: New Car" card becomes Ledgerly examples, since savings goals aren't in the scope. Each card keeps the design's structure: icon, label, title, progress bar or detail row, and figures.
- **Slides 1 and 2 are drafted here, in the same layout.** Their copy is below for review.
- **Auth shells:** `(auth)/sign-up` and `(auth)/sign-in` are built with design-system components. They don't sign anyone in yet: submitting shows a warning banner "Accounts aren't connected yet." Feature 4 connects them to Clerk. There's no design for these screens, so they follow the design system and get matched when a design is attached.
- **When onboarding shows:** until signed in, with no storage. `src/app/index.tsx` redirects to `/onboarding` for now. Feature 4 replaces that with a Clerk session check (`Stack.Protected guard`, since `redirectTo` is SDK 58+ only).
- **Navigation:**
  - On slides 1–2, the button reads "Next" and advances the pager.
  - On slide 3, it reads "Get started" (with ArrowRight) and pushes `/sign-up`.
  - "Skip" (slides 1–2 only, hidden on slide 3 as in the design) also goes to `/sign-up`.
  - Sign-up and sign-in link to each other with `router.replace`, so back from either returns to onboarding.
- **Pager:** a horizontal `FlatList` with `pagingEnabled`, one full-screen page per slide, so image, card, and text move together. The top bar (logo, Skip), indicator, and button are fixed overlays. No new dependency.
- **Images:** remote Unsplash photos (free Unsplash License) through `expo-image`, with `contentFit="cover"`, `transition={300}`, `surface` as the placeholder color, and `Image.prefetch` for all three on mount. URL format `https://images.unsplash.com/photo-<id>?w=1080&q=80&fm=jpg&fit=crop`. Photographers are credited in a code comment. If an image fails, the page shows `surface` with the fade and stays readable.
- **Currency in examples:** Rand (R), matching the product's own examples ("groceries 450 at Checkers"). These are illustrative only, not user data.
- **Where code lives:** screen-private pieces go in `src/screens/onboarding/` (slides data, slide, example card, sheet curve), following the `expo-design-system` promotion rule. `ProgressBar` and the bar variant of `PageDots` go in `src/components/`, because budgets (feature 6) reuse them.
- **Default (picked by me):** onboarding and auth screens hide the stack header (`headerShown: false` in `(auth)/_layout.tsx`).
- **Default (picked by me):** the logo mark is still missing from `assets/`, so `Logo` keeps its marked placeholder. A `size` prop is added for the smaller onboarding top bar.

### Slides

| # | Photo (Unsplash) | Card | Title | Body |
|---|---|---|---|---|
| 1 | Person with phone and coffee: `photo-1505415055475-143e29dd0b6a`, Patrick Tomasso | icon MessageSquareText. Label "Logged from one sentence", title "coffee 35 yesterday", detail row: Badge "Eating out" (accent) + "R35.00 · Yesterday" | Log spending in one sentence. | Type "groceries 450 at Checkers yesterday" and Ledgerly files it in the right category for you. |
| 2 | Fresh produce shelves: `photo-1583258292688-d0213dc5a3a8`, Gemma C | icon Bell. Label "Heads up", title "Eating out", ProgressBar 92% in `warning`, figures "R1,840 / R2,000", status text "On pace to go over" with a CircleAlert icon | Know before you overspend. | Set a monthly budget for each category and get a heads-up while there's still time to adjust. |
| 3 | Black SUV on a mountain road: `photo-1608790039230-6121188d1280`, Beer Drinker | icon Target (the design's goal icon). Label "Monthly budget", title "Groceries", ProgressBar 68% in `primary`, "68%", figures "**R1,360** / R2,000" | Build the future you want. | Set budgets, get insights and make smarter decisions — one step at a time. |

Slide 3's photo has an SUV on a mountain road, where the design shows a coastal road. No free Unsplash photo with a car on a coastal road from behind turned up. The body changes the design's "Set goals" to "Set budgets", because there are no goals.

### Layout (values estimated from the design, which is about 390 pt wide)

- **Screen:** `background` fill. The status bar is dark over the light sky.
- **Hero:** photo fills from the top to below the sheet edge, about 64% of the height. A top fade (`LinearGradient`, `heroFade` from `background` at 95% to transparent) covers the top 30%, so the logo reads on any photo.
- **Top bar:** padding `xxl` (24) at the sides, below the safe-area top. Left: `Logo size="md"` (mark 32, wordmark 24). Right: "Skip" as `caption` in `textSecondary`, a pressable with a 44×44 hit area.
- **Example card:** centered at about 24% of the screen height, width about 62% (min 220, max 280), padding `lg`, radius `lg`, fill `glass` (white at 88%), `raised` shadow.
  - Row 1: 20 icon in `textPrimary`, then a `small` label in `textSecondary` over a `caption` title.
  - Row 2: ProgressBar (height 8, track `surface`, fill `primary`, radius full) and `smallMedium` "68%".
  - Row 3: `smallMedium` amount in `textPrimary` + " / R2,000" in `textSecondary`.
  - The card reads as one element: "Example: Groceries budget, R1,360 of R2,000 spent, 68 percent."
- **Sheet:** starts at about 60% of the height, fill `background`. Its top edge is a convex SVG curve (react-native-svg `Path`, 40 high): higher on the left, sweeping down to the right edge, as in the design. Content padding `xxl` at the sides.
- **Indicator:** three bars, 24×3, gap `sm`, radius full. Active is `primary`, inactive is `borderStrong`. 20 below the curve, then a `xl` gap to the title. It reads as "Slide 3 of 3".
- **Title:** `headingLarge` (Space Grotesk Bold 32/38) in `primary`. **Body:** `body` in `textSecondary`, `md` below the title.
- **Button:** full width at the bottom with a safe-area bottom inset plus `xxl`. Primary variant with an ArrowRight trailing icon.
- **Larger text:** the page is a column, so the hero shrinks as the sheet text grows. The card hides when the hero is shorter than 240.

### Design-system additions (proposed tokens)

| Token | Value | Use |
|---|---|---|
| `colors.borderStrong` | #CBD5E1 *(est.)* | inactive indicator bars |
| `colors.glass` | rgba(255,255,255,0.88) *(est.)* | floating example card |
| `gradients.heroFade` | [rgba(250,250,252,0.95), rgba(250,250,252,0)] | top fade over photos |
| `type.headingLarge` | SpaceGrotesk_700Bold 32/38 *(est., inside the reference's 28–32 heading range)* | onboarding and auth titles |
| `type.wordmarkSm` | SpaceGrotesk_700Bold 24/28 *(est.)* | `Logo size="md"` |
| `sizes.pageBar` | { width: 24, height: 3 } *(est.)* | bar indicator |
| `sizes.progress` | 8 *(est.)* | ProgressBar height |
| `sizes.sheetCurve` | 40 *(est.)* | sheet curve height |
| `sizes.logoMark` | { md: 32, lg: 56 } | Logo mark |

New and changed components:
- `ProgressBar`: `value` 0–1, `tone: "primary" | "warning" | "danger"`, role `progressbar` with `accessibilityValue {min: 0, max: 100, now}`. It never relies on color alone, because callers always show the percentage or status text next to it.
- `PageDots`: adds `variant: "dot" | "bar"`.
- `Logo`: adds `size: "md" | "lg"` (default `lg`).

## Out of scope

- Clerk, real sign-up and sign-in, sessions, and the Stack.Protected guard (feature 4).
- Remembering that onboarding was seen.
- Google or other social sign-in.
- Designs for the auth screens (they follow the design system until a design is attached).
- Final logo mark asset.

## Steps

### 1. Design-system additions

Add the tokens above to `src/theme/`. Create `src/components/progress-bar.tsx`, add `variant="bar"` to `PageDots` in `account-card.tsx`, and add `size` to `logo.tsx`. Add a showcase entry for each in `src/app/design-system.tsx` (ProgressBar at 25/68/92% across the tones, the bar indicator, and the `md` logo). Done when lint and the type check pass and `/design-system` shows them.

### 2. Routes

Create `src/app/(auth)/_layout.tsx` (Stack with `headerShown: false`, `background` content), plus `onboarding.tsx`, `sign-up.tsx`, and `sign-in.tsx`. `src/app/index.tsx` becomes `<Redirect href="/onboarding" />`, with a comment saying feature 4 replaces it with the Clerk session guard. Done when the app opens to onboarding.

### 3. Onboarding screen

In `src/screens/onboarding/`:
- `slides.ts` holds the slide data (photo URL, credit, card content, title, body).
- `sheet-curve.tsx` draws the SVG curve.
- `example-card.tsx` renders the three card variants.
- `slide.tsx` lays out one full-screen page.
- `onboarding-screen.tsx` holds the pager, the fixed top bar, indicator, and button, the index tracked from `onMomentumScrollEnd`, `scrollToIndex` for Next, and the image prefetch.

`src/app/(auth)/onboarding.tsx` only renders `OnboardingScreen`. Done when all three slides swipe and Next/Get started/Skip work.

### 4. Auth shells

`sign-up.tsx` and `sign-in.tsx` each have:
- `Logo size="md"` at the top.
- A `headingLarge` title ("Create your account" / "Welcome back") and a `body` subtitle in `textSecondary`.
- Fields: sign-up has full name, email, and password (`secure`). Sign-in has email and password.
- A primary Button ("Create account" / "Sign in"). It's disabled until the fields are non-empty, then shows the warning Banner "Accounts aren't connected yet."
- A text link to the other screen ("Already have an account? Sign in" / "New to Ledgerly? Create an account") in `secondary`.

Use `KeyboardAvoidingView`, a ScrollView with `keyboardShouldPersistTaps="handled"`, correct `autoComplete`/`textContentType`/`keyboardType`, and return-key focus moving to the next field.

### 5. Compare with the design on the phone

Deep link `exp://<dev server>/--/onboarding`, then screenshot slide 3 and compare it with the design. List the differences, fix them, and repeat. Screenshot slides 1–2 and both auth screens. Check font scale 2.0 and the accessibility tree (`uiautomator dump`).

## Verification

- `npx expo lint` and `npx tsc --noEmit` pass. The hex audit finds nothing outside `src/theme/`.
- A fresh app launch opens onboarding slide 1, with photos loaded and fade, card, curve, and indicator in place.
- Slide 3 screenshot matches the design (layout, type, colors, card, curve, indicator, button). The only differences left are the photo subject, the card copy, and the logo placeholder.
- Swiping moves between slides and updates the indicator. Next advances, Skip and Get started open sign-up, the sign-in link switches screens, back returns to onboarding, and Android back from onboarding exits.
- With airplane mode on, onboarding still renders with `surface` placeholders and readable text.
- At font scale 2.0, nothing is clipped, and the card hides when the hero gets too short. TalkBack tree: Skip, the slide indicator ("Slide n of 3"), the example card summary, the button label, and field labels are all present.
- Sign-up and sign-in: the button is disabled until fields are filled, then the warning banner appears. The keyboard doesn't cover the focused field.

## AGENTS.md updates

- **Expo section:** auth screens live in `src/app/(auth)/` (`/onboarding`, `/sign-up`, `/sign-in`). Until Clerk lands, `index.tsx` redirects to `/onboarding`. Feature 4 replaces this with `Stack.Protected` (no `redirectTo` in SDK 57).
- **Design system:** screen-private components live in `src/screens/<name>/` until a second screen needs them. Photos are remote Unsplash images (`images.unsplash.com`, free license) through `expo-image` with a `surface` placeholder, with the photographer noted in a comment.

## Result

Built as planned and checked in Expo Go 57 on the Galaxy A07. A fresh launch redirects to onboarding. Three slides swipe, Next advances, Skip and Get started open sign-up, the switch links work, and back returns to onboarding. The sign-up and sign-in shells enable their button once fields are filled and show the "not connected" banner. Slide 3 matches the design's layout: hero, glass card, curve near 60% down, bar indicator, two-line title, and button.

Changes from the plan:
- The indicator lives inside each slide instead of a fixed overlay, because the sheet edge (and so the indicator's position) belongs to the page.
- The card hides by measured fit (its bottom must clear the sheet curve) instead of a fixed 240 hero threshold. It stays mounted at opacity 0 so it can be re-measured.
- Tuned from screenshots: card width 70% (240–320), sheet minimum 34% of the height, copy column max 300 (from the design's line breaks), top bar min height 44 so the logo doesn't move when Skip hides, and a `lg` gap above the button.
- `KeyboardAvoidingView` uses `behavior="padding"` on Android too. With edge-to-edge, the window doesn't resize for the keyboard, so the sign-up button was unreachable without it.
- `PageDots` moved to its own file (`src/components/page-dots.tsx`). `TextField` gained a `ref` prop for return-key focus.

Not verified: rendering offline with uncached photos. Disconnecting cuts the LAN dev server connection, and the photos were already cached. The fallback is the hero's `surface` background behind the image.

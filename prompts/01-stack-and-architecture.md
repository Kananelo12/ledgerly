# 01 · Stack & architecture

Status: done

## Goal

Every responsibility in AGENTS.md names a tool chosen for Ledgerly instead of Vellora's content stack, so every later feature builds on a recorded decision. The app boots under the Ledgerly name and secrets cannot be committed.

## Decisions

- **User data:** Neon Postgres. It replaces Sanity, which is a content system and not built for private per user records or money totals.
- **Queries:** Drizzle ORM over Neon's HTTP driver, used only from API routes. It replaces GROQ. Values are always query parameters.
- **Auth:** Clerk, unchanged.
- **Server:** Expo Router API routes (`src/app/api/*+api.ts`) on EAS Hosting, which runs on the Cloudflare Workers runtime.
- **Smart decisions:** merchant memory first (the user's own past corrections, stored in Neon), then Jev through `@ai-sdk/typesafe-ai` for new text. Jev also reads what a spending question asks. This is unchanged from AGENTS.md.
- **Answer text:** none generated. Spending answers are figures computed in SQL from the user's own data.
- **Push:** `expo-notifications` plus the Expo Push Service, sent from API routes.
- **Time based work:** no scheduler. Due recurring expenses are filled in when the API is called, with a unique key per rule per month so nothing is duplicated. Alerts are checked when an expense is saved.
- **Analytics:** PostHog identified through Clerk, unchanged.
- **Errors:** Sentry for the app and API routes, with request bodies scrubbed.
- **Removed:** Sanity, Studio, GROQ, Dataset Embeddings, Sanity Context, and the Sanity MCP rules. Default categories ship as a seed in code, and the privacy policy and terms are web pages.
- **Default (picked by me):** this feature installs nothing. Each feature installs its own packages and adds its own variable names to `.env.example` when it is built, so nothing sits unused.
- **Default (picked by me):** the Neon project and the Clerk application are created in the features that first need them (data model, core logging loop), not here.

## Out of scope

- Creating the Neon project, the Clerk app, the Sentry project, or the PostHog project.
- Installing any package.
- Designing the data model (feature 2) or the design system (feature 3).

## Steps

### 1. Rewrite the stack sections of AGENTS.md

Replace the whole `## Who owns what` section with:

```markdown
## Who owns what

Each tool has one job. Ask before moving a responsibility to a different tool.

- **Auth:** Clerk is the source of truth. The app keeps its own custom auth screens. Set Clerk up through the Clerk CLI and use the Clerk MCP for current Expo patterns.
- **User data:** Neon Postgres holds everything a user owns (expenses, budgets, categories, recurring rules, merchant memory, push tokens). Only API routes touch it, through Drizzle ORM and Neon's HTTP driver, with values always passed as parameters. Try schema changes on a Neon branch through the Neon MCP before applying them.
- **Server:** Expo Router API routes deployed to EAS Hosting. It runs on Cloudflare Workers, so use HTTP based drivers and no Node only APIs (such as `fs`).
- **Time based work:** no scheduler. Fill in due recurring expenses when the API is called, using a unique key per rule per period so a late or repeated call never duplicates. Check alerts when an expense is saved.
- **Categorizing:** merchant memory first (the user's own past corrections), then Jev for text it hasn't seen. A low probability files the expense as Uncategorized instead of guessing.
- **Typed decisions** (which category fits, what a spending question asks for): Jev, called from API routes through the AI SDK's `experimental_evaluate` with the `@ai-sdk/typesafe-ai` provider and `TYPESAFE_AI_API_KEY`. No Vercel AI Gateway. Keep `ai` and `@ai-sdk/typesafe-ai` pinned to exact versions, since the API is experimental.
- **Answer text:** none generated. Answers show figures computed in SQL from the user's own data, with the period and categories used. No LLM runs in the app.
- **Push:** `expo-notifications` with the Expo Push Service, sent from API routes.
- **Analytics:** PostHog, identified through Clerk.
- **Errors:** Sentry for the app and API routes.
```

In `## Rules`, replace these lines (all others stay word for word):

- Secret keys line: change the list to "(Clerk secret key, TypeSafe key, Neon database URL, Sentry auth token)" and "local scripts such as seeding and migrations".
- Delete "Sanity Context needs a deployed Studio…".
- Jev line: "It never writes SQL, calls tools, or generates text."
- Parsing line: "Amounts, dates, and periods are parsed in code. Jev may choose between candidates code found (categories, the metric, the period), but never produces the value."
- Replace the embeddings line with: "Every query is scoped to the user ID from the verified Clerk session, never to an ID sent by the app."
- Replace the policy answers line with: "Spending answers show only figures computed from the user's own data. If a question can't be answered, say so and suggest how to ask it."
- PostHog line: "PostHog and Sentry failures never block the app. Never send what users type, amounts, tokens, or personal data in events or error reports."
- Replace the Sanity IDs line with: "Let the database generate IDs. Model relationships as foreign keys."
- Ask line: "changing the database schema once real data exists".

Elsewhere:

- `How we build features`, step 1: change the skill examples to "(e.g. the Expo, Clerk, Neon, or TypeSafe skills; start Expo work from `expo-overview`)".
- `Building from designs`: "Sample property photos may be remote placeholder images" becomes "Sample images may be remote placeholders".
- `Checks`: "failures are explained by cause: missing data, merchant memory, the decision Jev made, the query, or the code."

Done when no line in AGENTS.md mentions Sanity, GROQ, embeddings, Context, guests, stays, properties, or policies, and the file stays under 150 lines.

### 2. Bring the scope in line with the stack

In `docs/scope/scope.md`:

- Feature 5 intent: "Your past corrections are checked first, then a typed choice among your categories for text it hasn't seen."
- Feature 7 Done when: add "checked each time an expense is saved".
- Feature 9 Done when: change "it is logged on its day" to "it is filled in on or after its day when the app next talks to the server".
- Feature 12: rename to "Analytics & error reporting", and add to Done when: "crashes and API errors reach error reporting with typed text and amounts scrubbed".

Done when the four edits are in and the At a glance table matches the headings.

### 3. Keep secrets out of git

Add `.env` to `.gitignore` (today only `.env*.local` is ignored). Create `.env.example` with a one line comment saying each feature adds its variable names, without values.

Done when `git check-ignore .env` prints `.env`.

### 4. Confirm the app boots as Ledgerly

The reset already left `src/app/index.tsx` and `src/app/_layout.tsx`. Remove the now dead `"reset-project"` script from `package.json`. Start the dev server and open the app.

Done when the app shows the blank index screen and the dev tools show the app name Ledgerly.

## Verification

1. Search AGENTS.md for `Sanity|GROQ|embedding|Context|guest|stay|propert|polic` (case insensitive). Expected: no matches, except "policy" where it refers to the privacy policy.
2. Count the lines in AGENTS.md. Expected: under 150.
3. `git check-ignore .env`. Expected: `.env`.
4. `npx expo lint` and `npx tsc --noEmit`. Expected: both pass.
5. `npx expo start`, then open on the iOS simulator. Expected: the blank index screen loads with no red error screen.

## AGENTS.md updates

Step 1 is the AGENTS.md update. It replaces Vellora's Sanity, GROQ, embeddings, and Context rows and rules.

## Result

Done on 2026-10-26. AGENTS.md now records the Ledgerly stack (Neon with Drizzle, Clerk, API routes on EAS Hosting, merchant memory then Jev, Expo Push, PostHog, Sentry) with no Vellora rows left. The scope matches it, `.env` is ignored, `.env.example` exists, and the dead `reset-project` script is gone. Lint, type check, and an iOS bundle export pass. Not checked here: opening the app in the iOS simulator, because this machine runs Windows. The first `npx expo lint` run set up ESLint (`eslint`, `eslint-config-expo`, `eslint.config.js`).

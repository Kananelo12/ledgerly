# Ledgerly

Expo React Native budgeting app and expense tracker for individuals. Users log spending in one sentence ("groceries 450 at Checkers yesterday"), and Ledgerly files it in a category, tracks it against monthly category budgets, and warns before they overspend. They can also ask questions about their spending ("how much did I spend on food in October?"), answered with exact figures computed from their own data.

This file is the project's memory: it holds every decision that is still true. `docs/scope/scope.md` is the ordered feature list (what to build, in what order), and each feature links to its plan. Plans in `prompts/` say how one feature is built and become history once done. They are the only specs, so there is no `docs/specs/`.

## Commands

```bash
npx expo install <package>  # ALWAYS use instead of npm install: resolves SDK-compatible versions
npx expo start              # dev server (press a to open Expo Go on the Android phone connected over USB)
adb devices                 # confirm the phone is connected with USB debugging on
npx expo lint               # lint
npx tsc --noEmit            # type check
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
npx eas-cli@latest <cmd>    # EAS builds, submits, and updates (use instead of bare `eas`)
```

## Expo

- Expo ships breaking changes every SDK release, so don't trust memory. Before touching an Expo, EAS, or React Native API, check the `expo` major version in `package.json` and read `https://docs.expo.dev/versions/v<major>.0.0/`. For anything else, start from https://docs.expo.dev/llms.txt and follow its links.
- Routes live in `src/app/`: every file is a screen and `_layout.tsx` files define navigators. API routes are `src/app/api/*+api.ts`. Keep components, hooks, and utils outside `src/app/`.
- `ios/` and `android/` are generated. Never create or edit them by hand; configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, switch to a development build (`npx expo run:android`). Development and testing happen on a physical Android phone in Expo Go, connected by USB debugging.

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

## Rules

- Secret keys (Clerk secret key, TypeSafe key, Neon database URL, Sentry auth token) never reach the app bundle. Use them only in API routes and local scripts such as seeding and migrations. Never put them behind `EXPO_PUBLIC_`, which is bundled into the app. Never commit `.env`. Keep variable names, without values, in `.env.example`.
- Jev is not an agent. It answers typed questions (Choice, Noul, Score) with probabilities. It never writes SQL, calls tools, or generates text. Code builds queries from its answers.
- Amounts, dates, and periods are parsed in code. Jev may choose between candidates code found (categories, the metric, the period), but never produces the value.
- Every query is scoped to the user ID from the verified Clerk session, never to an ID sent by the app.
- Spending answers show only figures computed from the user's own data. If a question can't be answered, say so and suggest how to ask it.
- API routes verify the Clerk session before doing any work.
- PostHog and Sentry failures never block the app. Never send what users type, amounts, tokens, or personal data in events or error reports.
- Let the database generate IDs. Model relationships as foreign keys.
- Ask before adding a dependency or service, changing the database schema once real data exists, or deleting data. Prefer Expo modules over third-party libraries.
- Whenever you need input from the user, ask through your tool's built-in question panel so they pick from options instead of typing. Give two to four clear options with the recommended one first. Fall back to plain text only if no such panel exists.

## How we build features

For a new feature or a change across several files. Small fixes and questions skip this.

1. **Understand.** Read the code involved. Open an earlier plan only if this feature builds directly on it (pick by file name). Read the current docs pages for the APIs you'll use, and load a matching skill if one exists (e.g. the Expo, Clerk, Neon, or TypeSafe skills; start Expo work from `expo-overview`). Don't write version-specific APIs from memory.
2. **Ask.** If a real decision is unclear (scope, visible behavior, data shape), ask in the question panel, batching questions into one round and following up only if the answers raise new ones. Pick defaults for the rest and list them. If a decision in this file looks wrong, raise it instead of changing it.
3. **Plan.** Copy `prompts/TEMPLATE.md` to `prompts/NN-feature-name.md` (next number) and fill it in. The plan must be self-contained, so a fresh session can build it from this file plus the plan alone.
4. **IMPORTANT: stop and wait.** Write no app code until the user approves the plan. Ask for approval in the question panel (approve, or request changes). If they request changes, update the plan and ask again. On approval, set `Status: approved`, and in `docs/scope/scope.md` tick the feature's `Plan it` box, link the plan, and set it to `in-progress`.
5. **Build** step by step, checking each one. If a step turns out wrong, stop and explain instead of redesigning.
6. **Close out.**
   - Run the plan's Verification and give the report described under Reporting.
   - Add a short `## Result` to the plan and set `Status: done`. In `docs/scope/scope.md`, tick the feature's last box and set it to `done`.
   - Update this file: put each lasting decision in the section it belongs to. Replace or remove rules that are no longer true instead of appending. Keep this file under 150 lines.

## Building from designs

Designs are attached in the chat. Screens must match them exactly: layout, spacing, sizes, colors, type, radii, icons, and copy.

- Icons, fonts, and brand images come from `assets/` or the chosen icon library, never recreated from a screenshot. Sample images may be remote placeholders. If an asset is missing, use a marked placeholder and list it.
- Map every color, font, spacing value, and radius to a design-system token. List values with no token in the plan as proposed new tokens instead of hardcoding them. When creating the design system itself, derive the tokens from the designs.
- UI plans describe the design (elements, states, tokens, assets) well enough to build without the image. If building in a new session, ask for the design to be attached again.
- After building, open the screen on the Android phone (when it isn't the first screen, deep link with `adb shell am start -a android.intent.action.VIEW -d "<url>"`; in Expo Go the URL is `exp://<dev server address>/--/<path>`, and the `ledgerly://` scheme from `app.json` works only in a development build), take a screenshot (`adb exec-out screencap -p > <path>`), and compare it with the design. List every difference, fix, and repeat. Report which values were estimated from an image.

## Reporting

End every piece of work that changes code (features and fixes, not answers to questions) with this report. Use these headings in this order, and leave out any section that would be empty.

- **Done:** one line on the outcome, then the files changed and what changed in each.
- **Verified:** each check with ✅ or ❌ and its evidence (command output, screenshot). List what wasn't checked as ❌ with the reason. Never mark something ✅ without running it.
- **You need to:** numbered actions only the user can take, such as keys, dashboard settings, manual steps in Clerk or Neon, or assets to provide.
- **Test it yourself:** numbered steps to reproduce the result from a fresh start, ending with `Expected:` and what the user should see.
- **Notes:** defaults picked, trade-offs, and anything left for later.

## Checks

- Lint and type check pass before any task is called done.
- Screens that load data handle loading, error, and empty states.
- AI features are tried against realistic inputs, and failures are explained by cause: missing data, merchant memory, the decision Jev made, the query, or the code.

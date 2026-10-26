# Scope: Ledgerly

A smart budgeting app and expense tracker for individuals. You log spending in one sentence ("groceries 450 at Checkers yesterday"), Ledgerly files it in the right category, tracks it against monthly category budgets, warns you before you overspend, and answers questions about your spending with exact figures from your own data.

**Build approach:** Tracer Bullet (each slice works end to end through every layer, real and narrow, then later slices thicken it).
**Workflow:** AGENTS.md "How we build features": understand, ask, write a plan in `prompts/NN-feature-name.md`, wait for approval, build, then close out with the plan's Verification and the report. Small fixes skip the plan.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit. You decide when a feature is `done`._

**Release 1** covers every feature below (foundations through Release readiness). **Success signal:** the share of people still logging expenses in their second and fourth week.

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Stack & architecture | Foundation | done |
| 2 | Data model | Foundation | planned |
| 3 | Design system & UI foundation | Foundation | planned |
| 4 | Core logging loop | Slice 1 | planned |
| 5 | Auto categorize | Slice 2 | planned |
| 6 | Monthly budgets | Slice 3 | planned |
| 7 | Overspend alerts | Slice 4 | planned |
| 8 | Push notifications | Slice 5 | planned |
| 9 | Recurring expenses | Slice 6 | planned |
| 10 | Ask about spending | Slice 7 | planned |
| 11 | Budget suggestions | Slice 8 | planned |
| 12 | Analytics & error reporting | Release readiness | planned |
| 13 | Privacy, terms & account deletion | Release readiness | planned |

## Foundations

### 1. Stack & architecture · done
The Expo scaffold already runs. Decide where each person's financial data lives and which service owns auth, typed decisions, and notifications, then rewrite AGENTS.md "Who owns what" to match.
**Done when:** every responsibility in "Who owns what" names a tool that fits Ledgerly, secrets stay out of the bundle, and the app boots under the Ledgerly name.
- [x] Plan it: [`prompts/01-stack-and-architecture.md`](../../prompts/01-stack-and-architecture.md), approved
- [x] Build it and close it out

### 2. Data model · needs a decision
Core records every slice builds on: the user's home currency, categories, monthly budgets, expenses, and recurring rules.
**Done when:** amounts never lose cents, each record belongs to exactly one user, and income, multi currency, and shared budgets can be added later without a breaking migration.
- [ ] Plan it: `prompts/NN-data-model.md`, approved

### 3. Design system & UI foundation · needs a decision
Tokens and base components derived from the designs, with accessibility built in from the start.
**Done when:** color, type, spacing, and radius tokens come from the designs, base components exist, budget states read clearly without relying on color, and screens handle dynamic type and screen readers.
- [ ] Plan it: `prompts/NN-design-system.md`, approved

## Slice 1: Core logging loop

### 4. Core logging loop · needs a decision
The thinnest real thread through the app, and also its walking skeleton: sign in, pick a home currency, type one sentence, and see the expense in this month's list. Categories, budgets, and alerts come later.
**Done when:** a new user can sign in, pick a currency, log "coffee 35 yesterday", and see it in this month's list with the right amount and date; amounts and dates are parsed in code; every API route checks the session; loading, error, empty, and offline states render.
- [ ] Plan it: `prompts/NN-core-logging-loop.md`, approved

## Slice 2: Auto categorize

### 5. Auto categorize · needs a decision
Each expense lands in a budget category without you picking one. Your past corrections are checked first, then a typed choice among your categories for text it hasn't seen.
**Done when:** new expenses get one of the user's categories, a wrong pick is fixed in one tap, and when nothing fits well the expense is saved as Uncategorized instead of guessed.
- [ ] Plan it: `prompts/NN-auto-categorize.md`, approved

## Slice 3: Monthly budgets

### 6. Monthly budgets · needs a decision
Set a limit per category for the month and see what's left at a glance.
**Done when:** a user can set, edit, and remove category limits, sees spent and remaining per category for the current month, and limits carry over to the next month.
- [ ] Plan it: `prompts/NN-monthly-budgets.md`, approved

## Slice 4: Overspend alerts

### 7. Overspend alerts · needs a decision
Warn inside the app when a category is on pace to go over its limit before the month ends.
**Done when:** checked each time an expense is saved, a category projected to go over shows a warning, a category already over shows as over, and both states are clear without relying on color.
- [ ] Plan it: `prompts/NN-overspend-alerts.md`, approved

## Slice 5: Push notifications

### 8. Push notifications · needs a decision
Overspend alerts reach you even when the app is closed.
**Done when:** permission is asked at a sensible moment (not on first launch), alerts arrive with the app closed, each category alerts at most once per state per month, and the user can turn them off.
- [ ] Plan it: `prompts/NN-push-notifications.md`, approved

## Slice 6: Recurring expenses

### 9. Recurring expenses · needs a decision
Rent, subscriptions, and debit orders are logged for you every month.
**Done when:** a user can mark an expense as monthly, it is filled in on or after its day when the app next talks to the server, it can be paused, edited, or stopped, and opening the app late never creates duplicates.
- [ ] Plan it: `prompts/NN-recurring-expenses.md`, approved

## Slice 7: Ask about spending

### 10. Ask about spending · needs a decision
Questions like "how much did I spend on food in October?" answered with exact figures computed from your own expenses. No text is generated.
**Done when:** answers show the figure, the period, and the categories used; periods and amounts are parsed in code; a question it can't answer says so instead of guessing.
- [ ] Plan it: `prompts/NN-ask-about-spending.md`, approved

## Slice 8: Budget suggestions

### 11. Budget suggestions · needs a decision
Suggested monthly limits per category, based on how you actually spend.
**Done when:** after at least one full month of history the app suggests a limit per category that the user can accept or edit, and with too little history it says so.
- [ ] Plan it: `prompts/NN-budget-suggestions.md`, approved

## Release readiness

### 12. Analytics & error reporting · needs a decision
Measure the weekly logging habit and catch crashes without collecting anything personal.
**Done when:** signed up, expense logged, budget set, and alert seen are tracked against the signed in account; amounts and typed text are never sent; week 2 and week 4 logging retention can be read; crashes and API errors reach error reporting with typed text and amounts scrubbed; analytics and error reporting failures never block the app.
- [ ] Plan it: `prompts/NN-analytics-and-errors.md`, approved

### 13. Privacy, terms & account deletion · needs a decision
Financial data is sensitive, and laws like POPIA and GDPR expect you to be able to see the rules and leave.
**Done when:** the privacy policy and terms are reachable at sign up and in settings, and a user can delete their account and every record they own after a clear confirmation.
- [ ] Plan it: `prompts/NN-privacy-and-deletion.md`, approved

## Deferred
Out of scope for release 1, kept so the plan stays honest.
- **Income and money left**: log income and see what's left this month · needs a decision
- **Offline logging**: log without a connection and sync later · needs a decision
- **Multi currency**: log in any currency, converted to the home currency · needs a decision
- **Export data**: download transactions as CSV
- **Receipt scan**: log from a photo of the slip · needs a decision
- **Bank sync**: import transactions automatically · needs a decision
- **Shared budgets**: couples and households · needs a decision
- **Paid tier**: billing for a premium plan · needs a decision
- **Multiple languages**: translated interface and sentence entry · needs a decision

## Legend

**Feature lifecycle** (follows AGENTS.md "How we build features"):

| State | The feature shows |
|---|---|
| `planned` · needs a decision | one box: `Plan it: prompts/NN-<feature>.md, approved` |
| `in-progress` | `Plan it` ticked, with the real plan file linked; one more box: `Build it and close it out` |
| `done` | both boxes ticked; the plan says `Status: done` |

- **This file says what to build and in what order. The plan in `prompts/` says how.** Milestones, build steps, and verification live only in the plan, never copied here.
- **The plan's `Status:` line is the detailed truth.** The status here is a quick index, updated at approval and at close out.
- **Next step** = the first unticked box.
- **needs a decision** = the plan must settle it, and you approve it before any app code is written.
- **NN** = the next free plan number when the plan is written.
- **Status** `planned` → `in-progress` → `done`, plus `dropped` (taken out of scope, kept for history).

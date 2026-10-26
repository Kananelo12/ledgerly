import { Bell, MessageSquareText, Target, type LucideIcon } from "lucide-react-native";

// Free Unsplash License photos, hotlinked from images.unsplash.com.
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1080&q=80&fm=jpg&fit=crop`;

export type ExampleCardData =
  | {
      kind: "logged";
      icon: LucideIcon;
      label: string;
      title: string;
      category: string;
      detail: string;
      summary: string;
    }
  | {
      kind: "budget";
      icon: LucideIcon;
      label: string;
      title: string;
      value: number;
      tone: "primary" | "warning";
      spent: string;
      limit: string;
      status?: string;
      summary: string;
    };

export type Slide = {
  key: string;
  photo: string;
  title: string;
  body: string;
  card: ExampleCardData;
};

// Example figures are illustrative, not user data.
export const slides: readonly Slide[] = [
  {
    key: "log",
    // Patrick Tomasso, https://unsplash.com/photos/IDN8NVELy0E
    photo: unsplash("1505415055475-143e29dd0b6a"),
    title: "Log spending in one sentence.",
    body: "Type “groceries 450 at Checkers yesterday” and Ledgerly files it in the right category for you.",
    card: {
      kind: "logged",
      icon: MessageSquareText,
      label: "Logged from one sentence",
      title: "“coffee 35 yesterday”",
      category: "Eating out",
      detail: "R35.00 · Yesterday",
      summary: "Example: coffee 35 yesterday, filed under Eating out, R35.00, yesterday.",
    },
  },
  {
    key: "alerts",
    // Gemma C, https://unsplash.com/photos/stpjHJGqZyw
    photo: unsplash("1583258292688-d0213dc5a3a8"),
    title: "Know before you overspend.",
    body: "Set a monthly budget for each category and get a heads-up while there's still time to adjust.",
    card: {
      kind: "budget",
      icon: Bell,
      label: "Heads up",
      title: "Eating out",
      value: 0.92,
      tone: "warning",
      spent: "R1,840",
      limit: "R2,000",
      status: "On pace to go over",
      summary: "Example alert: Eating out, R1,840 of R2,000 spent, 92 percent, on pace to go over.",
    },
  },
  {
    key: "future",
    // Beer Drinker, https://unsplash.com/photos/cqsHcu13sgo
    photo: unsplash("1608790039230-6121188d1280"),
    title: "Build the future you want.",
    body: "Set budgets, get insights and make smarter decisions — one step at a time.",
    card: {
      kind: "budget",
      icon: Target,
      label: "Monthly budget",
      title: "Groceries",
      value: 0.68,
      tone: "primary",
      spent: "R1,360",
      limit: "R2,000",
      summary: "Example: Groceries budget, R1,360 of R2,000 spent, 68 percent.",
    },
  },
];

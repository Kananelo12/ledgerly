import { LinearGradient } from "expo-linear-gradient";
import { Redirect, Stack } from "expo-router";
import {
  ArrowLeftRight,
  ArrowRight,
  Bell,
  Bookmark,
  Calendar,
  Car,
  ChartColumnIncreasing,
  ChartLine,
  ChartNoAxesColumn,
  CircleAlert,
  Clock,
  CreditCard,
  FileText,
  Heart,
  History,
  House,
  Landmark,
  LayoutGrid,
  Lock,
  Mail,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Share,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  User,
  Utensils,
  Wallet,
  X,
} from "lucide-react-native";
import { useState, type ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { AccountCard } from "@/components/account-card";
import { ActionCard } from "@/components/action-card";
import { Badge } from "@/components/badge";
import { Banner } from "@/components/banner";
import { Button } from "@/components/button";
import { Chip } from "@/components/chip";
import { IconButton } from "@/components/icon-button";
import { ListGroup, ListRow } from "@/components/list-group";
import { Logo } from "@/components/logo";
import { PageDots } from "@/components/page-dots";
import { ProgressBar } from "@/components/progress-bar";
import { SegmentedControl } from "@/components/segmented-control";
import { Stepper } from "@/components/stepper";
import { TabBar } from "@/components/tab-bar";
import { Text } from "@/components/text";
import { TextField } from "@/components/text-field";
import { Toggle } from "@/components/toggle";
import { colors, gradients, radius, shadows, sizes, spacing, type ColorToken } from "@/theme";

// Dev-only showcase of the design system reference, section by section.
export default function DesignSystemRoute() {
  if (!__DEV__) {
    return <Redirect href="/" />;
  }
  return <DesignSystemScreen />;
}

const swatches: { name: string; token: ColorToken; use: string }[] = [
  { name: "Primary", token: "primary", use: "Main brand color, headings, key text" },
  { name: "Secondary", token: "secondary", use: "Buttons, links, accents, highlights" },
  { name: "Accent", token: "accent", use: "Backgrounds, selections" },
  { name: "Text Primary", token: "textPrimary", use: "Body text, important text" },
  { name: "Text Secondary", token: "textSecondary", use: "Supporting text, labels" },
  { name: "Surface", token: "surface", use: "Cards, inputs, modals" },
  { name: "Background", token: "background", use: "App background, views" },
];

const filters = ["All", "Income", "Expenses", "Investments", "Chequing"] as const;
const categories = [
  { label: "Accounts", icon: House },
  { label: "Food", icon: Utensils },
  { label: "Transport", icon: Car },
  { label: "Bills", icon: FileText },
  { label: "Shopping", icon: ShoppingBag },
] as const;
const icons = [
  House, Search, Heart, Calendar, User, Settings, RefreshCw,
  ChartLine, Wallet, ArrowLeftRight, Bell, Shield, Sparkles,
];
const tabs = [
  { key: "home", label: "Home", icon: House },
  { key: "history", label: "History", icon: History },
  { key: "insights", label: "Insights", icon: ChartNoAxesColumn },
  { key: "more", label: "More", icon: LayoutGrid },
] as const;
const banners = [
  { id: "ok", tone: "success", message: "Transaction completed successfully" },
  { id: "low", tone: "warning", message: "Low balance in Cheque Account" },
  { id: "err", tone: "danger", message: "Couldn't complete transaction. Please try again." },
] as const;

const CAROUSEL_STEP = sizes.accountCard.width + spacing.md;

function DesignSystemScreen() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [category, setCategory] = useState<string>("Accounts");
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("home");
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [enabled, setEnabled] = useState(true);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState<string[]>([]);

  return (
    <>
      <Stack.Screen options={{ title: "Design system" }} />
      <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
        <Section number="01" title="Brand">
          <Logo />
          <Logo size="md" />
          <Text variant="lead" color="textSecondary">
            Smarter money decisions. Every day.
          </Text>
        </Section>

        <Section number="02" title="Color palette">
          <View style={styles.swatchGrid}>
            {swatches.map((s) => (
              <View key={s.token} style={styles.swatch}>
                <View style={[styles.swatchColor, { backgroundColor: colors[s.token] }]} />
                <Text variant="caption">{s.name}</Text>
                <Text variant="small" color="textSecondary">
                  {colors[s.token]}
                </Text>
                <Text variant="small" color="textSecondary">
                  {s.use}
                </Text>
              </View>
            ))}
            <View style={styles.swatch}>
              <LinearGradient
                colors={gradients.brand}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.swatchColor}
              />
              <Text variant="caption">Gradient</Text>
              <Text variant="small" color="textSecondary">
                {colors.gradientStart} → {colors.gradientEnd}
              </Text>
              <Text variant="small" color="textSecondary">
                Hero, illustrations, accents
              </Text>
            </View>
          </View>
        </Section>

        <Section number="03" title="Typography">
          <Sample label="Display">
            <Text variant="display" color="primary">
              Find your financial flow
            </Text>
          </Sample>
          <Sample label="Heading">
            <Text variant="heading" color="primary">
              Build the life you want
            </Text>
          </Sample>
          <Sample label="Body">
            <Text color="textSecondary">
              Track your spending, grow your savings, and make smarter decisions — all in one place.
            </Text>
          </Sample>
          <Sample label="Caption">
            <Text variant="caption">Every step counts.</Text>
          </Sample>
          <Sample label="Button">
            <Button title="Get started" style={styles.selfStart} />
          </Sample>
        </Section>

        <Section number="04" title="Buttons">
          <Button
            title="Continue"
            trailingIcon={ArrowRight}
            loading={loading}
            onPress={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1500);
            }}
          />
          <Button title="Continue with email" variant="secondary" icon={Mail} />
          <Button title="Disabled" disabled />
          <View style={styles.row}>
            <IconButton icon={Heart} accessibilityLabel="Save to favourites" />
            <IconButton icon={Share} accessibilityLabel="Share" />
            <IconButton icon={Search} accessibilityLabel="Search" />
            <IconButton icon={Bookmark} accessibilityLabel="Bookmark" />
          </View>
        </Section>

        <Section number="05" title="Input fields">
          <TextField icon={Search} placeholder="Search accounts, transactions..." />
          <TextField icon={User} placeholder="Full name" autoComplete="name" />
          <TextField icon={User} placeholder="Email address" keyboardType="email-address" autoCapitalize="none" />
          <TextField icon={Lock} placeholder="Password" secure defaultValue="ledgerly1" />
        </Section>

        <Section number="06" title="Filter chips">
          <View style={styles.wrap}>
            {filters.map((f) => (
              <Chip key={f} label={f} selected={filter === f} onPress={() => setFilter(f)} />
            ))}
          </View>
          <View style={styles.wrap}>
            {categories.map((c) => (
              <Chip
                key={c.label}
                label={c.label}
                icon={c.icon}
                selected={category === c.label}
                onPress={() => setCategory(c.label)}
              />
            ))}
          </View>
        </Section>

        <Section number="07" title="Listing card">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CAROUSEL_STEP}
            decelerationRate="fast"
            contentContainerStyle={styles.carousel}
            onMomentumScrollEnd={(e) =>
              setPage(Math.round(e.nativeEvent.contentOffset.x / CAROUSEL_STEP))
            }
          >
            <AccountCard
              icon={Landmark}
              title="Cheque Account"
              last4="7421"
              amount="$4,320.50"
              caption="Available balance"
            />
            <AccountCard
              tone="light"
              icon={ChartColumnIncreasing}
              title="Investment Account"
              last4="8963"
              amount="$12,480.75"
              caption="Total balance"
            />
            <AccountCard
              icon={Wallet}
              title="Savings Account"
              last4="3150"
              amount="$8,905.10"
              caption="Available balance"
            />
            <AccountCard
              tone="light"
              icon={CreditCard}
              title="Credit Card"
              last4="0042"
              amount="$1,215.00"
              caption="Current balance"
            />
          </ScrollView>
          <PageDots count={4} index={page} />
        </Section>

        <Section number="08" title="Policy card">
          <ActionCard
            icon={ShieldCheck}
            title="Your money is protected"
            description="We use bank-grade security to keep your data safe."
          />
          <ActionCard
            icon={ChartColumnIncreasing}
            title="Set your savings goal"
            description="Plan for what matters, from holidays to big dreams."
          />
        </Section>

        <Section number="09" title="Profile row">
          <ListGroup>
            <ListRow icon={User} label="Personal information" avatar />
            <ListRow icon={CreditCard} label="Linked accounts" />
            <ListRow icon={Clock} label="Transaction limits" />
            <ListRow icon={Settings} label="App settings" />
          </ListGroup>
        </Section>

        <Section number="10" title="Bottom navigation (fully rounded)">
          <TabBar items={tabs} activeKey={tab} onSelect={setTab} />
        </Section>

        <Section number="11" title="Iconography">
          <View style={styles.wrap}>
            {icons.map((icon) => (
              <IconButton
                key={icon.displayName}
                icon={icon}
                size="sm"
                accessibilityLabel={icon.displayName ?? "Icon"}
              />
            ))}
          </View>
        </Section>

        <Section number="12" title="Segmented control">
          <SegmentedControl
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
            ]}
            value={period}
            onChange={setPeriod}
          />
        </Section>

        <Section number="13" title="Toggles / Steppers">
          <View style={[styles.row, styles.spread]}>
            <Toggle value={enabled} onValueChange={setEnabled} accessibilityLabel="Notifications" />
            <Stepper value={count} onChange={setCount} min={0} max={10} accessibilityLabel="Quantity" />
          </View>
        </Section>

        <Section number="14" title="Status / Alerts">
          {banners
            .filter((b) => !dismissed.includes(b.id))
            .map((b) => (
              <Banner
                key={b.id}
                tone={b.tone}
                message={b.message}
                onDismiss={() => setDismissed((d) => [...d, b.id])}
              />
            ))}
          {dismissed.length > 0 ? (
            <Button title="Reset alerts" variant="secondary" icon={X} onPress={() => setDismissed([])} />
          ) : null}
        </Section>

        <Section number="15" title="Tags / Badges">
          <View style={styles.wrap}>
            <Badge label="Savings" tone="accent" />
            <Badge label="Investment" tone="info" icon={ArrowLeftRight} />
            <Badge label="Monthly" />
            <Badge label="Pending" tone="warning" icon={Clock} />
            <Badge label="Completed" tone="success" icon={RefreshCw} />
            <Badge label="Premium" tone="primary" icon={Star} />
            <Badge label="New" tone="success" dot />
            <Badge label="Add funds" icon={Plus} />
            <Badge label="High priority" tone="danger" icon={CircleAlert} />
          </View>
        </Section>

        <Section number="16" title="Progress & indicators (added)">
          <ProgressBar value={0.25} accessibilityLabel="25 percent" />
          <ProgressBar value={0.68} accessibilityLabel="68 percent" />
          <ProgressBar value={0.92} tone="warning" accessibilityLabel="92 percent, on pace to go over" />
          <ProgressBar value={1} tone="danger" accessibilityLabel="Over budget" />
          <PageDots count={3} index={2} variant="bar" />
        </Section>
      </ScrollView>
    </>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <View style={styles.panel}>
      <Text variant="title" accessibilityRole="header">
        {number}. {title}
      </Text>
      {children}
    </View>
  );
}

function Sample({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.sample}>
      <Text variant="small" color="textSecondary">
        {label}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.huge },
  panel: {
    gap: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderCurve: "continuous",
    backgroundColor: colors.card,
    boxShadow: shadows.card,
  },
  swatchGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  swatch: { flexBasis: "45%", flexGrow: 1, gap: spacing.xxs },
  swatchColor: {
    height: sizes.iconButton,
    borderRadius: radius.md,
    borderCurve: "continuous",
    borderWidth: sizes.hairline,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  sample: { gap: spacing.xs },
  selfStart: { alignSelf: "flex-start" },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  spread: { justifyContent: "space-between" },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  carousel: { gap: spacing.md },
});

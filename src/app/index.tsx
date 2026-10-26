import { Redirect } from "expo-router";

// Until Clerk lands everyone is signed out, so the app opens to onboarding.
// Feature 4 replaces this with a Stack.Protected session guard.
export default function Index() {
  return <Redirect href="/onboarding" />;
}

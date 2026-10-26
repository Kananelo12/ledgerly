import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { useRef, useState } from "react";
import type { TextInput } from "react-native";

import { Banner } from "@/components/banner";
import { Button } from "@/components/button";
import { TextField } from "@/components/text-field";
import { AuthLayout } from "@/screens/auth/auth-layout";

// UI shell: feature 4 connects this form to Clerk.
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState(false);
  const passwordRef = useRef<TextInput>(null);
  const complete = [email, password].every((v) => v.trim().length > 0);

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to see this month's spending."
      footer={{
        prompt: "New to Ledgerly?",
        action: "Create an account",
        onPress: () => router.replace("/sign-up"),
      }}
    >
      <TextField
        icon={Mail}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <TextField
        ref={passwordRef}
        icon={Lock}
        placeholder="Password"
        secure
        value={password}
        onChangeText={setPassword}
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="done"
      />
      {notice ? (
        <Banner
          tone="warning"
          message="Accounts aren't connected yet."
          onDismiss={() => setNotice(false)}
        />
      ) : null}
      <Button title="Sign in" disabled={!complete} onPress={() => setNotice(true)} />
    </AuthLayout>
  );
}

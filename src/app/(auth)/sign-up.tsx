import { router } from "expo-router";
import { Lock, Mail, User } from "lucide-react-native";
import { useRef, useState } from "react";
import type { TextInput } from "react-native";

import { Banner } from "@/components/banner";
import { Button } from "@/components/button";
import { TextField } from "@/components/text-field";
import { AuthLayout } from "@/screens/auth/auth-layout";

// UI shell: feature 4 connects this form to Clerk.
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState(false);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const complete = [name, email, password].every((v) => v.trim().length > 0);

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start tracking your spending in under a minute."
      footer={{
        prompt: "Already have an account?",
        action: "Sign in",
        onPress: () => router.replace("/sign-in"),
      }}
    >
      <TextField
        icon={User}
        placeholder="Full name"
        value={name}
        onChangeText={setName}
        autoComplete="name"
        textContentType="name"
        autoCapitalize="words"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <TextField
        ref={emailRef}
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
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="done"
      />
      {notice ? (
        <Banner
          tone="warning"
          message="Accounts aren't connected yet."
          onDismiss={() => setNotice(false)}
        />
      ) : null}
      <Button title="Create account" disabled={!complete} onPress={() => setNotice(true)} />
    </AuthLayout>
  );
}

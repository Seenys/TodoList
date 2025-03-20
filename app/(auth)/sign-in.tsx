import { useSSO } from "@clerk/clerk-expo";

import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import * as AuthSession from "expo-auth-session";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const { startSSOFlow } = useSSO();
  const { top } = useSafeAreaInsets();

  const handleGoogleLogin = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          // Defaults to current path
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image
        source={require("@/assets/images/todoist-logo.png")}
        style={styles.loginImage}
      />
      <Image
        source={require("@/assets/images/login.png")}
        style={styles.banner}
      />
      <Text style={styles.title}>Organize your work and life, finally.</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.btn]} onPress={handleGoogleLogin}>
          <Ionicons name="logo-google" size={24} />
          <Text style={[styles.btnText]}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          By continuing you agree to Todoist's{" "}
          <Text style={styles.link} onPress={() => {}}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={() => {}}>
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loginImage: {
    height: 40,
    resizeMode: "contain",
    alignSelf: "center",
  },
  banner: {
    height: 280,
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    marginHorizontal: 50,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 40,
  },
  btn: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 6,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.lightBorder,
    borderWidth: StyleSheet.hairlineWidth,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "500",
  },
  description: {
    fontSize: 12,
    textAlign: "center",
    color: Colors.lightText,
  },
  link: {
    color: Colors.lightText,
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

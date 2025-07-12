import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";

export const useSocialAuth = () => {
  const [loading, setLoading] = useState(false);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setLoading(true);
    try {
      const {createdSessionId, setActive} = await startSSOFlow({
        strategy,
        redirectUrl: "x-clone://auth-callback",
      });
      if(createdSessionId && setActive) {
        // Successfully authenticated, you can now set the session as active
        await setActive({session: createdSessionId});
      }
    } catch (error) {
      console.error("Error during social authentication:", error);
      const providerName = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert("Error", `Failed to sign in with ${providerName}. Please try again later.`);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSocialAuth,
    loading,
  };
};

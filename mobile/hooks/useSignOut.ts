import { useClerk } from "@clerk/clerk-expo";
import { Alert } from "react-native";

export const useSignOut = () => {
   const { signOut } = useClerk();

   const handleSignOut = async () => {
      Alert.alert("Logout", "Are you sure you want to log out?", [
         {
            text: "Cancel",
            style: "cancel"
         },
         {
            text: "Logout",
            onPress: async () => {
               try {
                  await signOut();
               } catch (error) {
                  console.error("Sign out error:", error);
               }
            },
            style: "destructive"
         }])
   };

   return { handleSignOut };
}
import { useSocialAuth } from "@/hooks/useSocialAuth";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const {loading, handleSocialAuth} = useSocialAuth()
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="flex-1 px-8 justify-between">
        <View className="flex-1 justify-center">
          <View className="items-center">
            <Image
              source={require("../../assets/images/auth2.png")}
              className="size-96"
              resizeMode="contain"
            />
            <View className="flex-col gap-2 w-full">
              <TouchableOpacity
                className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6"
                onPress={() => handleSocialAuth("oauth_google")}
                disabled={loading}
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center justify-center">
                  {loading ? (
                    <ActivityIndicator size="small" color="##4285F4" />
                  ) : (
                    <View className="flex-row gap-1 items-center">
                      <Image
                        source={require("../../assets/images/google.png")}
                        className="size-10 mr-3"
                        resizeMode="contain"
                      />
                      <Text className="text-black font-medium text-base">
                        Continue with Google{" "}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6"
                onPress={() => handleSocialAuth("oauth_apple")}
                disabled={loading}
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2, // Add shadow for Android
                }}
              >
                <View className="flex-row items-center justify-center">
                  {loading ? (
                    <ActivityIndicator size="small" color="##4285F4" />
                  ) : (
                    <View className="flex-row gap-1 items-center">
                      <Image
                        source={require("../../assets/images/apple.png")}
                        className="size-8 mr-3"
                        resizeMode="contain"
                      />
                      <Text className="text-black font-medium text-base">
                        Continue with Apple{" "}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-center text-gray-500 text-xs leading-4 mt-6 px-2">
            By signing in, you agree to our{" "}
            <Text className="text-blue-500">Terms of Service</Text> and{" "}
            <Text className="text-blue-500">Privacy Policy</Text>. 

          </Text>
        </View>
      </View>
    </View>
  );
}

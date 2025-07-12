import { Feather } from "@expo/vector-icons";
import { View, TextInput, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TRENDING_TOPICS = [
  { topic: "#ReactNative", tweets: "125K" },
  { topic: "#TypeScript", tweets: "89K" },
  { topic: "#WebDevelopment", tweets: "234K" },
  { topic: "#AI", tweets: "567K" },
  { topic: "#TechNews", tweets: "98K" },
  { topic: "#JavaScript", tweets: "300K" },
  { topic: "#MobileApps", tweets: "150K" },
  { topic: "#Programming", tweets: "400K" },
  { topic: "#SoftwareEngineering", tweets: "220K" },
  { topic: "#OpenSource", tweets: "180K" },
  { topic: "#CloudComputing", tweets: "75K" },
  { topic: "#DevOps", tweets: "60K" },
  { topic: "#DataScience", tweets: "500K" },
  { topic: "#CyberSecurity", tweets: "300K" },
  { topic: "#Blockchain", tweets: "200K" },
  { topic: "#MachineLearning", tweets: "350K" },
  { topic: "#InternetOfThings", tweets: "150K" },
  { topic: "#AugmentedReality", tweets: "90K" },
  { topic: "#VirtualReality", tweets: "80K" },
  { topic: "#5GTechnology", tweets: "110K" },
];

const SearchScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white px-2">
      {/* HEADER */}
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Feather name="search" size={20} color="#657786" />
          <TextInput
            placeholder="Search Twitter"
            className="flex-1 ml-3 text-base"
            placeholderTextColor="#657786"
          />
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-900 mb-4">Trending for you</Text>
          {TRENDING_TOPICS.map((item, index) => (
            <TouchableOpacity key={index} className="py-3 border-b border-gray-100">
              <Text className="text-gray-500 text-sm">Trending in Technology</Text>
              <Text className="font-bold text-gray-900 text-lg">{item.topic}</Text>
              <Text className="text-gray-500 text-sm">{item.tweets} Tweets</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
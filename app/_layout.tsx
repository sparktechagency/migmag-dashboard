import tw from "@/lib/tailwind";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 15,
      }}
    >
      <GestureHandlerRootView style={tw`flex-1 `}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="choose_r_s" />
          <Stack.Screen name="retailer" />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

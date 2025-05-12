import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { router } from "expo-router";

const App = () => {
  React.useEffect(() => {
    setTimeout(() => {
      router.replace("/auth/login");
    }, 1000);
  }, []);

  return (
    <View style={tw`flex-1 bg-white justify-center items-center`}>
      <View style={tw`mb-12 gap-4`}>
        <Image
          style={tw`h-80 aspect-square`}
          source={require("@/assets/images/logo.png")}
        />
        <ActivityIndicator color={"red"} size={"large"} />
      </View>
    </View>
  );
};

export default App;

import { View, Text, Image } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";

const AuthHeader = ({title}: any) => {
  return (
    <View style={tw` w-full justify-center flex-col items-center`}>
      <Image
        style={tw`h-32 aspect-square`}
        source={require("@/assets/images/logo.png")}
      />

      <Text style={tw`font-semibold text-2xl`}>{title}</Text>
    </View>
  );
};

export default AuthHeader;

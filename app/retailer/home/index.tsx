import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const Page = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={tw`text-3xl `}>Home sereen</Text>
      <Text onPress={() => navigation.toggleDrawer()}>Toggle drawer</Text>
    </View>
  );
};

export default Page;

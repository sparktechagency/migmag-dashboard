import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";

const Btn = ({ children }: any) => {
  return (
    <TouchableOpacity style={tw`bg-primaryBlack rounded-full  my-7`}>
      <View style={tw`text-primaryFF text-center font-semibold text-lg py-3`}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default Btn;

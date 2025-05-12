import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { Link, router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const successfullMassge = () => {
  return (
    <View style={tw` h-full`}>
      <View
        style={tw`w-[36px] h-[36px] bg-primary200 m-4 rounded-md overflow-hidden flex items-center justify-center`}
      >
        <Link href="/auth/set_new_password">
          <AntDesign name="left" size={24} color="black" />
        </Link>
      </View>

      <View style={tw`flex mt-24 justify-center items-center mx-5`}>
        <Image
          style={tw`w-60 h-[278px]  z-10`}
          source={require("@/assets/images/passChanged.png")}
        />
        <TouchableOpacity
          style={tw`bg-primaryBlack rounded-full  mt-9 w-full`}
          onPress={() => {
            router.replace("/auth/login");
          }}
        >
          <Text
            style={tw`text-primaryFF  text-center font-semibold text-lg py-[14px] `}
          >
            Back to login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default successfullMassge;

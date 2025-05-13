import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconErow, IconFillHome } from "@/icons/icon";

const choseRetailOrService = () => {
  return (
    <View style={tw`flex-1 justify-center  items-center bg-primaryFF`}>
      <SvgXml xml={IconFillHome} />
      <Image
        style={tw`w-[292px] h-[292px] mt-11 mb-8`}
        source={require("@/assets/images/choseRorS1.png")}
      />
      <Text style={tw`font-semibold text-lg mb-8`}>
        What are you searching for ?
      </Text>
      {/* Retail navigation */}
      <View style={tw`mb-5 relative`}>
        <Image
          style={tw` max-w-[370px] h-[130px] rounded-lg `}
          source={require("@/assets/images/choseRorS2.jpg")}
        />
        <TouchableOpacity
          style={tw`bg-primaryFF flex-row gap-3 justify-center items-center w-[121px] rounded-lg py-1 absolute bottom-4 left-4`}
        >
          <Text style={tw`font-medium text-lg`}>Retail</Text>
          <SvgXml xml={IconErow} />
        </TouchableOpacity>
      </View>
      {/* Service navigation */}
       <View style={tw`mb-5 relative`}>
        <Image
          style={tw` max-w-[370px] h-[130px] rounded-lg `}
          source={require("@/assets/images/choseRorS3.png")}
        />
         <TouchableOpacity
          style={tw`bg-primaryFF flex-row gap-3 justify-center items-center w-[121px] rounded-lg py-1 absolute bottom-4 left-4`}
        >
          <Text style={tw`font-medium text-lg`}>Service</Text>
          <SvgXml xml={IconErow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default choseRetailOrService;

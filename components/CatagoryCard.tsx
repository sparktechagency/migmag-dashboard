import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconErow, love } from "@/icons/icon";
import { ScrollView } from "react-native-gesture-handler";

const CatagoryCard = ({ item }: any) => {
  return (
    <View
      style={tw`flex-1 flex-wrap flex-row justify-center items-center gap-6`}
    >
      {item.product.map((cardItem: any) => (
        <View
          key={cardItem.id}
          style={tw`bg-primary  max-w-[45%] rounded-3xl relative`}
        >
          <Image
            style={tw`w-[170px] h-[144px] rounded-3xl m-1`}
            source={{ uri: cardItem.image }}
          />
          {/* love icon */}
          <TouchableOpacity
            style={tw`bg-primaryFF absolute right-3 top-3 w-10 h-10 justify-center items-center rounded-xl`}
          >
            <SvgXml xml={love} />
          </TouchableOpacity>
          {/* card content */}
          <View style={tw`flex-row items-center justify-between m-3`}>
            <View>
              <Text style={tw`font-semibold text-lg text-black`}>
                {cardItem.title}
              </Text>
              <Text style={tw`font-semibold text-lg text-black`}>
                {cardItem.brandName}
              </Text>
              <Text style={tw`font-normal text-base text-deepGrey`}>
                {cardItem.price}
              </Text>
            </View>
            <TouchableOpacity
              style={tw`bg-primaryFF w-10 h-10 justify-center items-center rounded-xl`}
            >
              <SvgXml xml={IconErow} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CatagoryCard;

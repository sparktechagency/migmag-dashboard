import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconErow, love } from "@/icons/icon";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import Cate from "@/assets/data/caretory.json";
import { _HIGHT } from "@/utils/utils";

const ProductCard = ({
  item,
  containerStyle,
}: {
  containerStyle?: any;
  item: {
    id: string;
    image: string;
    title: string;
    brandName: string;
    price: string;
  };
}) => {
  console.log("====================================");
  console.log(item);
  console.log("====================================");
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/product_details/${item?.id}`);
      }}
      style={[tw`bg-primary  flex-1  rounded-3xl relative`, containerStyle]}
    >
      <View style={tw`p-1`}>
        <Image
          style={[
            tw`w-full rounded-3xl `,
            {
              height: _HIGHT * 0.17,
            },
          ]}
          source={{
            uri: item?.image,
          }}
        />
      </View>
      {/* love icon */}
      <TouchableOpacity
        style={tw`bg-primaryFF absolute right-3 top-3 w-10 h-10 justify-center items-center rounded-xl`}
      >
        <SvgXml xml={love} />
      </TouchableOpacity>
      {/* card content */}
      <View style={tw` m-3`}>
        <View>
          <Text style={tw`font-medium  text-lg `}>{item?.title}</Text>
          <Text style={tw` text-base font-medium text-deepGrey50 `}>
            {item?.brandName}
          </Text>
        </View>
        <View style={tw`flex-row justify-between  items-center  `}>
          <Text style={tw`font-semibold text-xl  `}>{item?.price}</Text>
          <TouchableOpacity
            onPress={() => {
              router.push(`/product_details/${item?.id}`);
            }}
            style={tw`bg-primaryFF w-10 h-10  justify-center items-center rounded-xl`}
          >
            <SvgXml xml={IconErow} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

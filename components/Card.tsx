import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { IconErow, love } from "@/icons/icon";
import { SvgXml } from "react-native-svg";

const Card = ({ item }: any) => {
  return (
    <View>
      {/* card view all */}
      <View style={tw`flex-row justify-between my-5`}>
        <View style={tw`flex-row items-center gap-3`}>
          <Image
            style={tw`w-14 h-14 rounded-full`}
            source={{ uri: item.avater }}
          ></Image>

          <View>
            <Text style={tw`font-semibold text-lg`}>{item.category}</Text>
            <Text style={tw`font-normal text-base text-deepGrey`}>
              {item.productsCount} products
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw`py-[8px] px-[16px] border flex items-center justify-center rounded-full border-deepGrey w-[90px]`}
        >
          <Text style={tw`font-normal text-base`}>See all</Text>
        </TouchableOpacity>
      </View>
      {/* card show  */}

      <View style={tw`flex-row gap-3 pb-3 justify-between items-center`}>
        {item.products.map((cardItem: any) => (
          <View
            key={cardItem.id}
            style={tw`bg-primary  max-w-[180px] rounded-3xl relative`}
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
                  {cardItem.name}
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
    </View>
  );
};
export default Card;

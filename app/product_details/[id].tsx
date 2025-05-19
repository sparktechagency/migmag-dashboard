import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatListComponent,
} from "react-native";
import React, { useState } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import tw from "@/lib/tailwind";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Btn from "@/components/Btn";
import { SvgXml } from "react-native-svg";
import { erowLight, IconRightArrow } from "@/icons/icon";
import caretory from "@/assets/data/caretory.json";
import ProductCard from "@/components/ProductCard";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import IButton from "@/lib/buttons/IButton";

const product_details = () => {
  const sizes = [2, 4, 6, 8, 10, 12];
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedSize, setSelectedSize] = React.useState(null);

  const details = [
    "Designed to have a slim fit throughout.",
    "The model is wearing a US size 0 and has a 61cm waist, 86.4cm hips.",
    "This is a deadstock fabric made from 76% Polyester, 21% Rayon and 3% Spandex. Wash cold + dry flat.",
  ];
  return (
    <View style={tw`flex-1 bg-primaryFF `}>
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        togather
        ComponentBtn={
          <View>
            <IButton
              containerStyle={tw`p-0 m-0  rounded-full`}
              svg={IconRightArrow}
            />
          </View>
        }
        // title={}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw` pb-10 px-5`}
      >
        {/* <Text style={tw``}> product_details {id}</Text> */}
        <View style={tw``}>
          {/* view img */}
          <View
            style={tw` aspect-square w-[100%] flex-row justify-center items-center bg-primary mb-2 rounded-2xl`}
          >
            <Image
              style={tw`h-[97%] w-[97%]  rounded-2xl m-2 `}
              source={require("../../assets/images/details1.png")}
            />
          </View>
          <View style={tw`flex-row  justify-between`}>
            {/* img1 */}
            <View
              style={tw`h-28  w-28 bg-primary flex-row justify-center items-center rounded-2xl`}
            >
              <Image
                style={tw`h-[95%] w-[95%]  rounded-2xl m-2 `}
                source={require("../../assets/images/details2.png")}
              />
            </View>
            {/* img2 */}
            <View
              style={tw`h-28  w-28 bg-primary flex-row justify-center items-center rounded-2xl`}
            >
              <Image
                style={tw`h-[95%] w-[95%]  rounded-2xl m-2 `}
                source={require("../../assets/images/details3.png")}
              />
            </View>
            {/* img3 */}
            <View
              style={tw`h-28  w-28 bg-primary flex-row justify-center items-center rounded-2xl`}
            >
              <Image
                style={tw`h-[95%] w-[95%]  rounded-2xl m-2 `}
                source={require("../../assets/images/details4.png")}
              />
            </View>
          </View>
          <View style={tw`flex-row justify-between my-5 items-center `}>
            <View>
              <Text style={tw`font-medium text-xl mb-1`}>Mia Skort</Text>
              <Text style={tw` text-base font-normal text-deepGrey50`}>
                Reformation
              </Text>
            </View>
            <Text style={tw`font-semibold text-2xl`}>$200</Text>
          </View>
          <View>
            <Image
              style={tw`h-12 w-12 rounded-2xl m-2 `}
              source={require("../../assets/images/colorImg.png")}
            />
          </View>
        </View>
        <View style={tw``}>
          <View style={tw`flex-row gap-2 `}>
            <Text style={tw``}>Size</Text>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size + new Date().getSeconds()}
                onPress={() => setSelectedSize(size)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: selectedSize === size ? "#000" : "#ccc",
                  backgroundColor: selectedSize === size ? "#000" : "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: selectedSize === size ? "#fff" : "#000" }}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Btn>
          <View style={tw`flex-row justify-center items-center gap-3`}>
            <Text
              style={tw`text-primaryFF text-center font-semibold text-lg  `}
            >
              View in store
            </Text>
            <SvgXml xml={erowLight} />
          </View>
        </Btn>
        <View>
          <Text style={tw`text-lg font-medium pb-2`}>Details</Text>
          <FlatList
            scrollEnabled={false}
            data={details}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={tw`text-base font-normal leading-7`}>.{item}</Text>
            )}
          />
        </View>
        <Text style={tw`text-lg font-medium pb-3 pt-5`}>Shipping Details</Text>
        <View style={tw`border-2 border-deepGreycc rounded-3xl py-4 px-10 `}>
          <Text style={tw`text-base font-normal text-center`}>
            Free express shipping Duties and taxes are guaranteed Estimated
            delivery in 3-8 business days
          </Text>
        </View>
        <Text style={tw`text-2xl font-medium py-7 text-center`}>
          More from this store
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`px-4 gap-3 pb-8`}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={caretory[0]?.product}
          renderItem={({ item }: any) => (
            <ProductCard item={item} containerStyle={tw`w-44`} />
          )}
        />

        <Text style={tw`text-2xl font-medium py-7 text-center`}>
          Similar Items
        </Text>

        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`px-4 gap-3 pb-8 `}
          columnWrapperStyle={tw`justify-between gap-3 `}
          numColumns={2}
          data={caretory[1]?.product}
          renderItem={({ item }) => <ProductCard item={item as any} />}
        />
      </ScrollView>
    </View>
  );
};

export default product_details;

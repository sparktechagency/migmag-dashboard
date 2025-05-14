import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { Formik } from "formik";
import { SvgXml } from "react-native-svg";
import { TextInput } from "react-native-gesture-handler";
import { IconSearch } from "@/icons/icon";
import tw from "@/lib/tailwind";
import { _HIGHT } from "@/utils/utils";

const categories = [
  {
    id: 1,
    name: "Men",
    image: require("../../../assets/images/categories/men.png"),
    bgColor: "#6E6E6E",
  },
  {
    id: 2,
    name: "Women",
    image: require("../../../assets/images/categories/women.png"),
    bgColor: "#E84885",
  },
  {
    id: 3,
    name: "Jewelry",
    image: require("../../../assets/images/categories/jewelry.png"),
    bgColor: "#D6E1EA",
  },
  // {  
  //   id: 4,
  //   name: "Home",
  //   image: require("../../../assets/images/categories/home.png"),
  //   bgColor: "#F3BC61",
  // },
  // {
  //   id: 5,
  //   name: "Food",
  //   image: require("../../../assets/images/categories/food.png"),
  //   bgColor: "#F47920",
  // },
  // {
  //   id: 6,
  //   name: "Travel",
  //   image: require("../../../assets/images/categories/travel.png"),
  //   bgColor: "#799849",
  // },
  // {
  //   id: 7,
  //   name: "Beauty",
  //   image: require("../../../assets/images/categories/beauty.png"),
  //   bgColor: "#FBB1D0",
  // },
  // {
  //   id: 8,
  //   name: "Electronics",
  //   image: require("../../../assets/images/categories/electronics.png"),
  //   bgColor: "#9EC9F5",
  // },
  // {
  //   id: 9,
  //   name: "Kids",
  //   image: require("../../../assets/images/categories/kids.png"),
  //   bgColor: "#F8E3A5",
  // },
  // {
  //   id: 10,
  //   name: "Outdoors",
  //   image: require("../../../assets/images/categories/outdoors.png"),
  //   bgColor: "#0F4C5C",
  // },
];

console.log()

const Page = () => {
  return (
    <View style={tw`bg-primaryFF h-full `}>
      <Formik
        initialValues={{ searchText: "" }}
        onSubmit={(values) => console.log("Submitted:", values)}
      >
        {({ handleChange, handleBlur, values }) => {
          if (values.searchText.length > 0) {
            console.log("Searching for:", values.searchText);
          }
          return (
            <View
              style={tw`bg-primary mt-7 mb-2 rounded-full flex-row items-center pl-6`}
            >
              <SvgXml xml={IconSearch} />
              <TextInput
                style={tw`h-[60px] flex-1 pl-3`}
                placeholder="Search"
                onChangeText={handleChange("searchText")}
                onBlur={handleBlur("searchText")}
                value={values.searchText}
              />
            </View>
          );
        }}
      </Formik>
      <View style={tw` px-2`}>
        {/* catagory card */}

        <FlatList
          data={categories}
          keyExtractor={(item): any => item.id}
          numColumns={2}
          contentContainerStyle={tw`py-2`}
          columnWrapperStyle={tw` justify-between`}
          renderItem={({ item }) => (
            
             <View className=" justify-center items-center ">
               <Image resizeMode="contain" source={item.image} style={[tw` aspect-video `,{
                height : _HIGHT * .122
               }]} />
             </View>
           
           
          )}
        />
      </View>
    </View>
  );
};

export default Page;

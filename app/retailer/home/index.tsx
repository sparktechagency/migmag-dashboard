import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import {
  IconDrower,
  IconErow,
  IconLove,
  IconNotification,
  IconSearch,
  logo,
} from "@/icons/icon";
import tw from "@/lib/tailwind";
import { Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";
import data from "@/lib/data.json";

const Page = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={tw`bg-primaryFF h-full p-5`}>
      <View style={tw` flex-row justify-between  items-center`}>
        {/* togle btn */}
        <View>
          <SvgXml xml={IconDrower} onPress={() => navigation.toggleDrawer()} />
        </View>
        {/* logo */}
        <View>
          <SvgXml xml={logo} />
        </View>
        {/* notification */}
        <View style={tw`flex-row gap-2`}>
          <SvgXml xml={IconLove} />
          <SvgXml xml={IconNotification} />
        </View>
      </View>

      {/* search bar */}
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View
            style={tw`bg-primary my-7 rounded-full flex-row items-center pl-6`}
          >
            <SvgXml xml={IconSearch} />
            <TextInput
              style={tw`h-[60px] `}
              placeholder="Search items"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
          </View>
        )}
      </Formik>
      {/* card view all */}
      <View style={tw`flex-row justify-between`}>
        <View style={tw`flex-row items-center gap-3`}>
          <Image
            style={tw`w-14 h-14`}
            source={require("@/assets/images/FashionNava.png")}
          ></Image>

          <View>
            <Text style={tw`font-semibold text-lg`}>Fashion Nova</Text>
            <Text style={tw`font-normal text-base text-deepGrey`}>
              120 products
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
      <View style={tw`mt-[22px] `}>
        {/* card */}
        <View style={tw` bg-primary min-h-[219px] max-w-[188px] rounded-xl`}>
          <View style={tw` `}>
            <Image
              style={tw`w-[180px] h-[144px] rounded-xl m-1`}
              source={require("@/assets/images/CardImg.png")}
            ></Image>

            <View style={tw`flex-row items-center justify-between`}>
              <View style={tw``}>
                <Text style={tw`font-semibold text-lg`}>Wren Blazer</Text>
                <Text style={tw`font-normal text-base text-deepGrey`}>
                  $200
                </Text>
              </View>
              <TouchableOpacity style={tw``}>
                <SvgXml xml={IconErow} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Page;

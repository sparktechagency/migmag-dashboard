import { View, TextInput, FlatList } from "react-native";
import React, { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import {
  IconDrower,
  IconErow,
  IconLove,
  IconNotification,
  IconSearch,
  logo,
  love,
} from "@/icons/icon";
import tw from "@/lib/tailwind";
import { Formik } from "formik";
import { ScrollView } from "react-native-gesture-handler";
import data from "@/lib/data.json";
import Card from "@/components/Card";

const Page = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`bg-primaryFF h-full `}
      contentContainerStyle={tw`px-4 pt-3 pb-30`}
    >
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
                placeholder="Search items"
                onChangeText={handleChange("searchText")}
                onBlur={handleBlur("searchText")}
                value={values.searchText}
              />
            </View>
          );
        }}
      </Formik>
      <View style={tw` `}>
        {/* card */}
        <FlatList
          scrollEnabled={false}
          nestedScrollEnabled={true}
          data={data}
          renderItem={({ item }) => <Card item={item} />}
        />
      </View>
    </ScrollView>
  );
};

export default Page;

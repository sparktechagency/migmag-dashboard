import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { HeaderTitle, PlatformPressable } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import tw from "@/lib/tailwind";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const icon = {
    index: (props: any) => (
      <AntDesign name="home" size={30} color="black" {...props} />
    ),
    search: (props: any) => (
      <Feather name="search" size={30} color="black" {...props} />
    ),
    profile: (props: any) => (
      <FontAwesome name="user" size={30} color="black" {...props} />
    ),
  };

  return (
    <View
      style={tw`flex-row bottom-8 absolute  mx-6  shadow-black shadow-md rounded-full justify-between items-center bg-[#fff] `}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tw`flex-1 justify-center items-center rounded-full`}
          >
            <View
              style={tw`m-2 ${
                isFocused ? "bg-[#E4E4E4] p-5 rounded-full " : ""
              }`}
            >
              {icon[route.name]({
                color: isFocused ? "#000" : "#222",
              })}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tablayout = () => {
  return ( 
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default Tablayout;

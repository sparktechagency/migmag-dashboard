import { View, Text, TouchableOpacity, Switch } from "react-native";
import React, { useState } from "react";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconBack, IconDarkmode, IconEdits, IconKey } from "@/icons/icon";

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={tw`bg-primaryFF h-full`}>
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        togather
        title={"Settings"}
      />
      <View style={tw`m-5`}>
        <View style={tw`bg-primary rounded-2xl`}>
          {/* add page */}
          <TouchableOpacity
            onPress={() => {
              router.push("/retailer/home/profile");
            }}
            style={tw`flex-row justify-between items-center px-3 bg-primary py-4 rounded-xl`}
          >
            <View style={tw`flex-row gap-4 items-center `}>
              <SvgXml xml={IconKey} />
              <Text style={tw`font-medium text-lg`}>Change password</Text>
            </View>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/retailer/home/profile");
            }}
            style={tw`flex-row justify-between items-center px-3 bg-primary py-4 rounded-xl`}
          >
            <View style={tw`flex-row gap-4 items-center `}>
              <SvgXml xml={IconEdits} />
              <Text style={tw`font-medium text-lg`}>Edit profile</Text>
            </View>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/retailer/home/profile");
            }}
            style={tw`flex-row justify-between items-center px-3 bg-primary py-4 rounded-xl`}
          >
            <View style={tw`flex-row gap-4 items-center `}>
              <SvgXml xml={IconDarkmode} />
              <Text style={tw`font-medium text-lg`}>Dark Mode</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Settings;

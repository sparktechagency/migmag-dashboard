import { Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface BackButtonProps {
  onPress?: () => void;
  titleStyle?: any;
  title?: any;
  containerStyle?: any;
  ComponentBtn?: React.ReactNode;
  offBack?: boolean;
  togather?: boolean;
}

const BackWithComponent = ({
  onPress,
  containerStyle,
  titleStyle,
  ComponentBtn,
  title,
  offBack,
  togather,
}: BackButtonProps) => {
  return (
    <View
      style={[
        tw`flex-row items-center justify-between gap-2 p-[4%]  `,
        containerStyle,
      ]}
    >
      {!togather ? (
        <>
          {!offBack ? (
            <TouchableOpacity
              onPress={onPress}
              style={tw`flex-row items-center gap-2 pr-4`}
            >
              <View
                style={tw`bg-[#FFF1EC] w-10 h-10 justify-center items-center rounded-lg`}
              >
                <SvgXml
                  xml={`<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="60" height="60" rx="30" fill="#F6F6F6"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.3976 30.9998L33.0798 39L35 37.0003L28.2779 30L35 22.9997L33.0798 21L25.3976 29.0002C25.143 29.2654 25 29.625 25 30C25 30.375 25.143 30.7346 25.3976 30.9998Z" fill="black"/>
</svg>


`}
                />
              </View>
            </TouchableOpacity>
          ) : (
            title && <View style={tw`w-10 h-10`} />
          )}
          <Text
            numberOfLines={1}
            style={[tw`text-b font-PoppinsBold text-base`, titleStyle]}
          >
            {title}
          </Text>
        </>
      ) : (
        <>
          {!offBack ? (
            <TouchableOpacity
              onPress={onPress}
              style={tw`flex-row items-center gap-4 pr-4`}
            >
              <View
                style={tw`bg-white w-10 h-10 justify-center items-center rounded-lg`}
              >
                <SvgXml
                  xml={`<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="60" height="60" rx="30" fill="#F6F6F6"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.3976 30.9998L33.0798 39L35 37.0003L28.2779 30L35 22.9997L33.0798 21L25.3976 29.0002C25.143 29.2654 25 29.625 25 30C25 30.375 25.143 30.7346 25.3976 30.9998Z" fill="black"/>
</svg>

`}
                />
              </View>
              <Text
                numberOfLines={1}
                style={[tw`text-b  font-PoppinsSemiBold text-base`, titleStyle]}
              >
                {title ? title : "Back"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={tw`w-10 h-10`} />
          )}
        </>
      )}

      {ComponentBtn ? ComponentBtn : <View style={tw`w-10 h-10`} />}
    </View>
  );
};

export default BackWithComponent;

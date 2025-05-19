import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconUser } from "@/icons/icon";
import { Formik } from "formik";
import Btn from "@/components/Btn";

const editProfile = () => {
  const user = {
    name: "Majsharlaya",
    email: "example@gmail.com",
    phone: "+1235698745",
    location: "Dhaka, bangladesh",
  };

  return (
    <KeyboardAvoidingView style={tw`bg-primaryFF`}>
      <View style={tw` h-[100%] m-5`}>
        <BackWithComponent
          onPress={() => {
            router.back();
          }}
          togather
          title={"Back"}
        />

        <View>
          <Formik
            initialValues={{
              name: "Majsharlaya",
              email: "example@gmail.com",
              phone: "+1235698745",
              location: "Dhaka, bangladesh",
            }}
            onSubmit={(values) => console.log(values)}
          >
            {({ values, setFieldValue, handleSubmit }) => {
              return (
                <View style={tw`flex-col justify-between h-[92%]`}>
                  <View style={tw`pt-6`}>
                    <View
                      style={tw`flex-row items-center gap-6 border mb-3 rounded-full px-5 h-14 overflow-hidden`}
                    >
                      <SvgXml xml={IconUser} />
                      <TextInput
                        value={values.name}
                        onChangeText={(tex) => setFieldValue("name", tex)}
                      />
                    </View>
                    <View
                      style={tw`flex-row items-center gap-6 border mb-3 rounded-full px-5 h-14 overflow-hidden`}
                    >
                      <SvgXml xml={IconUser} />
                      <TextInput
                        value={values.email}
                        onChangeText={(tex) => setFieldValue("email", tex)}
                      />
                    </View>
                    <View
                      style={tw`flex-row items-center gap-6 border mb-3 rounded-full px-5 h-14 overflow-hidden`}
                    >
                      <SvgXml xml={IconUser} />
                      <TextInput
                        value={values.phone}
                        onChangeText={(tex) => setFieldValue("phone", tex)}
                      />
                    </View>
                    <View
                      style={tw`flex-row items-center gap-6 border mb-3 rounded-full px-5 h-14 overflow-hidden`}
                    >
                      <SvgXml xml={IconUser} />
                      <TextInput
                        value={values.location}
                        onChangeText={(tex) => setFieldValue("location", tex)}
                      />
                    </View>
                  </View>

                  <Btn>
                    <TouchableOpacity onPress={() => handleSubmit()}>
                      <View
                        style={tw`flex-row justify-center items-center gap-3`}
                      >
                        <Text
                          style={tw`text-primaryFF text-center font-semibold text-lg  `}
                        >
                          Save changes
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Btn>
                </View>
              );
            }}
          </Formik>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default editProfile;

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import tw from "@/lib/tailwind";
import { Formik } from "formik";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Checkbox from "expo-checkbox";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import AuthHeader from "@/components/AuthHeader";

const SetNewPassword = () => {
  const [isChecked, setChecked] = useState(false);
  const validate = (values: any) => {
    const errors: any = {};

    // if (values.password !== values.confirmPassword) {
    //   errors.email = "Password is not match";
    //   alert("Password is not match");
    // }

    return errors;
  };

  return (
    <KeyboardAvoidingView
      style={tw`bg-primaryFF `}
      enabled={true}
      behavior={"padding"}
    >
      <View
        style={tw`w-[36px] h-[36px] bg-primary200 m-4 rounded-md  flex items-center justify-center`}
      >
        <Link href="/auth/otp">
          <AntDesign name="left" size={24} color="black" />
        </Link>
      </View>
      <ScrollView
        contentContainerStyle={tw` flex-grow items-center  h-full justify-center`}
      >
        <View style={tw`flex-1 justify-center items-center w-full bg-primaryFF`}>
          {/* logo and title reper */}
          <AuthHeader title="Set your new password" />
          {/* logo and title reper end*/}
          <View style={tw` w-full p-4 rounded-t-[2rem] pt-8 pb-5`}>
            <Text style={tw`font-normal text-sm mb-8`}>
              It must be different from your previous password.
            </Text>
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              onSubmit={(values) => {
                console.log(values);
              }}
              validate={validate}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
              }) => (
                <View style={tw`bg-primaryFF`}>
                  <View
                    style={tw`flex-row items-center gap-2 border-2 h-12 rounded-full px-3 mb-6`}
                  >
                    <Entypo name="lock" size={24} color="#777777" />
                    <TextInput
                      // style={tw`border-2 border-red-100 w-full rounded-lg `}
                      placeholder="Enter password"
                      // right={<MaterialIcons name="email" size={24} color="black" />}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      touched={touched.password}
                      errorText={errors.password}
                    />
                  </View>

                  <View
                    style={tw`flex-row items-center gap-2 border-2 h-12 rounded-full px-3 `}
                  >
                    <Entypo name="lock" size={24} color="#777777" />
                    <TextInput
                      // style={tw`border-2 border-red-100 w-full rounded-lg `}
                      placeholder="Confirm password"
                      // right={<MaterialIcons name="email" size={24} color="black" />}
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      touched={touched.confirmPassword}
                      errorText={errors.confirmPassword}
                    />
                  </View>

                  <TouchableOpacity
                    style={tw`bg-primaryBlack rounded-full mt-9`}
                    onPress={() => {
                      handleSubmit();
                      router.replace("/auth/successfullMassge");
                    }}
                  >
                    <Text
                      style={tw`text-primaryFF text-center font-semibold text-lg py-[14px] `}
                    >
                      Change password
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SetNewPassword;

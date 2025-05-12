import {
  View,
  Text,
  Image,
  TextInput,
  Button,
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

const Register = () => {
  const [value, setValue] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.email.includes("@")) {
      errors.email = "Invalid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      enabled={true}
      behavior={"padding"}
    >
      <ScrollView contentContainerStyle={tw`flex-grow justify-center`}>
        <View style={tw`flex-1 justify-center items-center bg-primaryFF`}>
          <Image
            style={tw`h-24 aspect-square`}
            source={require("@/assets/images/logo.png")}
          />

          <Text style={tw`font-semibold text-2xl`}>Register Your Account</Text>
          <View style={tw`bg-primary w-full p-4 rounded-t-[2rem] pt-8 pb-5`}>
            <Formik
              initialValues={{ email: "", password: "" }}
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
                    <MaterialIcons
                      name="email"
                      size={24}
                      color="#777777"
                      style={tw`mr-2`}
                    />
                    <TextInput
                      // style={tw`border-2 border-red-100 w-full rounded-lg `}
                      placeholder="Enter your email"
                      // right={<MaterialIcons name="email" size={24} color="black" />}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      touched={touched.email}
                      errorText={errors.email}
                    />
                  </View>
                  <View
                    style={tw`flex-row items-center gap-2 border-2 h-12 rounded-full px-3 `}
                  >
                    <Entypo name="lock" size={24} color="#777777" />
                    <TextInput
                      // style={tw`border-2 border-red-100 w-full rounded-lg `}
                      placeholder="Enter your password"
                      // right={<MaterialIcons name="email" size={24} color="black" />}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      touched={touched.password}
                      errorText={errors.password}
                    />
                  </View>

                  <View style={tw`my-7 flex-row justify-between items-center`}>
                    <View style={tw`flex-row gap-3`}>
                      <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? "#4630EB" : undefined}
                      />
                      <Text style={tw`font-medium text-sm`}>Remember me</Text>
                    </View>
                    <Link href="/auth/forgot_password">
                      <Text
                        style={tw`text-primaryBlack underline font-medium text-sm`}
                      >
                        Forgot password
                      </Text>
                    </Link>
                  </View>

                  <TouchableOpacity
                    style={tw`bg-primaryBlack rounded-full`}
                    onPress={() => {
                      handleSubmit();
                      router.replace("/retailer/home");
                    }}
                  >
                    <Text
                      style={tw`text-primaryFF text-center font-semibold text-lg py-[14px] `}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
          <View style={tw`  `}>
            <Text style={tw` w-full font-medium text-base  `}>
              Don’t have an account ?
              <Link href="/auth/register">
                {" "}
                <Text style={tw`text-primaryBlack underline p-2`}>
                  Register{" "}
                </Text>
                <AntDesign name="caretright" size={12} color="black" />
              </Link>{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import tw from "@/lib/tailwind";
import { Formik } from "formik";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";

const forgotPassword = () => {
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.email.includes("@")) {
      errors.email = "Invalid email";
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

          <Text style={tw`font-semibold text-2xl`}>Forgot your password ?</Text>
          <View style={tw` w-full p-4 rounded-t-[2rem] pt-8 pb-5`}>
            <Text style={tw`font-normal text-sm mb-8`}>Enter your email here. We will send you a 6 digit OTP via your email address.</Text>
            <Formik
              initialValues={{ email: "" }}
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
                      Send
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

export default forgotPassword;

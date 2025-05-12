import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import tw from "@/lib/tailwind";
import { Formik } from "formik";
import { Link, router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import AuthHeader from "@/components/AuthHeader";
import { OtpInput } from "react-native-otp-entry";
import AntDesign from "@expo/vector-icons/AntDesign";

const OTP = () => {
  return (
    <KeyboardAvoidingView
      style={tw`bg-primaryFF`}
      enabled={true}
      behavior={"padding"}
    >
      <View
        style={tw`w-[36px] h-[36px] bg-primary200 m-4 rounded-md  flex items-center justify-center`}
      >
        <Link href='/auth/forgot_password'>
          <AntDesign name="left" size={24} color="black" />
        </Link>
      </View>
      <ScrollView
        contentContainerStyle={tw` flex-grow items-center h-full justify-center`}
      >
        <View style={tw`flex-1 justify-center items-center bg-primaryFF`}>
          {/* logo and title reper */}
          <AuthHeader title="Enter OTP" />
          {/* logo and title reper end*/}

          <View style={tw` w-full p-4 rounded-t-[2rem] pt-8 pb-5`}>
            <Text style={tw`font-normal text-sm mb-8`}>
              Enter that OTP which we sent you through the email you provided.
            </Text>
            <Formik
              initialValues={{ otp: "" }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
              }) => (
                <View style={tw``}>
                  <OtpInput
                    numberOfDigits={6}
                    value={values.otp}
                    onChangeText={handleChange("otp")}
                    onBlur={handleBlur("otp")}
                    touched={touched.otp}
                    onTextChange={(text) => console.log(text)}
                    theme={{
                      pinCodeContainerStyle: {
                        width: 50,
                        height: 50,
                        borderWidth: 1,
                        borderRadius: 9999,
                        borderColor: "#000",
                      },
                    }}
                  />
                  <TouchableOpacity
                    style={tw`bg-primaryBlack rounded-full mt-9`}
                    onPress={() => {
                      handleSubmit();
                      router.replace("/auth/set_new_password");
                    }}
                  >
                    <Text
                      style={tw`text-primaryFF  text-center font-semibold text-lg py-[14px] `}
                    >
                      Verify
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

export default OTP;

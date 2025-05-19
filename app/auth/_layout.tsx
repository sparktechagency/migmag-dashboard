import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot_password" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="set_new_password" />
      <Stack.Screen name="successfullMassge" />
    </Stack>
  );
};

export default RootLayout;

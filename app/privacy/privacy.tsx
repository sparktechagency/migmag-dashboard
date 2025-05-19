import { View, Text, ScrollView } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { router } from "expo-router";

const privacy = () => {
  return (
    <View style={tw`bg-primaryFF h-full`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`m-5`}
      >
        <BackWithComponent
          onPress={() => {
            router.back();
          }}
          togather
          title={"Privacy policy"}
        />
        <Text style={tw`text-base font-normal pt-6`}>
          At 50/50, your privacy matters to us. This Privacy Policy outlines how
          we collect, use, and protect your information when you use our app. 1.
          Information We Collect Personal Information: When you sign up or
          interact with certain features, we may collect your name, email
          address, and location (if permitted). Search Data: We collect search
          terms and preferences to improve your experience and deliver better
          recommendations. Device Information: We may collect data like your
          device type, operating system, and unique identifiers to ensure app
          functionality. 2. How We Use Your Information To show relevant
          products and services based on your searches. To compare prices from
          different stores and display the best options. To personalize your
          experience and improve app performance. To send important updates or
          promotional offers (only with your consent). 3. Data Sharing We do not
          sell or share your personal data with third parties for marketing. We
          may share data with trusted partners solely for service improvement or
          legal compliance. 4. Security We use encryption and secure servers to
          protect your data. However, no system is 100% secure, so we encourage
          you to use strong passwords and stay cautious online. 5. Your Rights
          You have the right to: Access or correct your personal data. Delete
          your account and associated data. Opt out of promotional messages. 6.
          Changes to This Policy We may update this policy from time to time.
          Any changes will be posted here, and you’ll be notified if the changes
          protect your data. However, no system is 100% secure, so we encourage
          you to use strong passwords and stay cautious online. 5. Your Rights
          You have the right to: Access or correct your personal data. Delete
          your account and associated data. Opt out of promotional messages. 6.
          Changes to This Policy We may update this policy from time to time.
          Any changes will be posted here, and you’ll be notified if the changes
          protect your data. However, no system is 100% secure, so we encourage
          you to use strong passwords and stay cautious online. 5. Your Rights
          You have the right to: Access or correct your personal data. Delete
          your account and associated data. Opt out of promotional messages. 6.
          Changes to This Policy We may update this policy from time to time.
          Any changes will be posted here, and you’ll be notified if the changes
          are significant.
        </Text>
      </ScrollView>
    </View>
  );
};

export default privacy;

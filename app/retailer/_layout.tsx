import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";
import {
  IconAboutUS,
  IconBack,
  IconClose,
  IconPrivacy,
  IconService,
  IconSetting,
  IconTerms,
  IconUserProfile,
} from "@/icons/icon";
import tw from "@/lib/tailwind";
import Btn from "@/components/Btn";
import { _HIGHT } from "@/utils/utils";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      {...props}
      style={tw``}
    >
      <View style={tw`flex-row items-center justify-between pb-5`}>
        <Text style={tw`text-2xl font-normal `}>Retail Section</Text>
        <TouchableOpacity
          onPress={() => {
            props?.navigation?.closeDrawer();
          }}
        >
          <SvgXml xml={IconClose} />
        </TouchableOpacity>
      </View>
      {/*  */}

      <View style={tw`bg-primary rounded-2xl`}>
        {/* add page */}
        <TouchableOpacity
          onPress={() => {
            props?.navigation?.closeDrawer();
            router.push("/retailer/home/profile");
          }}
          style={tw`flex-row justify-between items-center px-3 bg-primary py-4 rounded-xl`}
        >
          <View style={tw`flex-row gap-4 items-center `}>
            <SvgXml xml={IconUserProfile} />
            <Text style={tw`font-medium text-lg`}>My profile</Text>
          </View>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props?.navigation?.closeDrawer();
            router.push("/retailer/home/profile");
          }}
          style={tw`flex-row justify-between items-center px-3 bg-primary py-4 rounded-xl`}
        >
          <View style={tw`flex-row gap-4 items-center `}>
            <SvgXml xml={IconService} />
            <Text style={tw`font-medium text-lg`}>Switch to Service</Text>
          </View>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
      </View>
      <View style={[tw`flex-col justify-between `, { height: _HIGHT * 0.6 }]}>
        <View style={tw`bg-primary rounded-2xl mt-4`}>
          {/* add page */}
          <TouchableOpacity
            onPress={() => {
              props?.navigation?.closeDrawer();
              router.push("/Settings/Settings");
            }}
            style={tw`flex-row justify-between items-center px-3 bg-primary py-4 rounded-xl`}
          >
            <View style={tw`flex-row gap-4 items-center `}>
              <SvgXml xml={IconSetting} />
              <Text style={tw`font-medium text-lg`}>Settings</Text>
            </View>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props?.navigation?.closeDrawer();
              router.push("/aboutUs/about_us");
            }}
            style={tw`flex-row justify-between items-center px-3 bg-primary py-4 rounded-xl`}
          >
            <View style={tw`flex-row gap-4 items-center `}>
              <SvgXml xml={IconAboutUS} />
              <Text style={tw`font-medium text-lg`}>About us</Text>
            </View>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props?.navigation?.closeDrawer();
              router.push("/privacy/privacy");
            }}
            style={tw`flex-row justify-between items-center px-3 bg-primary py-4 rounded-xl`}
          >
            <View style={tw`flex-row gap-4 items-center `}>
              <SvgXml xml={IconPrivacy} />
              <Text style={tw`font-medium text-lg`}>Privacy Policy</Text>
            </View>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props?.navigation?.closeDrawer();
              router.push("/terms/terms");
            }}
            style={tw`flex-row justify-between items-center px-3 bg-primary py-4 rounded-xl`}
          >
            <View style={tw`flex-row gap-4 items-center `}>
              <SvgXml xml={IconTerms} />
              <Text style={tw`font-medium text-lg`}>Terms & Conditions</Text>
            </View>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
        </View>
        <Btn>lksdjfsdlf</Btn>
      </View>
    </DrawerContentScrollView>
  );
}

const Drawerlayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen
          name="home/index"
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="home/profile"
          options={{
            drawerLabel: "My Profile",
            // title: "overview",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Drawerlayout;

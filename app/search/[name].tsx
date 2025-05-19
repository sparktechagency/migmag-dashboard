import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import tw from "@/lib/tailwind";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import IButton from "@/lib/buttons/IButton";
import { router } from "expo-router";
import ProductCard from "@/components/ProductCard";

import Cate from "@/assets/data/caretory.json";
import { IconRightArrow } from "@/icons/icon";

const Details = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [catagoty, setCatagoty] = useState<(typeof Cate)[0] | null>(null);

  useEffect(() => {
    const catagotyProduct = Cate.find((item) => item.name == name);
    if (catagotyProduct?.id) {
      setCatagoty(catagotyProduct);
    }
  }, [name]);

  return (
    <View style={tw`bg-primaryFF h-full w-full`}>
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        togather
        ComponentBtn={
          <View>
            <IButton
              containerStyle={tw`p-0 m-0  rounded-full`}
              svg={IconRightArrow}
            />
          </View>
        }
        title={name}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`px-4 gap-3 pb-8 `}
        columnWrapperStyle={tw`justify-between gap-3 `}
        numColumns={2}
        data={catagoty?.product}
        renderItem={({ item }) => <ProductCard item={item as any} />}
      />
    </View>
  );
};

export default Details;

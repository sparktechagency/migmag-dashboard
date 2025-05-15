import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import tw from "@/lib/tailwind";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import IButton from "@/lib/buttons/IButton";
import { router } from "expo-router";
import CatagoryCard from "@/components/CatagoryCard";

const Details = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name"); // ✅ এটাই ঠিক
  const categories = [
    {
      id: 1,
      name: "Mens",
      product: [
        {
          id: 1,
          image: "",
          title: "Tuxedo Blazer",
          brandName: "Fashion Nova",
          price: "$200",
        },
        {
          id: 2,
          image: "men2.png",
          title: "Blazer",
          brandName: "Fashion Nova",
          price: "$200.10",
        },
        {
          id: 3,
          image: "men3.png",
          title: "Blazer",
          brandName: "Fashion Nova",
          price: "$200",
        },
        {
          id: 4,
          image: "men4.png",
          title: "Blazer",
          brandName: "Fashion Nova",
          price: "$200.10",
        },
      ],
    },
    {
      id: 2,
      name: "Womens",
      product: [
        {
          id: 1,
          image: "women1.png",
          title: "Tuxedo Blazer",
          brandName: "Fashion Nova",
          price: "$200",
        },
        {
          id: 2,
          image: "women2.png",
          title: "Mia Skort",
          brandName: "Fashion Nova",
          price: "$200.10",
        },
        {
          id: 3,
          image: "women3.png",
          title: "Mia Skort",
          brandName: "Fashion Nova",
          price: "$200.10",
        },
        {
          id: 4,
          image: "women4.png",
          title: "Tuxedo Blazer",
          brandName: "Fashion Nova",
          price: "$200",
        },
      ],
    },
    {
      id: 3,
      name: "Jewelry",
      product: [
        {
          id: 1,
          image: "jewelry1.png",
          title: "Gold Necklace",
          brandName: "Elegant Gems",
          price: "$150",
        },
        {
          id: 2,
          image: "jewelry2.png",
          title: "Diamond Ring",
          brandName: "Sparkle Co.",
          price: "$300",
        },
        {
          id: 3,
          image: "jewelry3.png",
          title: "Silver Bracelet",
          brandName: "Shiny Things",
          price: "$120",
        },
        {
          id: 4,
          image: "jewelry4.png",
          title: "Pearl Earrings",
          brandName: "Classic Pearls",
          price: "$180",
        },
      ],
    },
    {
      id: 4,
      name: "Beauty",
      product: [
        {
          id: 1,
          image: "beauty1.png",
          title: "Lipstick Set",
          brandName: "Glamour Beauty",
          price: "$50",
        },
        {
          id: 2,
          image: "beauty2.png",
          title: "Foundation",
          brandName: "Smooth Skin",
          price: "$40",
        },
        {
          id: 3,
          image: "beauty3.png",
          title: "Mascara",
          brandName: "Eye Enhance",
          price: "$30",
        },
        {
          id: 4,
          image: "beauty4.png",
          title: "Blush Palette",
          brandName: "Color Glow",
          price: "$45",
        },
      ],
    },
    {
      id: 5,
      name: "Food",
      product: [
        {
          id: 1,
          image: "food1.png",
          title: "Organic Honey",
          brandName: "Nature's Best",
          price: "$15",
        },
        {
          id: 2,
          image: "food2.png",
          title: "Almond Butter",
          brandName: "Healthy Eats",
          price: "$12",
        },
        {
          id: 3,
          image: "food3.png",
          title: "Granola Bars",
          brandName: "Snack Time",
          price: "$8",
        },
        {
          id: 4,
          image: "food4.png",
          title: "Green Tea",
          brandName: "Zen Drinks",
          price: "$10",
        },
      ],
    },
    {
      id: 6,
      name: "Home",
      product: [
        {
          id: 1,
          image: "home1.png",
          title: "Cushion Set",
          brandName: "Comfort Living",
          price: "$60",
        },
        {
          id: 2,
          image: "home2.png",
          title: "Wall Art",
          brandName: "Decor Plus",
          price: "$80",
        },
        {
          id: 3,
          image: "home3.png",
          title: "Table Lamp",
          brandName: "Light House",
          price: "$45",
        },
        {
          id: 4,
          image: "home4.png",
          title: "Curtain Set",
          brandName: "Home Style",
          price: "$70",
        },
      ],
    },
    {
      id: 7,
      name: "Electronics",
      product: [
        {
          id: 1,
          image: "electronics1.png",
          title: "Wireless Headphones",
          brandName: "SoundMax",
          price: "$120",
        },
        {
          id: 2,
          image: "electronics2.png",
          title: "Smart Watch",
          brandName: "TechTime",
          price: "$200",
        },
        {
          id: 3,
          image: "electronics3.png",
          title: "Bluetooth Speaker",
          brandName: "BeatBox",
          price: "$90",
        },
        {
          id: 4,
          image: "electronics4.png",
          title: "Portable Charger",
          brandName: "ChargeUp",
          price: "$25",
        },
      ],
    },
    {
      id: 8,
      name: "Outdoors",
      product: [
        {
          id: 1,
          image: "outdoors1.png",
          title: "Camping Tent",
          brandName: "Adventure Gear",
          price: "$150",
        },
        {
          id: 2,
          image: "outdoors2.png",
          title: "Hiking Backpack",
          brandName: "Trail Masters",
          price: "$100",
        },
        {
          id: 3,
          image: "outdoors3.png",
          title: "Sleeping Bag",
          brandName: "Cozy Camp",
          price: "$80",
        },
        {
          id: 4,
          image: "outdoors4.png",
          title: "Portable Grill",
          brandName: "BBQ Buddy",
          price: "$60",
        },
      ],
    },
    {
      id: 9,
      name: "Kids",
      product: [
        {
          id: 1,
          image: "kids1.png",
          title: "Toy Car Set",
          brandName: "Fun Wheels",
          price: "$30",
        },
        {
          id: 2,
          image: "kids2.png",
          title: "Building Blocks",
          brandName: "Creative Minds",
          price: "$25",
        },
        {
          id: 3,
          image: "kids3.png",
          title: "Doll House",
          brandName: "Little Homes",
          price: "$45",
        },
        {
          id: 4,
          image: "kids4.png",
          title: "Puzzle Game",
          brandName: "Brain Teasers",
          price: "$20",
        },
      ],
    },
    {
      id: 10,
      name: "Travel",
      product: [
        {
          id: 1,
          image: "travel1.png",
          title: "Travel Backpack",
          brandName: "Wanderlust",
          price: "$100",
        },
        {
          id: 2,
          image: "travel2.png",
          title: "Luggage Set",
          brandName: "Globe Trotter",
          price: "$250",
        },
        {
          id: 3,
          image: "travel3.png",
          title: "Neck Pillow",
          brandName: "Comfort Travel",
          price: "$20",
        },
        {
          id: 4,
          image: "travel4.png",
          title: "Travel Organizer",
          brandName: "PackSmart",
          price: "$35",
        },
      ],
    },
  ];

  const [catagoty, setCatagoty] = useState([]);

  useEffect(() => {
    const catagotyProduct = categories.filter((item) => item.name === name);
    setCatagoty(catagotyProduct);
  }, [name]);

  console.log(catagoty, "Data");
  console.log(name, "Name");

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
              svg={`<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="60" height="60" rx="30" fill="#F6F6F6"/>
<path d="M40 40L35.1745 35.1745M35.1745 35.1745C35.9999 34.3491 36.6547 33.3692 37.1014 32.2907C37.5481 31.2122 37.778 30.0563 37.778 28.889C37.778 27.7217 37.5481 26.5658 37.1014 25.4873C36.6547 24.4089 35.9999 23.429 35.1745 22.6035C34.3491 21.7781 33.3692 21.1234 32.2907 20.6766C31.2122 20.2299 30.0563 20 28.889 20C27.7217 20 26.5658 20.2299 25.4873 20.6766C24.4089 21.1234 23.429 21.7781 22.6035 22.6035C20.9365 24.2705 20 26.5315 20 28.889C20 31.2465 20.9365 33.5075 22.6035 35.1745C24.2705 36.8415 26.5315 37.778 28.889 37.778C31.2465 37.778 33.5075 36.8415 35.1745 35.1745Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`}
            />
          </View>
        }
        title={name}
      />

      <FlatList
        // scrollEnabled={false}
        // nestedScrollEnabled={true}
        data={catagoty}
        renderItem={({ item }) => <CatagoryCard item={item} />}
      />
    </View>
  );
};

export default Details;

import React, { useState } from "react";
import Tags from "../component/share/Tags";

interface Props {}

const Categories: React.FC<Props> = () => {
  const [tags, setTags] = useState({
    Genre: ["House", "Drums"],
    BPM: ["Cover", "House"],
    Key: ["House", "House"],
    License: ["House", "House"],
    Type: ["Type"],
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleClose = (removedTag: string) => {
    setTags((prev) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].filter(
        (tag) => tag !== removedTag
      ),
    }));
  };

  const handleAddNewCategory = (newCategory: string) => {
    if (newCategory && !tags[selectedCategory].includes(newCategory)) {
      setTags((prev) => ({
        ...prev,
        [selectedCategory]: [...prev[selectedCategory], newCategory],
      }));
    }
  };

  return (
    <div className="p-4">
      {/* heading section */}
      <div className="bg-white p-6 rounded-2xl mb-6">
        <div className="">
          <h1 className="text-[#121212] text-[20px] font-semibold font-degular ">
            Categories
          </h1>
          <p className="font-degular font-normal text-[##454545] text-sm pb-4 pt-2">
            You can update your profile information.
          </p>
        </div>
      </div>
      <div className="">
        <Tags
          tags={tags[selectedCategory] || []}
          handleAddNewCategory={handleAddNewCategory}
          handleClose={handleClose}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};

export default Categories;

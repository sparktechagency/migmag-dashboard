import React, { useState, useRef, useEffect } from "react";
import { Button, Tag } from "antd";
import type { InputRef } from "antd";
import CategoryModal from "../manageCategory/CategoryModal";

interface TagsProps {
  tags: string[];
  handleAddNewCategory: (newCategory: string) => void;
  handleClose: (removedTag: string) => void;
  inputVisible: boolean;
  setInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Tags: React.FC<TagsProps> = ({
  tags,
  handleAddNewCategory,
  handleClose,
  // inputVisible,
  // setInputVisible,
  selectedCategory,
  setSelectedCategory,
}) => {
  const inputRef = useRef<InputRef>(null);
  const [inputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    if (inputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputVisible]);

  const triggerTagInput = () => {
    setInputVisible(true);
  };

  const categoryButtons = ["Genre", "BPM", "Key", "License", "Type"];
  return (
    <div>
      {/* Category Buttons */}
      <div className="flex gap-2">
        {categoryButtons.map((cat, index) => (
          <Button
            key={index}
            className={` ${
              selectedCategory === cat
                ? "bg-[##FFFFFF] text-black  border-b-4 border-b-[#e7f056]  "
                : "bg-transparent text-black border-none  border-t-0 border-r-0 border-l-0  "
            }  px-16 py-7 mb-11 text-xl font-medium font-roboto`}
            // type="default"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
      {/* Tags List */}
      <div className="bg-[#FFFFFF] w-[100%] rounded-3xl p-5 flex-col justify-between">
        {tags.map((tag, index) => {
          return (
            <Tag
              key={index}
              // closable={isClosable}
              className="mb-2 px-7 py-3 bg-[#f5f5f5] font-medium text-base rounded-3xl border-none font-popping "
            >
              <div className="flex flex-row-reverse items-center gap-6">
                <svg
                  onClick={() => handleClose(tag)}
                  width="34"
                  height="38"
                  viewBox="0 0 34 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.00250244"
                    y="0.000976562"
                    width="34"
                    height="38"
                    rx="6"
                    fill="#FFE3E3"
                  />
                  <path
                    d="M24.0025 11.001H20.5025L19.5025 10.001H14.5025L13.5025 11.001H10.0025V13.001H24.0025M11.0025 26.001C11.0025 26.5314 11.2132 27.0401 11.5883 27.4152C11.9634 27.7903 12.4721 28.001 13.0025 28.001H21.0025C21.5329 28.001 22.0416 27.7903 22.4167 27.4152C22.7918 27.0401 23.0025 26.5314 23.0025 26.001V14.001H11.0025V26.001Z"
                    fill="#FF0000"
                  />
                </svg>

                {tag}
              </div>
            </Tag>
          );
        })}
        <button
          onClick={triggerTagInput}
          className="w-[160px] font-degular font-semibold py-3 flex justify-center items-center gap-3 bg-[#E7F056] mt-12  rounded-full text-black font-roboto  text-base"
        >
          Add new
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.654348 4.05827C0.816388 2.29108 2.33115 1 4.07555 1H9.42025C10.7073 1 11.8712 1.70314 12.4559 2.78386C12.2797 2.76148 12.1009 2.75 11.9202 2.75H6.57555C4.46723 2.75 2.60705 4.31335 2.40748 6.4898C2.19691 8.78635 2.1977 10.7026 2.40871 13.0071C2.41097 13.0317 2.41343 13.0562 2.41611 13.0807C1.45597 12.562 0.762233 11.6034 0.655588 10.4387C0.448718 8.17943 0.447973 6.309 0.654348 4.05827Z"
              fill="url(#paint0_linear_699_284)"
            />
            <path
              fillRule="evenodd"
              clip-rule="evenodd"
              d="M6.57555 3.5C4.83115 3.5 3.31637 4.79108 3.15435 6.55828C2.94797 8.809 2.94872 10.6794 3.15557 12.9387C3.31747 14.7068 4.83235 16 6.57827 16H11.916C13.6538 16 15.1654 14.7183 15.3348 12.9582C15.5544 10.6762 15.555 8.7963 15.3369 6.53697C15.1671 4.77835 13.6557 3.5 11.9202 3.5H6.57555ZM9.75 7.25C9.75 6.97385 9.52615 6.75 9.25 6.75C8.97385 6.75 8.75 6.97385 8.75 7.25V9.25H6.75C6.47385 9.25 6.25 9.47385 6.25 9.75C6.25 10.0261 6.47385 10.25 6.75 10.25H8.75V12.25C8.75 12.5261 8.97385 12.75 9.25 12.75C9.52615 12.75 9.75 12.5261 9.75 12.25V10.25H11.75C12.0261 10.25 12.25 10.0261 12.25 9.75C12.25 9.47385 12.0261 9.25 11.75 9.25H9.75V7.25Z"
              fill="url(#paint1_linear_699_284)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_699_284"
                x1="19.661"
                y1="19.0307"
                x2="6.35625"
                y2="3.46575"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.00265844" stop-color="#FF37DF" />
                <stop offset="1" stop-color="#6E00FF" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_699_284"
                x1="19.661"
                y1="19.0307"
                x2="6.35625"
                y2="3.46575"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.00265844" stop-color="#FF37DF" />
                <stop offset="1" stop-color="#6E00FF" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>
      ;{/* Modal to add a new tag */}
      <CategoryModal
        inputVisible={inputVisible}
        setInputVisible={setInputVisible}
        handleAddNewCategory={handleAddNewCategory}
      />
    </div>
  );
};

export default Tags;

import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Button, Form, Input, Modal } from "antd";
import {
  useGenreDeleteMutation,
  useGenreGetQuery,
  useGenrePostMutation,
  // useGetGenreQuery,
} from "../redux/dashboardFeatures/catagory/catagoryApiSlice";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

type TabType = "Genre" | "BPM" | "Key" | "License" | "Type";

interface GenreItem {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

const Categories: React.FC = () => {
  const [inputVisible, setInputVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("Genre");
  const [genrePost] = useGenrePostMutation();
  const { data: genres, isLoading, isError, refetch } = useGenreGetQuery();
  const [genreDelete] = useGenreDeleteMutation();

  const handleDeleteGenres = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await genreDelete(id);

          console.log(res, "delete");

          if (res?.data?.success) {
            Swal.fire("Deleted!", res.data.message, "success");
            refetch(); // fetch genre list again
          } else {
            Swal.fire(
              "Error!",
              res?.data?.message || "Failed to delete",
              "error"
            );
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong", "error");
          console.error(error);
        }
      }
    });
  };

  const CatagoryModal = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
      if (activeTab === "Genre") {
        const infoGenre = {
          name: values.name,
        };

        try {
          const res = await genrePost(infoGenre).unwrap();
          if (res?.success === true) {
            console.log(res.message);
            toast.success(res.message);
            refetch();
          }
        } catch (errors) {
          console.log(errors);
        }

        //   console.log(infoGenre, "Genre");
        // } else if (activeTab === "BPM") {
        //   console.log(data, "BPM");
        // } else if (activeTab === "Key") {
        //   console.log(data, "Key");
        // } else if (activeTab === "License") {
        //   console.log(data, "License");
        // } else if (activeTab === "Type") {
        //   console.log(data, "Type");
        // }
      }
      setInputVisible(false);
    };

    const handleCancel = () => {
      setInputVisible(false);
      form.resetFields();
    };

    return (
      <Modal
        width={640}
        title={<div>Add new {activeTab}</div>}
        open={inputVisible}
        onCancel={handleCancel}
        footer={null}
        className="!rounded-xl"
      >
        <div className="rounded-b-3xl p-8">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <p className="font-degular text-lg font-normal mb-3">{activeTab}</p>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: `Please enter a ${activeTab.toLowerCase()} name!`,
                },
              ]}
            >
              <Input
                className="bg-[#F0F0F0] p-5 border-none"
                placeholder="Type here..."
              />
            </Form.Item>
            <div className="flex gap-5">
              <Form.Item className="flex-1 ">
                <Button
                  className="w-full  mt-4 py-6 bg-[#fff5f4] text-red-500   font-degular"
                  type="default"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Form.Item>
              <Form.Item className="flex-1">
                <Button
                  className="w-full mt-4 py-6  bg-[#E7F056] text-black   font-degular"
                  type="default"
                  htmlType="submit"
                >
                  Add
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    );
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
        <Tabs
          onSelect={(index) =>
            setActiveTab(
              ["Genre", "BPM", "Key", "License", "Type"][index] as TabType
            )
          }
        >
          <TabList className="border-[#eeff00] mb-6">
            <Tab>Genre</Tab>
            <Tab>BPM</Tab>
            <Tab>Key</Tab>
            <Tab>License</Tab>
            <Tab>Type</Tab>
          </TabList>

          <TabPanel>
            <div className="bg-white rounded-2xl p-4">
              <div className="flex flex-wrap gap-3">
                {genres?.data?.map((item: GenreItem) => (
                  <div
                    key={item.id}
                    className="bg-[#f5f5f5] flex items-center justify-center gap-3 py-3  px-6 rounded-lg "
                  >
                    <h2 className="text-base font-degular font-normal">
                      {item.name}
                    </h2>
                    <button onClick={() => handleDeleteGenres(item.id)}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask
                          id="mask0_700_295"
                          className="mask-type:alpha"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="24"
                          height="24"
                        >
                          <rect y="0.5" width="14" height="14" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_700_295)">
                          <path
                            d="M4.08203 12.75C3.7612 12.75 3.48655 12.6358 3.25807 12.4073C3.0296 12.1788 2.91536 11.9042 2.91536 11.5833V4H2.33203V2.83333H5.2487V2.25H8.7487V2.83333H11.6654V4H11.082V11.5833C11.082 11.9042 10.9678 12.1788 10.7393 12.4073C10.5109 12.6358 10.2362 12.75 9.91537 12.75H4.08203ZM9.91537 4H4.08203V11.5833H9.91537V4ZM5.2487 10.4167H6.41536V5.16667H5.2487V10.4167ZM7.58203 10.4167H8.7487V5.16667H7.58203V10.4167Z"
                            fill="#FF3B30"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setInputVisible(true)}
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
                    clipRule="evenodd"
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
                      <stop offset="0.00265844" stopColor="#FF37DF" />
                      <stop offset="1" stopColor="#6E00FF" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_699_284"
                      x1="19.661"
                      y1="19.0307"
                      x2="6.35625"
                      y2="3.46575"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.00265844" stopColor="#FF37DF" />
                      <stop offset="1" stopColor="#6E00FF" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="bg-white rounded-2xl p-4">
              <div className="bg-[#f5f5f5] flex items-center justify-center gap-4 py-4 px-6 rounded-lg w-[120px]">
                <h2 className="text-base font-degular font-normal">House</h2>
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_700_295"
                      className="mask-type:alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect y="0.5" width="14" height="14" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_700_295)">
                      <path
                        d="M4.08203 12.75C3.7612 12.75 3.48655 12.6358 3.25807 12.4073C3.0296 12.1788 2.91536 11.9042 2.91536 11.5833V4H2.33203V2.83333H5.2487V2.25H8.7487V2.83333H11.6654V4H11.082V11.5833C11.082 11.9042 10.9678 12.1788 10.7393 12.4073C10.5109 12.6358 10.2362 12.75 9.91537 12.75H4.08203ZM9.91537 4H4.08203V11.5833H9.91537V4ZM5.2487 10.4167H6.41536V5.16667H5.2487V10.4167ZM7.58203 10.4167H8.7487V5.16667H7.58203V10.4167Z"
                        fill="#FF3B30"
                      />
                    </g>
                  </svg>
                </button>
              </div>
              <button
                onClick={() => setInputVisible(true)}
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
                    clipRule="evenodd"
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
                      <stop offset="0.00265844" stopColor="#FF37DF" />
                      <stop offset="1" stopColor="#6E00FF" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_699_284"
                      x1="19.661"
                      y1="19.0307"
                      x2="6.35625"
                      y2="3.46575"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.00265844" stopColor="#FF37DF" />
                      <stop offset="1" stopColor="#6E00FF" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <CatagoryModal />
    </div>
  );
};

export default Categories;

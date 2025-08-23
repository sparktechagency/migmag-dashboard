import {
  Avatar,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  PopconfirmProps,
  Radio,
  Table,
  Upload,
} from "antd";
import { CloudCog, Pencil, Search, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Tag } from "antd";
import { Checkbox } from "antd";
import type { CheckboxOptionType, GetProp } from "antd";
import Swal from "sweetalert2";

import {
  useArtistDeteteMutation,
  useArtistGetQuery,
  useArtistUpdateMutation,
} from "../redux/dashboardFeatures/Artist/artistApiSlice";
import { useArtistPostMutation } from "../redux/dashboardFeatures/Artist/artistApiSlice";

const Top_Artist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(7);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [formValue, setFormValue] = useState();
  const [updateID, setUpdateID] = useState();

  const {
    data: artistData,
    isFetching,
    isLoading,
    refetch
  } = useArtistGetQuery({
    search: searchValue,
    page: page,
    per_page: per_page,
  });

  const [artistPost] = useArtistPostMutation();
  const [artistDetete] = useArtistDeteteMutation();
  const [artistUpdate] = useArtistUpdateMutation();

  // delete
  const handleDelete: PopconfirmProps["onConfirm"] = async (id) => {
    try {
      const res = await artistDetete(id).unwrap();
      if (res.success) {
        message.success("Click on Yes");
      }
    } catch (errors) { }
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    message.error("Click on No");
  };

  // edit modal
  const showModal = async (item: any) => {
    // modal open করার আগে reset করো
    form.resetFields();
    setFormValue(null);
    setUpdateID(null);

    // যদি নতুন item থাকে, তখন সেট করো
    if (item) {
      setFormValue(item);
      setUpdateID(item.id);
    }

    // Refetch async call
    const { data } = await refetch();

    // formValue update করো refetch data অনুযায়ী
    if (item) {
      setFormValue({ ...item, ...data });
    } else {
      setFormValue(data);
    }

    // এখন modal open করো
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    await refetch(); // data refresh after modal close
  };

  const handleCancel = async () => {
    setIsModalOpen(false);
    await refetch();
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values?.name);
    formData.append("description", values?.description);
    formData.append("location", values?.location);
    formData.append("gender", values?.gender);
    formData.append("description", values?.description);
    if (checkedValues?.length > 1) {
      formData.append("singer", checkedValues[0]);
      formData.append("singer_writer", checkedValues[1]);
    }

    if (file) {
      formData.append("profile", file);
    }
    try {
      if (updateID) {
        formData.append("_method", "PUT");
        const res = await artistUpdate({
          id: updateID,
          artistInfo: formData,
        }).unwrap();
        console.log("====================================");
        console.log(res);
        console.log("====================================");
        if (res?.success) {
          message.success(res?.message);
          setUpdateID(null);
          setIsModalOpen(false);
        } else {
          message.error(res?.message);
          console.log(res.message);
        }
      } else {
        const res = await artistPost(formData).unwrap();

        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res?.message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res?.message,
          });
        }
      }
    } catch (errors) {
      console.log(errors)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors?.message,
      });
    }
  };

  const handleBeforeUpload = (file: File) => {
    setFile(file);
    return false;
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const columns = [
    {
      title: "Artist",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar src={`${import.meta.env.VITE_BASE_URL}/${record.profile}`} />
          <h2>{text}</h2>
        </div>
      ),
    },
    {
      title: "Singer Info",
      key: "singer_info",
      render: (_, record) => (
        <div>
          {record.singer && record.singer_writer ? (
            <div className="flex flex-row items-center gap-2">
              <Tag color="blue">{record.singer}</Tag>
              <Tag color="green">{record.singer_writer}</Tag>
            </div>
          ) : record.singer_writer ? (
            <Tag color="green">singer_writer</Tag>
          ) : (
            <Tag color="blue">singer</Tag>
          )}
        </div>
      ),
    },

    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <span className=" cursor-pointer " >
            <svg
              onClick={() => showModal(record)}
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 22V18H20V22H0ZM4 14H5.4L13.2 6.225L11.775 4.8L4 12.6V14ZM2 16V11.75L13.2 0.575C13.3833 0.391667 13.5958 0.25 13.8375 0.15C14.0792 0.05 14.3333 0 14.6 0C14.8667 0 15.125 0.05 15.375 0.15C15.625 0.25 15.85 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15833 18 3.425C18 3.675 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L6.25 16H2Z"
                fill="#49ADF4"
              />
            </svg>
          </span>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <span className=" cursor-pointer " >
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                  fill="#E53E3E"
                />
              </svg>
            </span>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const optionsWithDisabled = [
    { label: "singer", value: "singer" },
    { label: "singer_writer", value: "singer_writer" },
  ];

  const onChange = (checkedValues) => {
    setCheckedValues(checkedValues);
  };

  React.useEffect(() => {
    if (formValue) {
      form.setFieldsValue({
        name: formValue?.location,
        gender: formValue?.gender,
        description: formValue?.description,
        profile: formValue?.profile,
        singer: formValue?.singer,
        singer_writer: formValue?.singer_writer,
      });
    }
  }, []);
  console.log("===============setUpdateID=====================");
  console.log(updateID);
  console.log("================setUpdateID====================");
  console.log(` =======================${formValue}======================================= `)

  const [fileList, setFileList] = useState<any[]>([]);

  // Modal open হলে formValue থেকে file set করা
  useEffect(() => {
    if (formValue?.file || formValue?.image) {
      setFileList([
        {
          uid: "-1",
          name: formValue.file?.name || "File",
          status: "done",
          url: formValue.file?.url || formValue.image, // file URL
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [formValue]);






  return (
    <div>
      <div className="bg-white p-6 rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="">
            <h1 className="text-[#121212] text-[20px] font-semibold font-degular ">
              Top Artist List
            </h1>
            <p className="font-degular font-normal text-sm pb-4 pt-2">
              Update your top artist list. You can or delete artist.
            </p>
          </div>
          <Button
            type="default"
            onClick={showModal}
            className="bg-[#E7F056] p-4 border-none text-base text-[#3A3A3A] font-degular font-semibold"
            shape="round"
          >
            Add new Artist
          </Button>
        </div>
        <Input
          prefix={<Search color="#888888" />}
          onChange={handleSearchChange}
          className="w-full rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
          placeholder="Search for Listing"
          style={{
            backgroundColor: "#f0f0f0",
            color: "#333333",
          }}
        />
      </div>
      <div className="py-8">
        <Table
          loading={isFetching || isLoading}
          dataSource={artistData?.data?.data}
          columns={columns}
          pagination={{
            current: page,
            pageSize: per_page,
            total: artistData?.data?.total,
            onChange: (page) => setPage(page),
          }}
          rowClassName={() => "hover:bg-transparent"}
        />
        {/* modal */}
        <Modal
          title="Basic Modal"
          className="!w-[650px]"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
          maskClosable={false} // বাইরে click করলে modal বন্ধ হবে না
        >
          <Form
            form={form}
            onFinish={onFinish}
            initialValues={formValue} // ✅ initialValues ব্যবহার
            key={formValue?.id} // ✅ id change হলে form re-render হবে
          >
            <Form.Item
              className="bg-[#f5f5f5] border-dashed rounded-lg text-center py-4 my-4 flex items-center justify-center"
            >
              <Upload.Dragger
                name="file"
                beforeUpload={handleBeforeUpload}
                className="rounded-md"
                showUploadList={true}
                maxCount={1}
              >
                <Button className="flex">
                  {/* Upload icon */}
                  Upload
                </Button>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item label="Artist name" name="name" layout="vertical">
              <Input placeholder="Enter singer name" required />
            </Form.Item>

            <Form.Item label="Description" name="description" layout="vertical">
              <TextArea placeholder="Enter description" required />
            </Form.Item>

            <Form.Item label="Location" name="location" layout="vertical">
              <Input placeholder="Enter location" required />
            </Form.Item>

            <Form.Item label="Gender" name="gender">
              <Radio.Group className="flex gap-3 mt-9">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Singer Info">
              <Checkbox.Group
                options={optionsWithDisabled}
                defaultValue={["singer"]}
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item>
              <div className="flex gap-4 mt-20">
                <Button
                  onClick={handleCancel}
                  className="w-full bg-[#fff5f4] text-[#FF3B30] border-none rounded-2xl p-5 font-bold text-xl"
                >
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  onClick={handleOk}
                  className="w-full bg-[#E7F056] border-none rounded-2xl p-5 font-bold text-xl"
                >
                  Save changes
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Top_Artist;

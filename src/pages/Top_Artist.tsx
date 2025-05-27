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
import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Tag } from "antd";
import { Checkbox } from 'antd';
import type { CheckboxOptionType, GetProp } from 'antd';
import Swal from "sweetalert2";

import { useArtistGetQuery } from "../redux/dashboardFeatures/Artist/artistApiSlice";
import { useArtistPostMutation } from "../redux/dashboardFeatures/Artist/artistApiSlice";

const Top_Artist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(7);
  const [checkedValues, setCheckedValues] = useState({})
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);

  const {
    data: artistData,
    isFetching,
    isLoading,
  } = useArtistGetQuery({
    search: searchValue,
    page: page,
    per_page: per_page,
  });
  const pageSize = 10;

  const [artistPost] = useArtistPostMutation()

  // delete
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  // edit modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    console.log(values.name, values.gender, values.description);


    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("gender", values.gender);
    formData.append("description", values.description);
    if (checkedValues?.length > 1) {
      formData.append("singer", checkedValues[0]);
      formData.append("singer_writer", checkedValues[1]);
    }

    if (file) {
      formData.append("profile", file);
    }
    try {
      const res = await artistPost(formData).unwrap();
      console.log(res);
      
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
  } catch (errors) {
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
        <Avatar src={record.profile} />
        <h2>{text}</h2>
      </div>
    ),
  },
  {
    title: "Singer Info",
    key: "singer_info",
    render: (_, record) => (
      <div>
        {record.singer && record.singer_writer ?
          <div className="flex flex-row items-center gap-2">
            <Tag color="blue">{record.singer}</Tag>
            <Tag color="green">{record.singer_writer}</Tag>
          </div>

          : <Tag color="green"> {record.singer} {record.singer_writer} </Tag>}
      </div>
    )
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
    render: () => (
      <div className="flex gap-2">
        <svg
          onClick={showModal}
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
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
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
        </Popconfirm>
      </div>
    ),
  },
];

const optionsWithDisabled = [
  { label: 'singer', value: 'singer' },
  { label: 'singer_writer', value: 'singer_writer' },
];

const onChange = (checkedValues) => {
  console.log('Checked values: ', checkedValues);
  setCheckedValues(checkedValues)
};
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
        className="!w-[650px] "
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form onFinish={onFinish}>
          <Form.Item className="bg-[#f5f5f5] border-dashed rounded-lg text-center py-4 my-4 flex items-center   justify-center  ">
            <Upload.Dragger
              name="file"
              beforeUpload={handleBeforeUpload}
              className="rounded-md"
              showUploadList={true}
            >
              <Button className="flex">
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.5 6.99976V8.99976H2.5V17.9998H16.5V8.99976H13.5V6.99976H16.5C17.0304 6.99976 17.5391 7.21047 17.9142 7.58555C18.2893 7.96062 18.5 8.46933 18.5 8.99976V17.9998C18.5 18.5302 18.2893 19.0389 17.9142 19.414C17.5391 19.789 17.0304 19.9998 16.5 19.9998H2.5C1.96957 19.9998 1.46086 19.789 1.08579 19.414C0.710714 19.0389 0.5 18.5302 0.5 17.9998V8.99976C0.5 8.46933 0.710714 7.96062 1.08579 7.58555C1.46086 7.21047 1.96957 6.99976 2.5 6.99976H5.5ZM10.384 0.468761L13.743 3.82676C13.9306 4.0144 14.0361 4.2689 14.0361 4.53426C14.0361 4.79962 13.9306 5.05412 13.743 5.24176C13.5554 5.4294 13.3009 5.53482 13.0355 5.53482C12.7701 5.53482 12.5156 5.4294 12.328 5.24176L10.5 3.41276V12.9998C10.5 13.265 10.3946 13.5193 10.2071 13.7069C10.0196 13.8944 9.76522 13.9998 9.5 13.9998C9.23478 13.9998 8.98043 13.8944 8.79289 13.7069C8.60536 13.5193 8.5 13.265 8.5 12.9998V3.41276L6.672 5.24176C6.57909 5.33467 6.46879 5.40837 6.3474 5.45865C6.226 5.50894 6.0959 5.53482 5.9645 5.53482C5.83311 5.53482 5.703 5.50894 5.5816 5.45865C5.46021 5.40837 5.34991 5.33467 5.257 5.24176C5.16409 5.14885 5.09039 5.03855 5.04011 4.91716C4.98982 4.79576 4.96394 4.66566 4.96394 4.53426C4.96394 4.40287 4.98982 4.27276 5.04011 4.15136C5.09039 4.02997 5.16409 3.91967 5.257 3.82676L8.617 0.468761C8.85139 0.234575 9.16917 0.103027 9.5005 0.103027C9.83183 0.103027 10.1496 0.234575 10.384 0.468761Z"
                    fill="black"
                  />
                </svg>
                Upload
              </Button>
            </Upload.Dragger>
          </Form.Item>
          {/* Artist name */}
          <Form.Item label="Artist name" name="name" layout="vertical">
            <Input placeholder="Enter singer name" required></Input>
          </Form.Item>
          <Form.Item label="Description" name="description" layout="vertical">
            <TextArea placeholder="Enter description" required></TextArea>
          </Form.Item>
          <Form.Item label="location" name="location" layout="vertical">
            <Input placeholder="Enter location" required></Input>
          </Form.Item>
          {/*Gender */}
          <Form.Item
            label="Gender"
            name="gender"
            className=""
          // layout="vertical"
          >
            <Radio.Group className="flex  gap-3 mt-9 ">
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Singer Info	">
          </Form.Item>
          <Checkbox.Group

            options={optionsWithDisabled}
            defaultValue={['singer']}
            onChange={onChange}
          />
          <Form.Item>
            <div className="flex gap-4 mt-20">
              <Button
                onClick={handleCancel}
                className="w-full  bg-[#fff5f4] text-[#FF3B30] border-none rounded-2xl p-5 font-bold font-degular text-xl"
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                // onClick={handleOk}
                className="w-full bg-[#E7F056] border-none rounded-2xl p-5 font-bold font-degular text-xl"
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
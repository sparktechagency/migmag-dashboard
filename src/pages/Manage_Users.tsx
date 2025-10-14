import { Avatar, Button, Form, Input, message, Modal, Radio, Table } from "antd";
import { Pencil, Search, Trash } from "lucide-react";
import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
  useBannedPatchMutation,
  useSearchUserQuery,
} from "../redux/dashboardFeatures/manage_user/manageUserSlice";
import { useForm } from "antd/es/form/Form";

const Manage_Users = () => {
  const [formOne] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectId, setSelectId] = useState("");
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(7);
  const [searchValue, setSearchValue] = useState("");

  const {
    data: UsersData,
    isFetching,
    isLoading,
    refetch
  } = useSearchUserQuery({
    search: searchValue,
    page: page,
    per_page: per_page,
  });
  console.log("UsersData is ", UsersData)
  const [bannedPatch] = useBannedPatchMutation();

  const onfinishOne = async (values) => {
    try {
      const res = await bannedPatch({
        id: selectId,
        is_banned: values.radio,
      }).unwrap();
      if (res) {
        message.success("User band successfully")
        refetch()
      }
    } catch (errors) {
      console.log(" error is ", errors)
      message.error("User band fail")
    }
  };

  const showModal = (record) => {
    setSelectId(record.id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    formOne.submit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const columns = [
    {
      title: "Users",
      dataIndex: "full_name",
      key: "full_name",
      render: (full_name, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${record.avatar}`}
            alt={full_name}
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
          <h2>{full_name}</h2>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Profile status",
      dataIndex: "is_banned",
      key: "is_banned",
      render: (is_banned) => (
        <span
          style={{
            color: is_banned === true ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {is_banned === true ? "Banned" : "Active"}
        </span>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record: object) => {
        return <EditOutlined onClick={() => showModal(record)} />;
      },
    },
  ];

  return (
    <div>
      <div className="bg-white p-6 rounded-2xl">
        <div className="">
          <h1 className="text-[#121212] text-[20px] font-semibold font-degular ">
            Manage users
          </h1>
          <p className="font-degular font-normal text-sm pb-4 pt-2">
            Manage the users of your website. You can ban or unban, whichever
            you want.
          </p>
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
          dataSource={UsersData?.data.data}
          columns={columns}
          pagination={{
            current: page,
            pageSize: per_page,
            total: UsersData?.data?.total,
            onChange: (page) => setPage(page),
          }}
          rowClassName={() => "hover:bg-transparent"}
        />
        {/* Change status moudal */}
        <Modal
          title="Change status"
          className="!w-[400px] "
          onCancel={handleCancel}
          open={isModalOpen}
          footer={false}
        >
          <Form form={formOne} onFinish={onfinishOne}>
            <Form.Item name="radio">
              <Radio.Group className="flex flex-col gap-3 mt-7">
                <Radio value="1">Ban</Radio>
                <Radio value="0">Unban</Radio>
                <Button
                  onClick={handleOk}
                  className="bg-[#E7F056] mt-7 p-5 font-semibold font-degular text-xl"
                >
                  Done
                </Button>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Manage_Users;

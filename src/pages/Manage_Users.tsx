import { Avatar, Button, Input, Modal, Radio, Table } from "antd";
import { Pencil, Search, Trash } from "lucide-react";
import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const Manage_Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserAction | null>(null);
  const [role, setRole] = useState<string>("");
  const [radioGetValue, setRadioGetValue] = useState("Ban");

  const pageSize = 10;

  const dataSource = [
    {
      key: "1",
      name: "Samantha Rivers",
      email: "contact@newdomain.com",
      status: "Unbanned",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      key: "2",
      name: "Marcus Thompson",
      email: "support@anotherdomain.org",
      status: "Unbanned",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      key: "3",
      name: "Elena Martinez",
      email: "info@undiscovered.com",
      status: "Unbanned",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      key: "4",
      name: "Derek Johnson",
      email: "hello@verifiedmail.com",
      status: "Unbanned",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    {
      key: "5",
      name: "Tina Chen",
      email: "admin@securemail.net",
      status: "Unbanned",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    {
      key: "6",
      name: "Oliver Brown",
      email: "user@unknownmail.com",
      status: "Unbanned",
      avatar: "https://i.pravatar.cc/40?img=6",
    },
    {
      key: "7",
      name: "Ava Patel",
      email: "team@trustedsource.com",
      status: "Unbanned",
      avatar: "https://i.pravatar.cc/40?img=7",
    },
    {
      key: "8",
      name: "Liam Smith",
      email: "contact@reliablemail.com",
      status: "Unbanned",
      avatar: "https://i.pravatar.cc/40?img=8",
    },
    {
      key: "9",
      name: "Zoe Kim",
      email: "support@verifiedservice.com",
      status: "Unbanned",
      avatar: "https://i.pravatar.cc/40?img=9",
    },
    {
      key: "10",
      name: "Shila",
      email: "info@authenticmail.org",
      status: "Unbanned",
      avatar: "https://i.pravatar.cc/40?img=10",
    },
    {
      key: "11",
      name: "Lorry Kim",
      email: "info@authenticmail.org",
      status: "Unbanned",
      avatar: "https://i.pravatar.cc/40?img=11",
    },
  ];

  const columns = [
    {
      title: "Users",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar src={record.avatar} />
          <h2>{text}</h2>
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
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <EditOutlined
          style={{ color: "#1890ff", cursor: "pointer" }}
          onClick={showModal}
        />
      ),
    },
  ];

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  // Change status modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleRadioValue = (e) => {
    console.log(e.target.value);
  };

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
          prefix={<Search color="#888888"/>}
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
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize,
            total: 50,
            current: currentPage,
            onChange: handlePage,
          }}
          rowClassName={() => "hover:bg-transparent"}
        />
        {/* Change status moudal */}
        <Modal title="Change status" className="!w-[400px] " open={isModalOpen} footer={false}>
          <Radio.Group
            defaultValue={radioGetValue}
            onChange={handleRadioValue}
            className="flex flex-col gap-3 mt-7"
          >
            <Radio value="Ban">Ban</Radio>
            <Radio value="Unban">Unban</Radio>
            <Button
              onClick={handleOk}
              className="bg-[#E7F056] mt-7 p-5 font-semibold font-degular text-xl"
            >
              Done
            </Button>
          </Radio.Group>
        </Modal>
      </div>
    </div>
  );
};

export default Manage_Users;

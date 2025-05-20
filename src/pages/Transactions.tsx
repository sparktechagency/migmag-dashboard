import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  PopconfirmProps,
  Radio,
  Table,
  Upload,
} from "antd";
import { Divide, Pencil, Search, Trash } from "lucide-react";
import React, { useState } from "react";
import { DownloadOutlined, EditOutlined } from "@ant-design/icons";
import { message, Popconfirm } from "antd";

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserAction | null>(null);
  const [role, setRole] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const pageSize = 10;

  const dataSource = [
    {
      key: "1",
      name: "Samantha Rivers",
      title: "Slap house",
      artist: "Charlie",
      license: "Non-exclusive",
      price: "€1,000",
      status: "Success",
      avatar: "https://i.pravatar.cc/40?img=11",
    },
    {
      key: "2",
      name: "Samantha Rivers",
      title: "Slap house",
      artist: "Charlie",
      license: "Non-exclusive",
      price: "€1,000",
      status: "Success",
      avatar: "https://i.pravatar.cc/40?img=11",
    },
    {
      key: "3",
      name: "Samantha Rivers",
      title: "Slap house",
      artist: "Charlie",
      license: "Non-exclusive",
      price: "€1,000",
      status: "Success",
      avatar: "https://i.pravatar.cc/40?img=11",
    },
    {
      key: "4",
      name: "Samantha Rivers",
      title: "Slap house",
      artist: "Charlie",
      license: "Non-exclusive",
      price: "€1,000",
      status: "Success",
    },
    {
      key: "5",
      name: "Samantha Rivers",
      title: "Slap house",
      artist: "Charlie",
      license: "Non-exclusive",
      price: "€1,000",
      status: "Success",
    },
    {
      key: "6",
      name: "Samantha Rivers",
      title: "Slap house",
      artist: "Charlie",
      license: "Non-exclusive",
      price: "€1,000",
      status: "Success",
    },
    {
      key: "7",
      name: "Samantha Rivers",
      title: "Slap house",
      artist: "Charlie",
      license: "Non-exclusive",
      price: "€1,000",
      status: "Success",
    },
    {
      key: "8",
      name: "Samantha Rivers",
      title: "Slap house",
      artist: "Charlie",
      license: "Non-exclusive",
      price: "€1,000",
      status: "Success",
    },
    {
      key: "9",
      name: "Samantha Rivers",
      title: "Slap house",
      artist: "Charlie",
      license: "Non-exclusive",
      price: "€1,000",
      status: "Success",
    },
    {
      key: "10",
      name: "Samantha Rivers",
      title: "Slap house",
      artist: "Charlie",
      license: "Non-exclusive",
      price: "€1,000",
      status: "Success",
      avatar: "https://i.pravatar.cc/40?img=11",
    },
    {
      key: "11",
      name: "Samantha Rivers",
      title: "Slap house",
      artist: "Charlie",
      license: "Non-exclusive",
      price: "€1,000",
      status: "Success",
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
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
    },
    {
      title: "License",
      dataIndex: "license",
      key: "license",
    },
    {
      title: "License",
      dataIndex: "license",
      key: "license",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const handlePage = (page: number) => {
    setCurrentPage(page);
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

  const onFinish = (e) => {
    console.log(e);
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-2xl">
        <div className="flex justify-between">
          <div className="">
            <h1 className="text-[#121212] text-[20px] font-semibold font-degular ">
              Transactions
            </h1>
            <p className="font-degular font-normal text-sm pb-4 pt-2">
              You can update your profile information.
            </p>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default Transactions;

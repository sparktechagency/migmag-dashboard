import { Avatar, PopconfirmProps, Table, Tag } from "antd";
import React, { useState } from "react";
import { message } from "antd";
import { useTransactionGetQuery } from "../redux/dashboardFeatures/Transaction/transactionApiSlice";

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(7);

  const {
    data: transactionData,
    isFetching,
    isLoading,
  } = useTransactionGetQuery({ page: page, per_page: per_page });

  console.log("====================================");
  console.log(transactionData, "transactionData");
  console.log("====================================");
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    message.error("Click on No");
  };

  const pageSize = 10;

  const columns = [
    {
      title: "Users",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar
            src={`${import.meta.env.VITE_BASE_URL}/${record?.order?.user?.avatar
              }`}
          />
          <div>
            <h2>{record?.order?.user?.last_name}</h2>
            <p>{record?.order?.user?.email}</p>
          </div>
        </div>
      ),
    },

    {
      title: "Total amount",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (_, record) => <h2>{record?.order?.total_amount}</h2>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (_, record) => <h2>{record?.order?.user?.location}</h2>,
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      render: (_, record) => <h2>{record?.currency}</h2>,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => {
        const formattedDate = new Date(text).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Tag color="green">
          {" "}
          <h2>{record?.status}</h2>
        </Tag>
      ),
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

  const onFinish = (e) => { };

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
          loading={isFetching || isLoading}
          dataSource={transactionData?.data?.data}
          columns={columns}
          pagination={{
            current: page,
            pageSize: per_page,
            total: transactionData?.data?.total,
            onChange: (page) => setPage(page),
          }}
          rowClassName={() => "hover:bg-transparent"}
        />
      </div>
    </div>
  );
};

export default Transactions;

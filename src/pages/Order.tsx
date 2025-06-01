import { Avatar, Button, Divider, Form, Input, Modal, Table } from "antd";
import { Search, Vault } from "lucide-react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import { useOrderGetQuery } from "../redux/dashboardFeatures/Order/orderSlice";

const Order = () => {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(7);
  const [updatID, setUpdatID] = useState();
  const [updatData, setUpdatData] = useState();
  const [formOne] = useForm();

  const columns = [
    {
      title: "Order number",
      dataIndex: "order_number",
      key: "order_number",
    },
    {
      title: "User name",
      dataIndex: "first_name",
      key: "first_name",
      render: (_, record) => (
        <h2 className="font-degular h3-sm font-normal">
          {record?.user?.first_name}
        </h2>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => (
        <h2 className="font-degular h3-sm font-normal">
          {record?.user?.email}
        </h2>
      ),
    },
    {
      title: "Total amount",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (h3) => {
        const formattedDate = new Date(h3).toLocaleString("en-US", {
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <svg
            onClick={() => showModal(record)}
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.544 7.045C20.848 7.471 21 7.685 21 8C21 8.316 20.848 8.529 20.544 8.955C19.178 10.871 15.689 15 11 15C6.31 15 2.822 10.87 1.456 8.955C1.152 8.529 1 8.315 1 8C1 7.684 1.152 7.471 1.456 7.045C2.822 5.129 6.311 1 11 1C15.69 1 19.178 5.13 20.544 7.045Z"
              stroke="#49ADF4"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 8C14 7.20435 13.6839 6.44129 13.1213 5.87868C12.5587 5.31607 11.7956 5 11 5C10.2044 5 9.44129 5.31607 8.87868 5.87868C8.31607 6.44129 8 7.20435 8 8C8 8.79565 8.31607 9.55871 8.87868 10.1213C9.44129 10.6839 10.2044 11 11 11C11.7956 11 12.5587 10.6839 13.1213 10.1213C13.6839 9.55871 14 8.79565 14 8Z"
              stroke="#49ADF4"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      ),
    },
  ];

  // edit modal
  const showModal = (updateData) => {
    setUpdatData(updateData);
    setUpdatID(updateData.id);
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    data: orderData,
    isLoading,
    isFetching,
  } = useOrderGetQuery({
    params: {
      search: searchValue,
      page: page,
      per_page: per_page,
    },
  });
  console.log("============orderData========================");
  console.log(orderData);
  console.log("==============orderData======================");

  // order details page modal data  start
  const dataSource = [
    {
      key: "1",
      description: "5.0 Master Tokens",
      quantity: 1,
      unitPrice: 425.0,
      processingFee: 21.25,
      tax: 0.0,
      total: 446.25,
    },
  ];

  const columnsModal = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit Price (CHF)",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Processing Fee (5%)",
      dataIndex: "processingFee",
      key: "processingFee",
    },
    {
      title: "Tax (8.1%)",
      dataIndex: "tax",
      key: "tax",
    },
    {
      title: "Total (CHF)",
      dataIndex: "total",
      key: "total",
    },
  ];
  // order details page modal create  end

  return (
    <div>
      <div className="bg-white p-6 rounded-2xl">
        <div className="flex justify-between">
          <div className="">
            <h1 className="h3-[#121212] h3-[20px] font-semibold font-degular ">
              Order List
            </h1>
            <p className="font-degular font-normal h3-sm pb-4 pt-2">
              For adding a new song or edit existing song.
            </p>
          </div>
        </div>
        <Input
          prefix={<Search />}
          className="w-full rounded-2xl h-12 bg-base border-0 h3-primary placeholder:h3-gray-200"
          placeholder="Search for Listing"
          onChange={handleSearchChange}
          style={{
            backgroundColor: "#f0f0f0",
            color: "#333333",
          }}
        />
      </div>
      <div className="py-8">
        <Table
          loading={isFetching || isLoading}
          // dataSource={dataSource}
          dataSource={orderData?.data}
          columns={columns}
          pagination={{
            current: page,
            pageSize: per_page,
            total: orderData?.data?.total,
            onChange: (page) => setPage(page),
          }}
          rowClassName={() => "hover:bg-transparent"}
        />
        {/* edit modal */}
        <Modal
          title="Basic Modal"
          className="!w-[650px] !top-10 !max-h-[90vh] overflow-y-scroll rounded-lg "
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <div className="max-w-2xl mx-auto p-6 text-black  rounded shadow">
            <h2 level={4}>Md. Maksud Bhuiyan</h2>
            <p>1230 Sector-10, Uttara, Dhaka, Bangladesh</p>

            <Divider />

            <Table
              dataSource={dataSource}
              columns={columnsModal}
              pagination={false}
              bordered
              className="my-4"
            />

            <div className="h3-right space-y-2">
              <div className="flex justify-between">
                <h3>Subtotal:</h3>
                <h3>CHF 425.00</h3>
              </div>
              <div className="flex justify-between">
                <h3>Processing Fee (5%):</h3>
                <h3>CHF 21.25</h3>
              </div>
              <div className="flex justify-between">
                <h3>Tax (8.1% - Switzerland):</h3>
                <h3>CHF 0.00</h3>
              </div>
              <Divider />
              <div className="flex justify-between h3-lg font-semibold">
                <h3>Total Due:</h3>
                <h3>CHF 446.25</h3>
              </div>
              <Divider />

              <h3 className="h3-green-600 font-semibold">Paid with: Card</h3>
              <h3>Remaining Balance: CHF 0.00</h3>
            </div>

            <p className="h3-center mt-6 h3-gray-500 h3-sm">
              Thank you for your business!
            </p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Order;

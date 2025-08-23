import {
  Avatar,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Radio,
  Table,
  Upload,
  Checkbox,
  Tag,
} from "antd";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import Swal from "sweetalert2";

import {
  useArtistDeteteMutation,
  useArtistGetQuery,
  
  useArtistPostMutation,
} from "../redux/dashboardFeatures/Artist/artistApiSlice";
import { useArtistUpdateMutation } from "../redux/dashboardFeatures/updateProfile/updateProfileApiSlice";

const Top_Artist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(7);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [formValue, setFormValue] = useState<any>(null);
  const [updateID, setUpdateID] = useState<number | null>(null);

  const [form] = Form.useForm();

  const DEFAULT_PROFILE = "/default-profile.png"; // Default profile image

  const {
    data: artistData,
    isFetching,
    isLoading,
    refetch,
  } = useArtistGetQuery({
    search: searchValue,
    page: page,
    per_page: per_page,
  });

  const [artistPost] = useArtistPostMutation();
  const [artistDetete] = useArtistDeteteMutation();
  const [artistUpdate] = useArtistUpdateMutation();

  const [fileList, setFileList] = useState<any[]>([]);

  const handleDelete = async (id: number) => {
    try {
      const res = await artistDetete(id).unwrap();
      if (res.success) {
        message.success("Deleted successfully!");
        await refetch();
      }
    } catch {
      message.error("Delete failed");
    }
  };

  const cancel = () => message.error("Cancelled");

  const handleBeforeUpload = (file: File) => {
    setFile(file);
    setFileList([
      {
        uid: "-1",
        name: file.name,
        status: "done",
        url: URL.createObjectURL(file),
      },
    ]);
    return false;
  };

  const showModal = (item?: any) => {
    setFormValue(item || null);
    setUpdateID(item?.id || null);
    setFile(null);
    form.resetFields();

    if (item) {
      form.setFieldsValue({
        name: item.name,
        description: item.description,
        location: item.location,
        gender: item.gender,
        singer_info: [
          ...(item.singer ? ["singer"] : []),
          ...(item.singer_writer ? ["singer_writer"] : []),
        ],
      });

      setFileList([
        {
          uid: "-1",
          name: "profile.png",
          status: "done",
          url: item.profile
            ? `${import.meta.env.VITE_BASE_URL}/${item.profile}`
            : DEFAULT_PROFILE,
        },
      ]);
    } else {
      setFileList([
        {
          uid: "-1",
          name: "profile.png",
          status: "done",
          url: DEFAULT_PROFILE,
        },
      ]);
    }

    setIsModalOpen(true);
  };

  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("gender", values.gender);

    if (values.singer_info?.includes("singer")) formData.append("singer", "singer");
    if (values.singer_info?.includes("singer_writer")) formData.append("singer_writer", "singer_writer");
    if (file) formData.append("profile", file);

    try {
      if (updateID) {
        formData.append("_method", "PUT");
        const res = await artistUpdate({ id: updateID, artistInfo: formData }).unwrap();
        if (res.success) {
          message.success(res.message);
          setIsModalOpen(false);
          await refetch();
        } else {
          message.error(res.message);
        }
      } else {
        const res = await artistPost(formData).unwrap();
        if (res.success) {
          Swal.fire("Success", res.message, "success");
          setIsModalOpen(false);
          await refetch();
        } else {
          Swal.fire("Error", res.message, "error");
        }
      }
    } catch (err: any) {
      console.log(err)
      Swal.fire("Error", err?.data.message );
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const columns = [
    {
      title: "Artist",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div className="flex items-center gap-2">
          <Avatar src={`${import.meta.env.VITE_BASE_URL}/${record.profile || DEFAULT_PROFILE}`} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Singer Info",
      key: "singer_info",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          {record.singer && <Tag color="blue">Singer</Tag>}
          {record.singer_writer && <Tag color="green">Singer Writer</Tag>}
        </div>
      ),
    },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button onClick={() => showModal(record)} type="link">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Top Section */}
      <div className="bg-white p-6 rounded-2xl mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Top Artist List</h1>
          <p className="text-sm text-gray-600">Add, edit or delete artists</p>
        </div>
        <Button
          type="primary"
          onClick={() => showModal()}
          className="bg-[#E7F056] border-none text-gray-800"
        >
          Add New Artist
        </Button>
      </div>

      <Input
        placeholder="Search for Listing"
        prefix={<Search />}
        value={searchValue}
        onChange={handleSearchChange}
        className="mb-4 rounded-2xl"
      />

      <Table
        loading={isFetching || isLoading}
        dataSource={artistData?.data?.data}
        columns={columns}
        pagination={{
          current: page,
          pageSize: per_page,
          total: artistData?.data?.total,
          onChange: (p) => setPage(p),
        }}
        rowKey="id"
      />

      {/* Modal */}
      <Modal
        title={updateID ? "Edit Artist" : "Add Artist"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={650}
        maskClosable={false}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={formValue || {}}>
          <Form.Item label="Upload Image">
            <Upload.Dragger
              beforeUpload={handleBeforeUpload}
              showUploadList={true}
              fileList={fileList}
              maxCount={1}
              listType="picture"
            >
              <Button>Upload</Button>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item label="Artist Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter singer name" />
          </Form.Item>

          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <TextArea placeholder="Enter description" />
          </Form.Item>

          <Form.Item label="Location" name="location" rules={[{ required: true }]}>
            <Input placeholder="Enter location" />
          </Form.Item>

          <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
            <Radio.Group className="flex gap-3">
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Singer Info" name="singer_info">
            <Checkbox.Group
              options={[
                { label: "Singer", value: "singer" },
                { label: "Singer Writer", value: "singer_writer" },
              ]}
              onChange={(val) => setCheckedValues(val as string[])}
            />
          </Form.Item>

          <Form.Item>
            <div className="flex gap-4 mt-4">
              <Button onClick={handleCancel} className="w-full bg-gray-100 text-red-500 rounded-2xl p-3">
                Cancel
              </Button>
              <Button htmlType="submit" className="w-full bg-[#E7F056] text-black rounded-2xl p-3">
                Save Changes
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Top_Artist;

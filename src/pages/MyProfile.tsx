import React, { useState, useEffect } from "react";
import { Form, Input, Upload, Button } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { UserOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";

const MyProfile: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  const token = localStorage.getItem("admin_token"); // get token from localStorage

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://103.186.20.110:8002/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(res.data.data);
      setLoading(false);

      form.setFieldsValue({
        full_name: res.data.data.full_name,
        email: res.data.data.email,
        contact: res.data.data.contact,
        location: res.data.data.location,
      });

      if (res.data.data.avatar) {
        const avatarUrl = `${import.meta.env.VITE_BASE_URL}/${res.data.data.avatar}`;
        setFileList([
          {
            uid: "-1",
            name: "avatar.png",
            status: "done",
            url: avatarUrl,
          },
        ]);
      } else {
        setFileList([]);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to fetch profile", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onRemove = (file: UploadFile) => {
    setFileList([]);
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("avatar", fileList[0].originFileObj as Blob);
    }

    formData.append("full_name", values.full_name);
    formData.append("email", values.email);
    formData.append("contact", values.contact);
    formData.append("location", values.location);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/update-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: res.data.success ? "success" : "error",
        title: res.data.success ? "Success" : "Oops...",
        text: res.data.message,
      });

      if (res.data.success) {
        fetchProfile(); // Refresh profile after update
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl mb-6">
        <h1 className="text-[#121212] text-[20px] font-semibold">My Profile</h1>
        <p className="text-sm text-[#454545] pt-2">You can update your profile information.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="flex flex-col items-center mb-6">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onRemove={onRemove}
              name="avatar"
              showUploadList={{ showRemoveIcon: true }}
            >
              {fileList.length < 1 && <div>Upload</div>}
            </Upload>
            <h4 className="font-bold text-lg">Upload your photo</h4>
          </div>

          <Form.Item
            name="full_name"
            rules={[{ required: true, message: "Please enter your full name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Full Name" />
          </Form.Item>

          <Form.Item name="email">
            <Input disabled placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="contact"
            rules={[{ required: true, message: "Please enter your contact number!" }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Contact Number" />
          </Form.Item>

          <Form.Item
            name="location"
            rules={[{ required: true, message: "Please enter your location!" }]}
          >
            <Input prefix={<EnvironmentOutlined />} placeholder="Location" />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              block
              className="bg-[#e7f056] font-bold text-xl rounded-full py-6"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default MyProfile;

import React, { useState, useEffect } from "react";
import { Form, Input, Upload, Button } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { UserOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import { useUpdateProfileMutation, useUserProfileQuery } from "../redux/dashboardFeatures/updateProfile/updateProfileApiSlice";

const MyProfile: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const { data: userData, isLoading, refetch } = useUserProfileQuery({});
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();



  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        full_name: userData?.data.full_name,
        email: userData?.data.email,
        contact: userData?.data.contact,
        location: userData?.data.location,
      });

      if (userData?.data.avatar) {
        const avatarUrl = `${import.meta.env.VITE_BASE_URL}/${userData?.data?.avatar}`;
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
    }
  }, [userData]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onRemove = () => {
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
      const res: any = await updateProfile(formData).unwrap();

      Swal.fire({
        icon: res.success ? "success" : "error",
        title: res.success ? "Success" : "Oops...",
        text: res.message,
      });

      if (res.success) {
        refetch(); // refresh profile data
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.data?.message || "Something went wrong!",
      });
    }
  };

  if (isLoading) {
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
            <Input placeholder="Email" />
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

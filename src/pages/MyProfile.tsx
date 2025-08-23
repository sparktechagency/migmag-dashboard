import React, { useState, useEffect } from "react";
import { Form, Input, Upload, Button } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { UserOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";

const MyProfile = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState<any>(null);

  // Get token from localStorage
  const token = localStorage.getItem("admin_token");

  // Fetch User Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res?.data?.data)
        setUserData(res.data?.data);

        // set form default values
        form.setFieldsValue({
          full_name: res?.data?.data?.full_name,
          email: res?.data?.data?.email,
          contact: res?.data?.data?.contact,
          location: res?.data?.data?.location,
        });

        // set avatar
        if (res.data?.data?.avatar) {
          setFileList([
            {
              uid: "-1",
              name: "avatar.png",
              status: "done",
              url: `${import.meta.env.VITE_BASE_URL}/${res?.data?.data.avatar}`,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [form, token]);

  // Upload handler
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Submit handler
  const onFinish = async (values: any) => {
    const formData = new FormData();

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("avatar", fileList[0].originFileObj as Blob);
    }

    formData.append("full_name", values?.full_name);
    formData.append("email", values?.email);
    formData.append("contact", values?.contact);
    formData.append("location", values?.location);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: res.data.success ? "success" : "error",
        title: res.data.success ? "Success" : "Oops...",
        text: res.data?.message,
      });
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="p-6">
      {/* Heading */}
      <div className="bg-white p-6 rounded-2xl mb-6">
        <h1 className="text-[#121212] text-[20px] font-semibold">My Profile</h1>
        <p className="text-sm text-[#454545] pt-2">
          You can update your profile information.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-2xl">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Upload Image */}
          <div className="flex flex-col items-center mb-6">
            <Form.Item name="image">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                name="file"
                showUploadList={{ showRemoveIcon: true }}
              >
                {fileList.length < 1 && <div>Upload</div>}
              </Upload>
            </Form.Item>
            <h4 className="font-bold text-lg">Upload your photo</h4>
          </div>

          {/* Full Name */}
          <Form.Item
            name="full_name"
            rules={[{ required: true, message: "Please input your full name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Full Name" />
          </Form.Item>

          {/* Email */}
          <Form.Item name="email">
            <Input disabled placeholder="Email" />
          </Form.Item>

          {/* Contact */}
          <Form.Item
            name="contact"
            rules={[{ required: true, message: "Please input your contact number!" }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Contact Number" />
          </Form.Item>

          {/* Location */}
          <Form.Item
            name="location"
            rules={[{ required: true, message: "Please input your location!" }]}
          >
            <Input prefix={<EnvironmentOutlined />} placeholder="Location" />
          </Form.Item>

          {/* Submit Button */}
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

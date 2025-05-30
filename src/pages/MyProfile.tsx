import React, { useState } from "react";
import { Button, Checkbox, Flex, Form, Input, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Item from "antd/es/list/Item";
import { log } from "console";
import { useUpdateProfileMutation } from "../redux/dashboardFeatures/updateProfile/updateProfileApiSlice";
import Swal from "sweetalert2";

const MyProfile = () => {
  // upload img functionality
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const [updateProfile] = useUpdateProfileMutation();
  // input from functionality
  const onFinish = async (values: any) => {
    const formData = new FormData();
    if (fileList.length > 0) {
      formData.append("avatar", fileList[0].originFileObj as File);
    }
    formData.append("first_name", values?.First_name);
    formData.append("last_name", values?.Last_name);
    formData.append("contact", values?.Contact_number);
    formData.append("location", values?.Location);
    formData.forEach((item) => console.log(item));
    try {
      const res = await updateProfile(formData).unwrap();
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

  return (
    <div>
      {/* heading section */}
      <div className="bg-white p-6 rounded-2xl">
        <div className="">
          <h1 className="text-[#121212] text-[20px] font-semibold font-degular ">
            My Profile
          </h1>
          <p className="font-degular font-normal text-[##454545] text-sm pb-4 pt-2">
            You can update your profile information.
          </p>
        </div>
      </div>
      {/* from section */}
      <div className="bg-white p-6 rounded-2xl mt-6   ">
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {/* upload img */}
          <div className="flex flex-col w-full  justify-center items-center mb-14">
            <Form.Item name={"image"}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                name="file"
                className="rounded-md"
                showUploadList={true}
              >
                {fileList.length < 1 && (
                  <svg
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M36.3339 12.0667H40.0672M53.1339 34.4423L41.9339 23.2496L30.7339 34.4423L15.8005 15.7878L0.867188 34.4667M4.60052 0.866699H49.4005C51.4624 0.866699 53.1339 2.53817 53.1339 4.60003V49.4C53.1339 51.4619 51.4624 53.1334 49.4005 53.1334H4.60052C2.53866 53.1334 0.867188 51.4619 0.867188 49.4V4.60003C0.867188 2.53817 2.53866 0.866699 4.60052 0.866699Z"
                      stroke="#5D5D5D"
                    />
                  </svg>
                )}
              </Upload>
              {/* </ImgCrop> */}
            </Form.Item>
            <h4 className="font-degular   text-[24px] font-bold ">
              Upload your photo
            </h4>
          </div>
          <div className="flex justify-between gap-4">
            <Form.Item
              name="First_name"
              className="flex-1"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="First name" />
            </Form.Item>
            <Form.Item
              name="Last_name"
              className="flex-1"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                type="text"
                placeholder="Last name"
              />
            </Form.Item>
          </div>
          <Form.Item
            name="Contact_number"
            rules={[
              { required: true, message: "Please input your Contact number!" },
            ]}
          >
            <Input
              prefix={
                <svg
                  width="15"
                  height="19"
                  viewBox="0 0 15 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.17425 1.11565L4.19538 0.80852C4.75475 0.639841 5.3564 0.680446 5.88804 0.92276C6.41968 1.16507 6.845 1.59254 7.08463 2.1254L7.87388 3.88065C8.07991 4.33897 8.13728 4.8503 8.03795 5.34289C7.93861 5.83548 7.68756 6.28461 7.32 6.62727L6.01188 7.84614C5.97366 7.88175 5.94945 7.92986 5.94363 7.98177C5.90513 8.32915 6.1405 9.00552 6.68388 9.94615C7.07763 10.6295 7.4355 11.1099 7.73913 11.3785C7.95175 11.5666 8.06813 11.6069 8.118 11.5929L9.87675 11.0548C10.357 10.9079 10.8713 10.9149 11.3474 11.075C11.8234 11.235 12.2375 11.54 12.5315 11.9473L13.6515 13.5013C13.9925 13.9737 14.1504 14.5539 14.096 15.134C14.0416 15.7141 13.7786 16.2548 13.3558 16.6556L12.5796 17.3906C12.1682 17.7803 11.6628 18.0567 11.1128 18.1931C10.5628 18.3294 9.9868 18.3209 9.441 18.1685C7.03125 17.4956 4.87088 15.4621 2.93538 12.11C0.998125 8.75352 0.317376 5.86252 0.945626 3.43615C1.08665 2.89044 1.36588 2.39026 1.75638 1.98382C2.14688 1.57738 2.63462 1.27838 3.17425 1.11565ZM3.554 2.37302C3.23015 2.47041 2.93685 2.64958 2.70237 2.89326C2.46788 3.13694 2.30012 3.43692 2.21525 3.76427C1.6885 5.80477 2.29138 8.36764 4.07288 11.4538C5.85262 14.5355 7.768 16.3389 9.79538 16.905C10.1229 16.9964 10.4684 17.0013 10.7984 16.9194C11.1284 16.8376 11.4316 16.6716 11.6784 16.4378L12.4536 15.7028C12.646 15.5206 12.7656 15.2748 12.7904 15.011C12.8152 14.7473 12.7434 14.4835 12.5884 14.2686L11.4684 12.7155C11.3347 12.5302 11.1464 12.3914 10.9298 12.3186C10.7133 12.2458 10.4793 12.2426 10.2609 12.3095L8.49775 12.8494C7.474 13.1539 6.54563 12.3305 5.54813 10.6024C4.87438 9.43865 4.56113 8.5374 4.63988 7.83652C4.68013 7.47252 4.84988 7.13652 5.11675 6.88627L6.42488 5.66739C6.59187 5.51155 6.70589 5.30734 6.75093 5.08341C6.79597 4.85947 6.76976 4.62706 6.676 4.41877L5.88763 2.66352C5.77869 2.42131 5.58534 2.22701 5.34367 2.11688C5.102 2.00676 4.82851 1.98832 4.57425 2.06502L3.554 2.37302Z"
                    fill="#60606A"
                  />
                </svg>
              }
              type="number"
              placeholder="Contact number"
            />
          </Form.Item>
          <Form.Item
            name="Location"
            rules={[{ required: true, message: "Please input your Location!" }]}
          >
            <Input
              prefix={
                <svg
                  width="17"
                  height="21"
                  viewBox="0 0 17 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 2.6249C6.87555 2.6249 5.31763 3.27021 4.16897 4.41887C3.02031 5.56753 2.375 7.12545 2.375 8.7499C2.375 11.2541 3.93425 13.67 5.64575 15.5416C6.52087 16.4951 7.47575 17.3721 8.5 18.1631C8.65283 18.0459 8.83221 17.903 9.03813 17.7344C9.86045 17.0591 10.6344 16.327 11.3542 15.5434C13.0658 13.67 14.625 11.255 14.625 8.7499C14.625 7.12545 13.9797 5.56753 12.831 4.41887C11.6824 3.27021 10.1245 2.6249 8.5 2.6249ZM8.5 20.3121L8.00387 19.9709L8.00125 19.9691L7.996 19.9648L7.9785 19.9525L7.91288 19.9061L7.67663 19.7338C6.4795 18.8341 5.36739 17.8265 4.35425 16.7238C2.56575 14.7655 0.625 11.9314 0.625 8.74902C0.625 6.66044 1.45468 4.65741 2.93153 3.18056C4.40838 1.70371 6.41142 0.874023 8.5 0.874023C10.5886 0.874023 12.5916 1.70371 14.0685 3.18056C15.5453 4.65741 16.375 6.66044 16.375 8.74902C16.375 11.9314 14.4343 14.7664 12.6458 16.722C11.6329 17.8247 10.5211 18.8323 9.32425 19.732C9.22455 19.8065 9.12391 19.8797 9.02238 19.9516L9.004 19.9639L8.99875 19.9683L8.997 19.9691L8.5 20.3121ZM8.5 6.9999C8.03587 6.9999 7.59075 7.18427 7.26256 7.51246C6.93437 7.84065 6.75 8.28577 6.75 8.7499C6.75 9.21403 6.93437 9.65915 7.26256 9.98733C7.59075 10.3155 8.03587 10.4999 8.5 10.4999C8.96413 10.4999 9.40925 10.3155 9.73744 9.98733C10.0656 9.65915 10.25 9.21403 10.25 8.7499C10.25 8.28577 10.0656 7.84065 9.73744 7.51246C9.40925 7.18427 8.96413 6.9999 8.5 6.9999ZM5 8.7499C5 7.82164 5.36875 6.9314 6.02513 6.27502C6.6815 5.61865 7.57174 5.2499 8.5 5.2499C9.42826 5.2499 10.3185 5.61865 10.9749 6.27502C11.6313 6.9314 12 7.82164 12 8.7499C12 9.67816 11.6313 10.5684 10.9749 11.2248C10.3185 11.8811 9.42826 12.2499 8.5 12.2499C7.57174 12.2499 6.6815 11.8811 6.02513 11.2248C5.36875 10.5684 5 9.67816 5 8.7499Z"
                    fill="#60606A"
                  />
                </svg>
              }
              type="Location"
              placeholder="Location"
            />
          </Form.Item>
          <Form.Item>
            <Button
              block
              className="bg-[#e7f056] font-bold text-xl font-degular py-5 rounded-full border-none"
              htmlType="submit"
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

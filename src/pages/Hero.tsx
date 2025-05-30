import React, { useState, useRef, useMemo } from "react";
import { Button, Checkbox, Flex, Form, Input, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useGetPostQuery } from "../redux/features/baseApi";
import JoditEditor from "jodit-react";
import { useHeroPostApiMutation } from "../redux/dashboardFeatures/Hero/heroApiSlice";
import Swal from "sweetalert2";

const Hero = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "",
    },
  ]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const [heroPostApi] = useHeroPostApiMutation();
  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();

      const file = fileList[0]?.originFileObj;

      if (!file) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please upload a valid image file.",
        });
        return;
      }

      formData.append("thumbnail", file);
      formData.append("description", content);

      const res = await heroPostApi(formData).unwrap();

      console.log(res);

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
    } catch (errors: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors?.message || "Something went wrong",
      });
      console.error(errors);
    }
  };

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
      buttons: [
        "bold",
        "italic",
        "underline",
        "ul",
        "ol",
        "outdent",
        "indent",
        "file",
        "link",
        "hr",
        "align",
        "undo",
        "redo",
        "selectall",
        "print",
        "preview",
        "source",
      ],
      removeButtons: ["video", "image"],
    }),
    []
  );

  return (
    <div>
      {/* heading section */}
      <div className="bg-white p-6 rounded-2xl">
        <div className="">
          <h1 className="text-[#121212] text-[20px] font-semibold font-degular ">
            Hero sections
          </h1>
          <p className="font-degular font-normal text-[##454545] text-sm pb-4 pt-2">
            You can update your profile information.
          </p>
        </div>
      </div>
      {/* from section */}
      <div className=" p-6 rounded-2xl mt-6  bg-[#ffffff] ">
        {/* upload img */}
        <h4 className="font-degular text-base font-semibold mb-2 ">
          Header image
        </h4>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item name="file">
            <div className="flex flex-col justify-center items-center rounded-xl p-5 mb-14 border-2 border-dashed bg-[#f5f5f5]">
              <ImgCrop rotationSlider>
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  // onPreview={onPreview}
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
              </ImgCrop>
            </div>
          </Form.Item>

          <h4 className="font-degular text-base font-semibold mb-2 ">
            Subtitle
          </h4>
          <Form.Item name="subtitle">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {}}
            />
          </Form.Item>

          <Button
            block
            className="bg-[#e7f056] font-bold text-xl font-degular py-7 rounded-xl border-none"
            htmlType="submit"
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Hero;

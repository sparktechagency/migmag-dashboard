import React from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ArtistLibrary from "../assets/Images/dashboard/setNewPassImg.png";

interface SetNewPasswordFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const SetNewPassword: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: SetNewPasswordFormValues) => {
    console.log(values);
    navigate("/auth/login");
  };

  return (
    <div className="h-dvh grid grid-cols-2 border border-gray-700  ">
      {/* image  */}
      <div className="flex items-center p-3  justify-center ">
        <div
          className="h-full w-full overflow-hidden rounded-xl"
          style={{
            backgroundImage: `url(${ArtistLibrary})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left",
            backgroundSize: "cover",
          }}
        />

        {/* <img src={forGetImg} className="my-auto  h-[95vh] w-full object-contain rounded-lg" alt="" /> */}
      </div>
      {/* forget password */}
      <div className="  justify-center items-center  flex    ">
        <div className="h-[60vh] bg-white w-[536px]  shadow-[_0px_30px_30px_30px_rgba(249,_250,_229,_20)] p-16 rounded-2xl">
          <div className="text-center pb-16">
            <h1 className="font-semibold text-3xl font-degular text-[40px] mb-6">
              Verify Email
            </h1>
            <p className="font-degular font-normal text-[#3A3A3A]">
              You have to verify your email to get code.
            </p>
          </div>

          {/* Assuming `Input.OTP` is a custom component */}

          <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your New Password" },
              ]}
              className="text-[#121212] font-degular font-semibold text-base"
            >
              <Input.Password
                prefix={
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 15 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 14.875C7.96413 14.875 8.40925 14.6906 8.73744 14.3624C9.06563 14.0342 9.25 13.5891 9.25 13.125C9.25 12.6609 9.06563 12.2158 8.73744 11.8876C8.40925 11.5594 7.96413 11.375 7.5 11.375C7.03587 11.375 6.59075 11.5594 6.26256 11.8876C5.93437 12.2158 5.75 12.6609 5.75 13.125C5.75 13.5891 5.93437 14.0342 6.26256 14.3624C6.59075 14.6906 7.03587 14.875 7.5 14.875ZM12.75 7C13.2141 7 13.6592 7.18437 13.9874 7.51256C14.3156 7.84075 14.5 8.28587 14.5 8.75V17.5C14.5 17.9641 14.3156 18.4092 13.9874 18.7374C13.6592 19.0656 13.2141 19.25 12.75 19.25H2.25C1.78587 19.25 1.34075 19.0656 1.01256 18.7374C0.684374 18.4092 0.5 17.9641 0.5 17.5V8.75C0.5 8.28587 0.684374 7.84075 1.01256 7.51256C1.34075 7.18437 1.78587 7 2.25 7H3.125V5.25C3.125 4.08968 3.58594 2.97688 4.40641 2.15641C5.22688 1.33594 6.33968 0.875 7.5 0.875C8.07453 0.875 8.64344 0.988163 9.17424 1.20803C9.70504 1.42789 10.1873 1.75015 10.5936 2.15641C10.9998 2.56266 11.3221 3.04496 11.542 3.57576C11.7618 4.10656 11.875 4.67547 11.875 5.25V7H12.75ZM7.5 2.625C6.80381 2.625 6.13613 2.90156 5.64384 3.39384C5.15156 3.88613 4.875 4.55381 4.875 5.25V7H10.125V5.25C10.125 4.55381 9.84844 3.88613 9.35616 3.39384C8.86387 2.90156 8.19619 2.625 7.5 2.625Z"
                      fill="#3A3A3A"
                    />
                  </svg>
                }
                placeholder="Enter your email"
                style={{ height: "50px" }}
                className="text-[#121212] font-degular font-semibold text-base"
              />
            </Form.Item>
            <Form.Item
              label="Retype New Password"
              name="Retype New password"
              className="text-[#121212] font-degular font-semibold text-base"
              rules={[{ required: true, message: "Retype New Password" }]}
            >
              <Input.Password
                className="text-[#121212] font-degular font-semibold text-base"
                prefix={
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 15 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 14.875C7.96413 14.875 8.40925 14.6906 8.73744 14.3624C9.06563 14.0342 9.25 13.5891 9.25 13.125C9.25 12.6609 9.06563 12.2158 8.73744 11.8876C8.40925 11.5594 7.96413 11.375 7.5 11.375C7.03587 11.375 6.59075 11.5594 6.26256 11.8876C5.93437 12.2158 5.75 12.6609 5.75 13.125C5.75 13.5891 5.93437 14.0342 6.26256 14.3624C6.59075 14.6906 7.03587 14.875 7.5 14.875ZM12.75 7C13.2141 7 13.6592 7.18437 13.9874 7.51256C14.3156 7.84075 14.5 8.28587 14.5 8.75V17.5C14.5 17.9641 14.3156 18.4092 13.9874 18.7374C13.6592 19.0656 13.2141 19.25 12.75 19.25H2.25C1.78587 19.25 1.34075 19.0656 1.01256 18.7374C0.684374 18.4092 0.5 17.9641 0.5 17.5V8.75C0.5 8.28587 0.684374 7.84075 1.01256 7.51256C1.34075 7.18437 1.78587 7 2.25 7H3.125V5.25C3.125 4.08968 3.58594 2.97688 4.40641 2.15641C5.22688 1.33594 6.33968 0.875 7.5 0.875C8.07453 0.875 8.64344 0.988163 9.17424 1.20803C9.70504 1.42789 10.1873 1.75015 10.5936 2.15641C10.9998 2.56266 11.3221 3.04496 11.542 3.57576C11.7618 4.10656 11.875 4.67547 11.875 5.25V7H12.75ZM7.5 2.625C6.80381 2.625 6.13613 2.90156 5.64384 3.39384C5.15156 3.88613 4.875 4.55381 4.875 5.25V7H10.125V5.25C10.125 4.55381 9.84844 3.88613 9.35616 3.39384C8.86387 2.90156 8.19619 2.625 7.5 2.625Z"
                      fill="#3A3A3A"
                    />
                  </svg>
                }
                placeholder="Enter your password"
                style={{ height: "50px" }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="bg-[#E7F056] h-12 text-black rounded-3xl  font-degular font-bold  text-lg w-full mt-6"
                htmlType="submit"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;

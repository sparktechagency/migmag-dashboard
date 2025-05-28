import React, { useState } from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import VerifyEmailImg from "../assets/Images/dashboard/VerifyEmailImg.png";
import { useVerifyEmailMutation } from "../redux/dashboardFeatures/user/userApiSlices";
import Swal from "sweetalert2";

// Assuming `Input.OTP` is a custom input component
interface OTPInputProps {
  size?: "large" | "small" | "middle";
  className?: string;
  style?: React.CSSProperties;
  length: number;
  formatter?: (str: string) => string;
  onChange: (text: string) => void;
}

interface ForgetPasswordFormValues {
  email: string;
}

const Verify_Email: React.FC = () => {
  const [VerifyEmail] = useVerifyEmailMutation();
  const navigate = useNavigate();

  // Define the `onChange` handler with the correct type
  const onChange = (text: string) => {
  };

  // const handleVerify = () => {

  // };

  const handleVerifyBack = () => {
    navigate("/auth/login");
  };

  const onFinish = async (values: ForgetPasswordFormValues) => {
    try {
      const res = await VerifyEmail(values).unwrap();
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res?.message,
        });
        navigate(`/auth/forget-password?email=${res.data.email}`);
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

    // navigate("/auth/forget-password");
  };

  return (
    <div className="h-dvh grid grid-cols-2 border border-gray-700  ">
      {/* image  */}
      <div className="flex items-center p-3  justify-center ">
        <div
          className="h-full w-full overflow-hidden rounded-xl"
          style={{
            backgroundImage: `url(${VerifyEmailImg})`,
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
          <Form<ForgetPasswordFormValues> layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                placeholder="Enter your email"
                className="h-[50px] mt-3 mb-0"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="bg-[#E7F056] h-12 mb-5  text-xl w-full mt-5 font-bold rounded-2xl border-none font-degular text-[#121212]"
                // onClick={handleVerify}
                htmlType="submit"
              >
                Send
              </Button>
            </Form.Item>
            <Button
              className=" h-12 text-xl w-full font-bold rounded-2xl border-[#8D8D8D] font-degular text-[#121212]"
              onClick={handleVerifyBack}
            >
              Back
            </Button>
          </Form>

          <p className="text-center mt-10">
            You have not received the email?
            <Button className="pl-0" type="link">
              Resend
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify_Email;

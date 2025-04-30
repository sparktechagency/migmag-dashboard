import React from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import forGetImg from "../assets/Images/dashboard/forgetPAssword.png";

// Assuming `Input.OTP` is a custom input component
interface OTPInputProps {
  size?: "large" | "small" | "middle";
  className?: string;
  style?: React.CSSProperties;
  length: number;
  formatter?: (str: string) => string;
  onChange: (text: string) => void;
}

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();

  // Define the `onChange` handler with the correct type
  const onChange = (text: string) => {
    console.log("onChange:", text);
  };

  const handleVerify = () => {
    navigate("/auth/set-new-password");
  };

  return (
    <AuthWrapper className="container mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* image  */}
        <div>
          <img src={forGetImg} alt="" />
        </div>
        {/* forget password */}
        <div className=" flex items-center justify-center bg-[#FFFFFF] rounded-2xl shadow-[_0px_30px_30px_30px_rgba(249,_250,_229,_20)]">
          <div>
            <div className="text-center mb-12">
              <h1 className="font-bold text-3xl font-degular text-[40px] mb-6">
                Forget Password
              </h1>
              <p className="font-degular font-normal text-[#3A3A3A]">
                We have sent a 6 digits code in mark21**@gmail.com
              </p>
            </div>

            {/* Assuming `Input.OTP` is a custom component */}
            <Input.OTP
              size="large"
              className="otp-input"
              style={{ width: "100%", height: "50px" }}
              length={5}
              formatter={(str: string) => str.toUpperCase()}
              onChange={onChange}
            />

            <Button
              className="bg-[#4964C6] h-12 text-white text-lg w-full mt-14"
              onClick={handleVerify}
            >
              Verify Code
            </Button>

            <p className="text-center mt-10">
              You have not received the email?
              <Button className="pl-0" type="link">
                Resend
              </Button>
            </p>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default VerifyEmail;

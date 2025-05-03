import React from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import VerifyEmailImg from "../assets/Images/dashboard/VerifyEmailImg.png";

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
      <div className="flex justify-between items-center">
        {/* image  */}
        <div className="mt-6">
          <img
            className="w-[828px] h-[1069px] object-cover rounded-2xl "
            src={VerifyEmailImg}
            alt=""
          />
        </div>
        {/* forget password */}
        <div className=" flex bg-[#FFFFFF] p-16 rounded-2xl shadow-[_0px_30px_30px_30px_rgba(249,_250,_229,_20)]">
          <div>
            <div className="text-center mb-14 mt-6">
              <h1 className="font-semibold text-3xl font-degular text-[40px] mb-6">
                Forget Password
              </h1>
              <p className="font-degular font-normal text-[#3A3A3A]">
                We have sent a 6 digits code in mark21**@gmail.com
              </p>
            </div>

            {/* Assuming `Input.OTP` is a custom component */}
            <Input.OTP
              size="small"
              className="otp-input"
              style={{ width: "100%", height: "10px" }}
              length={5}
              formatter={(str: string) => str.toUpperCase()}
              onChange={onChange}
            />

            <Button
              className="bg-[#E7F056] h-12 mb-5  text-xl w-full mt-14 font-bold rounded-2xl border-none font-degular text-[#121212]"
              onClick={handleVerify}
            >
              Submit
            </Button>
            <Button
              className=" h-12 text-xl w-full font-bold rounded-2xl border-[#8D8D8D] font-degular text-[#121212]"
              onClick={handleVerify}
            >
              Back
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

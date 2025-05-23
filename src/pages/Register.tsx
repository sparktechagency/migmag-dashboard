import React from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ArtistLibrary from "../assets/Images/dashboard/registerpageIMg.jpg";

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: LoginFormValues) => {
    console.log(values);
    navigate("/");
  };

  return (
    <div className="grid grid-cols-1 min-h-screen container mx-auto  md:grid-cols-2 w-full  ">
      {/* login left side  */}
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
      </div>
      {/* login form */}
      <div className="flex justify-center items-center ">
        <AuthWrapper className="rounded-2xl shadow-[_0px_30px_30px_30px_rgba(249,_250,_229,_20)] bg-white">
          <div className="text-center mb-16">
            <div className="mb-6">
              <h1 className="text-4xl font-degular font-bold">Welcome back!</h1>
            </div>
            <p>
              Please sign in with valid information for access your account.
            </p>
          </div>
          <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
            <div className="flex justify-between gap-6">
              <Form.Item
                label="Fast name"
                name="fastName"
                rules={[
                  { required: true, message: "Please enter your fast name" },
                ]}
                className="text-[#121212] font-degular font-semibold text-base"
              >
                <Input
                  prefix={
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 7C6.5375 7 5.71354 6.65729 5.02813 5.97188C4.34271 5.28646 4 4.4625 4 3.5C4 2.5375 4.34271 1.71354 5.02813 1.02813C5.71354 0.342708 6.5375 0 7.5 0C8.4625 0 9.28646 0.342708 9.97188 1.02813C10.6573 1.71354 11 2.5375 11 3.5C11 4.4625 10.6573 5.28646 9.97188 5.97188C9.28646 6.65729 8.4625 7 7.5 7ZM0.5 14V11.55C0.5 11.0542 0.627604 10.5984 0.882812 10.1828C1.13802 9.76719 1.47708 9.45 1.9 9.23125C2.80417 8.77917 3.72292 8.4401 4.65625 8.21406C5.58958 7.98802 6.5375 7.875 7.5 7.875C8.4625 7.875 9.41042 7.98802 10.3438 8.21406C11.2771 8.4401 12.1958 8.77917 13.1 9.23125C13.5229 9.45 13.862 9.76719 14.1172 10.1828C14.3724 10.5984 14.5 11.0542 14.5 11.55V14H0.5Z"
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
                label="Last name"
                name="lastName"
                rules={[{ required: true, message: "Please enter your email" }]}
                className="text-[#121212] font-degular font-semibold text-base"
              >
                <Input
                  prefix={
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 7C6.5375 7 5.71354 6.65729 5.02813 5.97188C4.34271 5.28646 4 4.4625 4 3.5C4 2.5375 4.34271 1.71354 5.02813 1.02813C5.71354 0.342708 6.5375 0 7.5 0C8.4625 0 9.28646 0.342708 9.97188 1.02813C10.6573 1.71354 11 2.5375 11 3.5C11 4.4625 10.6573 5.28646 9.97188 5.97188C9.28646 6.65729 8.4625 7 7.5 7ZM0.5 14V11.55C0.5 11.0542 0.627604 10.5984 0.882812 10.1828C1.13802 9.76719 1.47708 9.45 1.9 9.23125C2.80417 8.77917 3.72292 8.4401 4.65625 8.21406C5.58958 7.98802 6.5375 7.875 7.5 7.875C8.4625 7.875 9.41042 7.98802 10.3438 8.21406C11.2771 8.4401 12.1958 8.77917 13.1 9.23125C13.5229 9.45 13.862 9.76719 14.1172 10.1828C14.3724 10.5984 14.5 11.0542 14.5 11.55V14H0.5Z"
                        fill="#3A3A3A"
                      />
                    </svg>
                  }
                  placeholder="Enter your email"
                  style={{ height: "50px" }}
                  className="text-[#121212] font-degular font-semibold text-base"
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
              className="text-[#121212] font-degular font-semibold text-base"
            >
              <Input
                prefix={
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 19 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 4L9.5 8.375L2.5 4V2.25L9.5 6.625L16.5 2.25M16.5 0.5H2.5C1.52875 0.5 0.75 1.27875 0.75 2.25V12.75C0.75 13.2141 0.934374 13.6592 1.26256 13.9874C1.59075 14.3156 2.03587 14.5 2.5 14.5H16.5C16.9641 14.5 17.4092 14.3156 17.7374 13.9874C18.0656 13.6592 18.25 13.2141 18.25 12.75V2.25C18.25 1.78587 18.0656 1.34075 17.7374 1.01256C17.4092 0.684374 16.9641 0.5 16.5 0.5Z"
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
              label="Password"
              name="password"
              className="text-[#121212] font-degular font-semibold text-base"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
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
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              className="text-[#121212] font-degular font-semibold text-base"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
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
              <div className="flex justify-between items-center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Link className="login-form-forgot" to="/auth/verify-email">
                  Forgot password
                </Link>
              </div>
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
          <p className="font-degular font-normal text-sm text-center">
            Have an account?{" "}
            <Link
              to={"/auth/login"}
              className="font-degular text-base font-bold"
            >
              Login
            </Link>
          </p>
        </AuthWrapper>
      </div>
    </div>
  );
};

export default Register;

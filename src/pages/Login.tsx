import React from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ArtistLibrary from "../assets/Images/dashboard/Artist Library@4x 1.png";
import { usePostLoginInfoMutation } from "../redux/dashboardFeatures/user/userApiSlices";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface LoginFormValues {
  email: string;
  password: string;
  // remember?: boolean;
}

const Login: React.FC = () => {
  const [postLoginInfo, { isLoading, isError, isSuccess }] =
    usePostLoginInfoMutation();

  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    const loginInfo = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await postLoginInfo(loginInfo).unwrap();
      const token = res?.data?.token;

      if (token) {
        // token save
        localStorage.setItem("admin_token", token);

        // Success alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res?.message || "Login successful",
        }).then(() => {
          // page redirect
          window.location.href = "/";
        });
      }
    } catch (error) {
      console.log("error is", error)
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: error?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 min-h-screen container mx-auto  md:grid-cols-2 w-full  ">
      {/* login left side  */}
      <div className=" h-[95vh] bg-[#e1e95d] pl-24 pt-16 mt-6 mb-5 rounded-2xl">
        {/* logo */}
        <div className="mb-10">
          <svg
            width="174"
            height="22"
            viewBox="0 0 174 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_7_2534)">
              <path
                d="M76.7531 9.06711H68.8931V21.7687H64.7485V9.06711H56.9004V5.57202H76.7531V9.06711Z"
                fill="black"
              />
              <path
                d="M88.876 22.003C81.771 22.003 78.7188 19.2972 78.7188 13.651V5.57202H82.8634V13.6481C82.8634 15.9148 83.4851 18.505 88.8642 18.505C94.2433 18.505 94.868 15.8911 94.868 13.6481V5.57202H99.0126V13.6481C99.0363 19.2705 95.9633 22.003 88.876 22.003Z"
                fill="black"
              />
              <path
                d="M122.054 5.57202V21.7687H116.4L105.387 9.62193V21.7687H101.242V5.57202H106.867L117.904 17.7366V5.57202H122.054Z"
                fill="black"
              />
              <path
                d="M128.522 8.88019V12.1676H141.45V15.179H128.522V18.4664H141.45V21.7746H124.365V5.57202H141.45V8.88019H128.522Z"
                fill="black"
              />
              <path
                d="M168.161 21.7687H164.017V10.6633L157.299 21.7687H154.297L147.58 10.6633V21.7687H143.436V5.57202H149.06L155.825 17.0008L162.59 5.57202H168.214L168.161 21.7687Z"
                fill="black"
              />
              <path
                d="M51.6005 5.03789V21.9496H37.5118V8.55373C37.5118 8.55373 32.8491 8.77923 32.8491 16.7781V22.003H18.7278V16.3301C18.4317 8.77922 14.0651 8.55373 14.0651 8.55373V21.9466H0V5.03492H14.0651C14.0651 5.03492 17.2239 5.03491 18.7278 9.12635V0H32.8343V9.16789C34.2997 5.03789 37.497 5.03789 37.497 5.03789H51.6005Z"
                fill="black"
              />
              <path
                d="M173.989 7.38475C173.987 7.74199 173.881 8.09087 173.682 8.38729C173.483 8.68371 173.201 8.91437 172.871 9.05013C172.541 9.18589 172.179 9.22067 171.829 9.15004C171.48 9.07941 171.159 8.90656 170.908 8.65333C170.656 8.4001 170.485 8.07786 170.417 7.72733C170.348 7.3768 170.384 7.0137 170.521 6.68393C170.659 6.35417 170.89 6.07254 171.187 5.87461C171.484 5.67669 171.832 5.57135 172.189 5.57194C172.427 5.56872 172.663 5.61348 172.883 5.70355C173.104 5.79363 173.304 5.92718 173.472 6.09628C173.64 6.26538 173.772 6.46658 173.861 6.68792C173.95 6.90926 173.993 7.14623 173.989 7.38475ZM170.732 7.38475C170.739 7.67315 170.83 7.95326 170.994 8.18996C171.159 8.42666 171.389 8.60942 171.657 8.71537C171.925 8.82132 172.218 8.84573 172.499 8.78554C172.781 8.72536 173.038 8.58326 173.24 8.37704C173.441 8.17082 173.577 7.90965 173.631 7.62627C173.685 7.34288 173.654 7.04987 173.542 6.78395C173.431 6.51803 173.243 6.29101 173.004 6.13136C172.764 5.97171 172.482 5.88651 172.195 5.88644C171.999 5.88391 171.805 5.92119 171.624 5.99601C171.444 6.07084 171.28 6.18163 171.143 6.32172C171.006 6.46181 170.9 6.62826 170.829 6.81099C170.758 6.99371 170.725 7.1889 170.732 7.38475ZM173.151 7.08805H172.662C172.662 7.03053 172.649 6.97375 172.626 6.92105C172.603 6.86835 172.57 6.82081 172.528 6.78125C172.487 6.74169 172.437 6.71092 172.384 6.69074C172.33 6.67056 172.273 6.66139 172.215 6.66378C171.89 6.66378 171.724 6.93971 171.724 7.36992C171.724 7.80013 171.916 8.08496 172.221 8.08496C172.334 8.08433 172.443 8.04027 172.524 7.96188C172.606 7.88349 172.654 7.77674 172.659 7.66364H173.145C173.115 7.89198 172.998 8.09991 172.819 8.24376C172.64 8.38761 172.412 8.45618 172.183 8.43506C172.047 8.4374 171.913 8.411 171.789 8.35761C171.664 8.30422 171.553 8.22504 171.461 8.12527C171.369 8.02551 171.299 7.90741 171.257 7.77876C171.214 7.65011 171.198 7.51382 171.212 7.37883C171.198 7.23981 171.215 7.09957 171.261 6.96755C171.306 6.83554 171.379 6.71482 171.475 6.61358C171.571 6.51234 171.688 6.43291 171.817 6.38066C171.946 6.32841 172.085 6.30456 172.224 6.31071C172.451 6.29791 172.674 6.37257 172.847 6.51934C173.021 6.66611 173.131 6.87387 173.157 7.09993L173.151 7.08805Z"
                fill="black"
              />
              <path
                d="M130.891 7.69629C130.889 8.05268 130.782 8.40057 130.583 8.69604C130.384 8.99152 130.103 9.22134 129.774 9.35651C129.445 9.49168 129.083 9.52614 128.734 9.45553C128.386 9.38492 128.066 9.21243 127.815 8.9598C127.564 8.70717 127.394 8.38573 127.325 8.03605C127.256 7.68637 127.292 7.32411 127.429 6.995C127.565 6.6659 127.796 6.3847 128.092 6.18688C128.388 5.98905 128.735 5.88347 129.091 5.88346C129.329 5.88024 129.565 5.925 129.786 6.01508C130.006 6.10515 130.206 6.2387 130.374 6.40781C130.542 6.57691 130.674 6.77812 130.763 6.99946C130.852 7.2208 130.895 7.45777 130.891 7.69629ZM127.634 7.69629C127.642 7.98382 127.734 8.26274 127.899 8.49815C128.064 8.73356 128.294 8.91501 128.562 9.01983C128.829 9.12465 129.121 9.14817 129.402 9.08745C129.682 9.02673 129.938 8.88448 130.139 8.67846C130.339 8.47244 130.474 8.21182 130.528 7.92919C130.581 7.64655 130.55 7.35444 130.438 7.08941C130.327 6.82437 130.14 6.59816 129.901 6.43908C129.662 6.28 129.381 6.19509 129.094 6.19499C128.898 6.19244 128.704 6.22982 128.523 6.30482C128.342 6.37982 128.178 6.4909 128.041 6.63131C127.905 6.77171 127.798 6.93853 127.727 7.1216C127.657 7.30468 127.624 7.5002 127.631 7.69629H127.634ZM130.053 7.39959H129.565C129.563 7.34219 129.551 7.28557 129.528 7.23306C129.505 7.18055 129.471 7.13319 129.43 7.09372C129.388 7.05424 129.339 7.02342 129.286 7.0031C129.232 6.98277 129.175 6.97332 129.118 6.9753C128.792 6.9753 128.626 7.2542 128.626 7.68144C128.626 8.10868 128.819 8.39649 129.124 8.39649C129.236 8.39585 129.343 8.3521 129.424 8.27427C129.505 8.19644 129.553 8.09045 129.559 7.97814H130.047C130.018 8.20647 129.901 8.41441 129.721 8.55825C129.542 8.7021 129.314 8.77067 129.085 8.74956C128.949 8.75194 128.815 8.72547 128.69 8.6719C128.566 8.61834 128.454 8.53889 128.362 8.43879C128.27 8.33869 128.201 8.22022 128.158 8.09121C128.115 7.96219 128.1 7.82557 128.114 7.69035C128.101 7.55157 128.118 7.41165 128.164 7.28C128.209 7.14835 128.283 7.02802 128.379 6.92711C128.475 6.8262 128.591 6.74705 128.72 6.69498C128.849 6.6429 128.988 6.6191 129.126 6.6252C129.351 6.61461 129.571 6.68951 129.742 6.83483C129.913 6.98015 130.023 7.18511 130.05 7.40848L130.053 7.39959Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_7_2534">
                <rect width="174" height="22" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h3 className="text-[40px] mb-2 font-degular font-bold ">
          Power up your platform and keep <br /> the music flowing.
        </h3>
        <p className="mb-12  font-degular font-normal">
          Monitor songs, manage purchases, and handle users with ease. Your
          complete toolkit to keep the music business running smoothly.
        </p>
        <div
          className="h-[56.5vh] w-[35vw] object-cover"
          style={{
            borderRadius: "0 0 15px 0",
            backgroundOrigin: ArtistLibrary,
            backgroundImage: `url(${ArtistLibrary})`,
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
            <Form.Item>
              <div className="flex justify-between items-center">
                <Form.Item valuePropName="checked" noStyle>
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

        </AuthWrapper>
      </div>
    </div>
  );
};

export default Login;

import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  PopconfirmProps,
  Radio,
  Select,
  Table,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { Search, Vault } from "lucide-react";
import React, { useState } from "react";
import { message, Popconfirm } from "antd";
import Swal from "sweetalert2";
import {
  useGenreGetQuery,
  useKeyGetQuery,
  useLicenseGetQuery,
  useTypeGetQuery,
} from "../redux/dashboardFeatures/catagory/catagoryApiSlice";
import { useArtistGetQuery } from "../redux/dashboardFeatures/Artist/artistApiSlice";
import {
  useCreateNewSongMutation,
  useGetManageSongQuery,
} from "../redux/dashboardFeatures/manage_song/songApiSlice";
import { render } from "react-dom";

const Manage_Song = () => {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [audio, setAudio] = useState();
  const [searchValue, setSearchValue] = useState();

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    message.error("Click on No");
  };

  const pageSize = 10;

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "",
    },
  ]);

  const [file, setFile] = useState();

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  //  modal option
  const { data: genres, isLoading: genresLoading } = useGenreGetQuery([]);
  const { data: keys, isLoading: keysLoading } = useKeyGetQuery([]);
  const { data: licens, isLoading: licensLoading } = useLicenseGetQuery([]);
  const { data: type, isLoading: typeLoading } = useTypeGetQuery([]);
  const [createNewSong] = useCreateNewSongMutation();
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(7);

  const dataSource = [
    {
      key: "1",
      name: "Samantha Rivers",
      artist: "Charlie",
      genre: "Slap house",
      charlie: "Slap house",
      bpm: "123",
      keys: "C Major",
      gender: "Male",
      license: "Non-exclusive",
      price: "€1,000",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      key: "2",
      name: "Marcus Thompson",
      artist: "Charlie",
      genre: "Slap house",
      charlie: "Slap house",
      bpm: "123",
      keys: "C Major",
      gender: "Male",
      license: "Non-exclusive",
      price: "€1,000",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      key: "3",
      name: "Elena Martinez",
      artist: "Charlie",
      genre: "Slap house",
      charlie: "Slap house",
      bpm: "123",
      keys: "C Major",
      gender: "Male",
      license: "Non-exclusive",
      price: "€1,000",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      key: "4",
      name: "Derek Johnson",
      artist: "Charlie",
      genre: "Slap house",
      charlie: "Slap house",
      bpm: "123",
      keys: "C Major",
      gender: "Male",
      license: "Non-exclusive",
      price: "€1,000",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    {
      key: "5",
      name: "Tina Chen",
      artist: "Charlie",
      genre: "Slap house",
      charlie: "Slap house",
      bpm: "123",
      keys: "C Major",
      gender: "Male",
      license: "Non-exclusive",
      price: "€1,000",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    {
      key: "6",
      name: "Oliver Brown",
      artist: "Charlie",
      genre: "Slap house",
      charlie: "Slap house",
      bpm: "123",
      keys: "C Major",
      gender: "Male",
      license: "Non-exclusive",
      price: "€1,000",
      avatar: "https://i.pravatar.cc/40?img=6",
    },
    {
      key: "7",
      name: "Ava Patel",
      artist: "Charlie",
      genre: "Slap house",
      charlie: "Slap house",
      bpm: "123",
      keys: "C Major",
      gender: "Male",
      license: "Non-exclusive",
      price: "€1,000",
      avatar: "https://i.pravatar.cc/40?img=7",
    },
    {
      key: "8",
      name: "Liam Smith",
      artist: "Charlie",
      genre: "Slap house",
      charlie: "Slap house",
      bpm: "123",
      keys: "C Major",
      gender: "Male",
      license: "Non-exclusive",
      price: "€1,000",
      avatar: "https://i.pravatar.cc/40?img=8",
    },
    {
      key: "9",
      name: "Zoe Kim",
      artist: "Charlie",
      genre: "Slap house",
      charlie: "Slap house",
      bpm: "123",
      keys: "C Major",
      gender: "Male",
      license: "Non-exclusive",
      price: "€1,000",
      avatar: "https://i.pravatar.cc/40?img=9",
    },
    {
      key: "10",
      name: "Shila",
      artist: "Charlie",
      genre: "Slap house",
      charlie: "Slap house",
      bpm: "123",
      keys: "C Major",
      gender: "Male",
      license: "Non-exclusive",
      price: "€1,000",
      avatar: "https://i.pravatar.cc/40?img=10",
    },
    {
      key: "11",
      name: "Lorry Kim",
      artist: "Charlie",
      genre: "Slap house",
      charlie: "Slap house",
      bpm: "123",
      keys: "C Major",
      gender: "Male",
      license: "Non-exclusive",
      price: "€1,000",
      avatar: "https://i.pravatar.cc/40?img=11",
    },
  ];

  const columns = [
    {
      title: "Users",
      dataIndex: "artist",
      key: "name",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar src={`http://137.59.180.219:8008/${record.profile}`} />
          <h2 className="font-degular text-sm font-normal">
            {record?.artist?.name}
          </h2>
        </div>
      ),
    },

    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
      render: (_, record) => (
        <h2 className="font-degular text-sm font-normal">
          {record?.artist?.name}
        </h2>
      ),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      render: (_, record) => (
        <h2 className="font-degular text-sm font-normal">
          {record?.genre?.name}
        </h2>
      ),
    },
    {
      title: "BPM",
      dataIndex: "bpm",
      key: "bpm",
    },
    {
      title: "keys",
      dataIndex: "key",
      key: "keys",
      render: (_, record) => (
        <h2 className="font-degular text-sm font-normal">
          {record?.key?.name}
        </h2>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "License",
      dataIndex: "license",
      key: "license",
      render: (_, record) => (
        <h2 className="font-degular text-sm font-normal">
          {record?.license?.name}
        </h2>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex gap-2">
          <svg
            onClick={showModal}
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 22V18H20V22H0ZM4 14H5.4L13.2 6.225L11.775 4.8L4 12.6V14ZM2 16V11.75L13.2 0.575C13.3833 0.391667 13.5958 0.25 13.8375 0.15C14.0792 0.05 14.3333 0 14.6 0C14.8667 0 15.125 0.05 15.375 0.15C15.625 0.25 15.85 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15833 18 3.425C18 3.675 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L6.25 16H2Z"
              fill="#49ADF4"
            />
          </svg>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                fill="#E53E3E"
              />
            </svg>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  // edit modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    console.log("====================================");
    setSearchValue(e.target.value);
    console.log("====================================");
  };

  const onFinish = async (values: any) => {
    if (!file || !audio) {
      message.error("Please upload both audio and thumbnail files");
      return;
    }
    console.log("gender", values);

    const formData = new FormData();
    formData.append("song", values?.song?.file.originFileObj);
    formData.append("song_poster", values?.image?.file.originFileObj);
    formData.append("artist_id", values.artistName);
    formData.append("genre_id", values.genre);
    formData.append("key_id", values.key);
    formData.append("license_id", values.License);
    formData.append("type_id", values.type);
    formData.append("bpm", values.BPM);
    formData.append("gender", values.gender);
    formData.append("is_published", values.publishStatus);

    try {
      const res = await createNewSong(formData).unwrap();

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
        console.log(res?.message);
      }
    } catch (errors) {
      console.log(errors);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors?.message,
      });
    }
  };
  const { data: artistData, isLoading: artistDataLoading } = useArtistGetQuery(
    {}
  );
  const {
    data: songData,
    isLoading,
    isFetching,
  } = useGetManageSongQuery({
    params: {
      search: searchValue,
      page: page,
      per_page: per_page,
    },
  });

  console.log("==============songData======================");
  console.log(songData);
  console.log("==============songData======================");
  const handleBeforeUpload = (file: File) => {
    setFile(file);
    return;
  };
  const hendelAudioFile = (audioFile) => {
    setAudio(audioFile);
    const isAudio = audioFile.type.startsWith("audio/");
    if (!isAudio) {
      message.error("You can only upload audio files!");
    }
    return isAudio || Upload.LIST_IGNORE; // prevents upload if not audio
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-2xl">
        <div className="flex justify-between">
          <div className="">
            <h1 className="text-[#121212] text-[20px] font-semibold font-degular ">
              Manage Song
            </h1>
            <p className="font-degular font-normal text-sm pb-4 pt-2">
              For adding a new song or edit existing song.
            </p>
          </div>
          <Button
            type="default"
            className="bg-[#E7F056] p-4 border-none text-base text-[#3A3A3A] font-degular font-semibold"
            shape="round"
            onClick={showModal}
          >
            Add new song
          </Button>
        </div>
        <Input
          prefix={<Search />}
          className="w-full rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
          placeholder="Search for Listing"
          onChange={handleSearchChange}
          style={{
            backgroundColor: "#f0f0f0",
            color: "#333333",
          }}
        />
      </div>
      <div className="py-8">
        <Table
          loading={isFetching || isLoading}
          // dataSource={dataSource}
          dataSource={songData?.data?.data}
          columns={columns}
          pagination={{
            pageSize: per_page,
            total: songData?.data?.total,
            current: page,
            onChange: (page) => setPage(page),
          }}
          rowClassName={() => "hover:bg-transparent"}
        />
        {/* edit modal */}
        <Modal
          title="Basic Modal"
          className="!w-[650px] !top-10 !max-h-[90vh] overflow-y-scroll rounded-lg "
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            form={form}
            onFinish={onFinish}
            style={{ paddingBottom: "" }}
            layout="vertical"
          >
            <Form.Item
              name="song"
              rules={[{ required: true, message: "Upload a audio file!" }]}
              className="bg-[#f5f5f5] border-dashed text-center py-4 "
            >
              <Upload
                maxCount={1}
                accept="audio/*"
                showUploadList={true}
                beforeUpload={(audioFile) => hendelAudioFile(audioFile)}
              >
                <Button className="flex items-center gap-2">
                  <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.5 6.99976V8.99976H2.5V17.9998H16.5V8.99976H13.5V6.99976H16.5C17.0304 6.99976 17.5391 7.21047 17.9142 7.58555C18.2893 7.96062 18.5 8.46933 18.5 8.99976V17.9998C18.5 18.5302 18.2893 19.0389 17.9142 19.414C17.5391 19.789 17.0304 19.9998 16.5 19.9998H2.5C1.96957 19.9998 1.46086 19.789 1.08579 19.414C0.710714 19.0389 0.5 18.5302 0.5 17.9998V8.99976C0.5 8.46933 0.710714 7.96062 1.08579 7.58555C1.46086 7.21047 1.96957 6.99976 2.5 6.99976H5.5ZM10.384 0.468761L13.743 3.82676C13.9306 4.0144 14.0361 4.2689 14.0361 4.53426C14.0361 4.79962 13.9306 5.05412 13.743 5.24176C13.5554 5.4294 13.3009 5.53482 13.0355 5.53482C12.7701 5.53482 12.5156 5.4294 12.328 5.24176L10.5 3.41276V12.9998C10.5 13.265 10.3946 13.5193 10.2071 13.7069C10.0196 13.8944 9.76522 13.9998 9.5 13.9998C9.23478 13.9998 8.98043 13.8944 8.79289 13.7069C8.60536 13.5193 8.5 13.265 8.5 12.9998V3.41276L6.672 5.24176C6.57909 5.33467 6.46879 5.40837 6.3474 5.45865C6.226 5.50894 6.0959 5.53482 5.9645 5.53482C5.83311 5.53482 5.703 5.50894 5.5816 5.45865C5.46021 5.40837 5.34991 5.33467 5.257 5.24176C5.16409 5.14885 5.09039 5.03855 5.04011 4.91716C4.98982 4.79576 4.96394 4.66566 4.96394 4.53426C4.96394 4.40287 4.98982 4.27276 5.04011 4.15136C5.09039 4.02997 5.16409 3.91967 5.257 3.82676L8.617 0.468761C8.85139 0.234575 9.16917 0.103027 9.5005 0.103027C9.83183 0.103027 10.1496 0.234575 10.384 0.468761Z"
                      fill="black"
                    />
                  </svg>
                  Upload Audio
                </Button>
              </Upload>
            </Form.Item>
            <div className="w-full">
              <h2 className="font-degular text-base font-semibold">
                Thumbnail
              </h2>
              <div className="flex flex-col items-center gap-2 w-full">
                <p className="text-gray-600 text-sm text-center">
                  Upload an image thumbnail for your music (1 file only)
                </p>

                <div className="bg-[#f5f5f5] border border-dashed border-gray-300 rounded-lg w-full py-6 flex justify-center">
                  <Form.Item
                    name={"image"}
                    rules={[{ required: true, message: "Upload a Thumbnail!" }]}
                    className="bg-[#f5f5f5] border-dashed rounded-lg text-center py-4 my-4 flex items-center w-full justify-center  "
                  >
                    <Upload.Dragger
                      name="file"
                      beforeUpload={handleBeforeUpload}
                      className="rounded-md"
                      showUploadList={true}
                    >
                      <Button className="flex">
                        <svg
                          width="19"
                          height="20"
                          viewBox="0 0 19 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.5 6.99976V8.99976H2.5V17.9998H16.5V8.99976H13.5V6.99976H16.5C17.0304 6.99976 17.5391 7.21047 17.9142 7.58555C18.2893 7.96062 18.5 8.46933 18.5 8.99976V17.9998C18.5 18.5302 18.2893 19.0389 17.9142 19.414C17.5391 19.789 17.0304 19.9998 16.5 19.9998H2.5C1.96957 19.9998 1.46086 19.789 1.08579 19.414C0.710714 19.0389 0.5 18.5302 0.5 17.9998V8.99976C0.5 8.46933 0.710714 7.96062 1.08579 7.58555C1.46086 7.21047 1.96957 6.99976 2.5 6.99976H5.5ZM10.384 0.468761L13.743 3.82676C13.9306 4.0144 14.0361 4.2689 14.0361 4.53426C14.0361 4.79962 13.9306 5.05412 13.743 5.24176C13.5554 5.4294 13.3009 5.53482 13.0355 5.53482C12.7701 5.53482 12.5156 5.4294 12.328 5.24176L10.5 3.41276V12.9998C10.5 13.265 10.3946 13.5193 10.2071 13.7069C10.0196 13.8944 9.76522 13.9998 9.5 13.9998C9.23478 13.9998 8.98043 13.8944 8.79289 13.7069C8.60536 13.5193 8.5 13.265 8.5 12.9998V3.41276L6.672 5.24176C6.57909 5.33467 6.46879 5.40837 6.3474 5.45865C6.226 5.50894 6.0959 5.53482 5.9645 5.53482C5.83311 5.53482 5.703 5.50894 5.5816 5.45865C5.46021 5.40837 5.34991 5.33467 5.257 5.24176C5.16409 5.14885 5.09039 5.03855 5.04011 4.91716C4.98982 4.79576 4.96394 4.66566 4.96394 4.53426C4.96394 4.40287 4.98982 4.27276 5.04011 4.15136C5.09039 4.02997 5.16409 3.91967 5.257 3.82676L8.617 0.468761C8.85139 0.234575 9.16917 0.103027 9.5005 0.103027C9.83183 0.103027 10.1496 0.234575 10.384 0.468761Z"
                            fill="black"
                          />
                        </svg>
                        Upload
                      </Button>
                    </Upload.Dragger>
                  </Form.Item>
                </div>
              </div>
            </div>
            <Form.Item
              label="Artist name"
              name="artistName"
              rules={[
                { required: true, message: "Please select an artist name!" },
              ]}
            >
              <Select
                loading={artistDataLoading}
                className="bg-[#f5f5f5] h-12 rounded-lg"
                defaultValue={artistData?.data?.data[0]?.name}
                placement={"bottomLeft"}
                options={artistData?.data?.data?.map((im) => {
                  return {
                    label: im?.name,
                    value: im?.id,
                  };
                })}
              />
            </Form.Item>
            <div className="flex gap-3">
              {/* Genre */}
              <Form.Item
                className="flex-1"
                label="Genre"
                name="genre"
                rules={[{ required: true, message: "Please select an Genre!" }]}
              >
                <Select
                  loading={genresLoading}
                  className="bg-[#f5f5f5] h-12 rounded-lg"
                  defaultValue={genres?.data?.[0]?.name}
                  style={{ width: "100%" }}
                  popupMatchSelectWidth={false}
                  placement={"bottomLeft"}
                  options={genres?.data?.map((im) => {
                    return {
                      label: im?.name,
                      value: im.id,
                    };
                  })}
                />
              </Form.Item>

              {/* BPM*/}
              <Form.Item
                className="flex-1"
                label="BPM"
                name="BPM"
                rules={[{ required: true, message: "Please input a BPM!" }]}
              >
                <Input
                  max={1000}
                  maxLength={4}
                  min={30}
                  defaultValue={30}
                  type="number"
                  placeholder="Enter BPM "
                  required
                ></Input>
              </Form.Item>
            </div>
            {/* Key */}
            <div className="flex gap-3">
              <Form.Item
                className="flex-1"
                label="Key"
                name="key"
                rules={[{ required: true, message: "Please select a Key!" }]}
              >
                <Select
                  loading={keysLoading}
                  className="bg-[#f5f5f5] h-12 rounded-lg"
                  defaultValue={keys?.data?.[0]?.name}
                  style={{ width: "100%" }}
                  popupMatchSelectWidth={false}
                  placement={"bottomLeft"}
                  options={keys?.data?.map((im) => {
                    return {
                      label: im?.name,
                      value: im.id,
                    };
                  })}
                />
              </Form.Item>

              <Form.Item
                className="flex-1"
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select a Type!" }]}
              >
                <Select
                  loading={licensLoading}
                  className="bg-[#f5f5f5] h-12 rounded-lg"
                  defaultValue={type?.data?.[0]?.name}
                  style={{ width: "100%" }}
                  popupMatchSelectWidth={false}
                  placement={"bottomLeft"}
                  options={type?.data?.map((im) => {
                    return {
                      label: im?.name,
                      value: im.id,
                    };
                  })}
                />
              </Form.Item>
            </div>
            {/* Key */}
            <div className="flex gap-3">
              {/*Price */}
              <Form.Item
                className="flex-1"
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please select a Price!" }]}
              >
                <Input placeholder="Enter price of the song" required></Input>
              </Form.Item>

              <Form.Item
                className="flex-1"
                label="License"
                name="License"
                rules={[
                  { required: true, message: "Please select a License!" },
                ]}
              >
                <Select
                  loading={typeLoading}
                  className="bg-[#f5f5f5] h-12 rounded-lg"
                  defaultValue={licens?.data?.[0]?.name}
                  style={{ width: "100%" }}
                  popupMatchSelectWidth={false}
                  placement={"bottomLeft"}
                  options={licens?.data?.map((im) => {
                    return {
                      label: im?.name,
                      value: im.id,
                    };
                  })}
                />
              </Form.Item>
            </div>
            <div className="flex gap-3">
              {/* Genre */}
              <Form.Item
                className="flex-1"
                label="publish status"
                name="publishStatus"
                rules={[
                  {
                    required: true,
                    message: "Please select an publish status!",
                  },
                ]}
              >
                <Select
                  loading={genresLoading}
                  className="bg-[#f5f5f5] h-12 rounded-lg"
                  defaultValue="publish"
                  style={{ width: "100%" }}
                  popupMatchSelectWidth={false}
                  placement={"bottomLeft"}
                  options={[
                    { label: "Publish", value: "1" },
                    { label: "Unpublish", value: "0" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                className="flex-1"
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please select a gender!" }]}
                // layout="vertical"
              >
                <Radio.Group className="flex  gap-3 mt-3 ">
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              </Form.Item>
              {/*Gender */}
            </div>

            {/* button  */}
            <Form.Item>
              <div className="flex gap-4  w-full mt-8">
                <Button
                  onClick={handleCancel}
                  className="flex-1  bg-[#fff5f4] text-[#FF3B30] border-none rounded-2xl p-5 font-bold font-degular text-xl"
                >
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  className="w-full flex-1 bg-[#E7F056] border-none rounded-2xl p-5 font-bold font-degular text-xl"
                >
                  Save changes
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Manage_Song;

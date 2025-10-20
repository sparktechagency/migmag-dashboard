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
  Tag,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { Eye, Search, Vault } from "lucide-react";
import React, { useState } from "react";
import { message, Popconfirm } from "antd";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import {
  useGenreGetQuery,
  useKeyGetQuery,
  useLicenseGetQuery,
  useTypeGetQuery,
} from "../redux/dashboardFeatures/catagory/catagoryApiSlice";
import {
  useArtistGetQuery,
} from "../redux/dashboardFeatures/Artist/artistApiSlice";
import {
  useCreateNewSongMutation,
  useGetManageSongQuery,
  useManageSongDeleteMutation,
  useManageSongPubliseMutation,
  useSelectTopSongMutation,
} from "../redux/dashboardFeatures/manage_song/songApiSlice";
import AddSong from "./AddSong";
import SongUpdateFrom from "./SongUpdateFrom";
import MusickPlayer from "./musick-player/MusickPlayer";
import { topSongAlert } from "../utils/topSongAlert";

const Manage_Song = () => {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPublish, setIsModalOpenPublish] = useState(false);
  const [audio, setAudio] = useState();
  const [searchValue, setSearchValue] = useState();
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(7);
  const [updatID, setUpdatID] = useState();
  const [updatData, setUpdatData] = useState();
  const [formOne] = useForm();
  const [publishID, setPublishID] = useState();
  const [updatedStatus, setUpdatedStatus] = useState({});
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


  const [createNewSong] = useCreateNewSongMutation();
  const [manageSongDelete] = useManageSongDeleteMutation();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await manageSongDelete(id);
          if (res?.data?.success) {
            Swal.fire("Deleted!", res.data.message, "success");
          } else {
            Swal.fire(
              "Error!",
              res?.data?.message || "Failed to delete",
              "error"
            );
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong", "error");
          console.error(error);
        }
      }
    });
  };

  const handlePublish = async (id, currentStatus) => {
    console.log(`new status is`, currentStatus)
    const newStatus = currentStatus === "1" ? "0" : "1";

    try {
      const res = await manageSongPublise({
        id,
        is_published: newStatus,
      }).unwrap();

      if (res?.success) {
        message.success(res.message);

        setUpdatedStatus((prev) => ({ ...prev, [id]: newStatus }));
        refetch();
      } else {
        message.error(res.message || "Failed to update song");
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong.");
    }
  };

  const [selectTopSong] = useSelectTopSongMutation()


  const handleTopSong = async (id: number) => {
    try {
      const res = await topSongAlert();
      if (res.isConfirmed) {
        const res = await selectTopSong(id).unwrap();
        if (res) {
          message.success(res?.message);
        }
      }
    } catch (error) {
      message.error("Something went wrong.");
    }
  }

  const columns = [
    {
      title: "Users",
      dataIndex: "artist",
      key: "name",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar
            src={`${import.meta.env.VITE_BASE_URL}/${record.artist.profile}`}
          />
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
      title: "Is Publish",
      dataIndex: "Action",
      key: "is_published",
      // align: "center",
      render: (_, record) => {
        const currentStatus = updatedStatus[record.id] ?? record.is_published;
        return (
          <div className="flex items-center gap-2">
            <div
              className="cursor-pointer bg-white hover:bg-gray-300 p-1 rounded-full"
              onClick={() => handlePublish(record.id, currentStatus)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="20"
                height="20"
                x="0"
                y="0"
                viewBox="0 0 32 32"
                xml:space="preserve"
                className="self-center"
              >
                <g>
                  <g data-name="Layer 51">
                    <path
                      d="M29 7h-6v6h2V9.68c.168.239.333.48.479.73A11.007 11.007 0 0 1 10.41 25.479L9.391 27.2A13.007 13.007 0 0 0 27.2 9.4c-.079-.136-.174-.262-.259-.395H29ZM7 22.32c-.168-.239-.333-.48-.479-.73A11.007 11.007 0 0 1 21.59 6.521L22.609 4.8A13.007 13.007 0 0 0 4.8 22.605c.079.136.174.262.259.395H3v2h6v-6H7Z"
                      fill="blue"
                      opacity="1"
                      data-original="blue"
                      className=""
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            {record.is_published === 1 ? (
              <Tag color="success">Publish</Tag>
            ) : (
              <Tag color="warning">
                {" "}
                <div className="flex items-center gap-2">Unpublish</div>
              </Tag>
            )}
          </div>
        );
      },
    },

    {
      title: "Top Song",
      dataIndex: "top_song",
      key: "top_song",
      render: (_, record) => (
        <button
          onClick={() => handleTopSong(record.id)}
          className={`px-3 py-1 rounded text-black ${record.top_song ? "" : ""
            }`}
        >
          {record.is_topsong ? "Remove Top Song" : "Make Top Song"}
        </button>
      ),
    },


    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <span className=" cursor-pointer " ><svg
            onClick={() => openSongUpdateFrom(record?.id)}
            width="20"
            height="20"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 22V18H20V22H0ZM4 14H5.4L13.2 6.225L11.775 4.8L4 12.6V14ZM2 16V11.75L13.2 0.575C13.3833 0.391667 13.5958 0.25 13.8375 0.15C14.0792 0.05 14.3333 0 14.6 0C14.8667 0 15.125 0.05 15.375 0.15C15.625 0.25 15.85 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15833 18 3.425C18 3.675 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L6.25 16H2Z"
              fill="#49ADF4"
            />
          </svg></span>

          <span className=" cursor-pointer " >
            <Eye onClick={() => openMusickModal(record?.id)} />
          </span>

          <span className=" cursor-pointer " >
            <svg
              onClick={() => handleDelete(record?.id)}
              width="20"
              height="20"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                fill="#E53E3E"
              />
            </svg>
          </span>

        </div>
      ),
    },
  ];








  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const {
    data: songData,
    isLoading,
    isFetching,
    refetch,
  } = useGetManageSongQuery({
    params: {
      search: searchValue,
      page: page,
      per_page: per_page,
    },
  });
  const [manageSongPublise] = useManageSongPubliseMutation();




  const [openSongModal, setOpenSongModal] = useState(false);

  const openSongUploadmModal = () => {
    setOpenSongModal(true)
    form.resetFields();
  };

  const closeModal = () => {
    setOpenSongModal(false)
  }

  console.log(`updatID is ${updatID} `)



  const [songUpdateFrom, setSongUpdateFrom] = useState(false);
  const [songUpdateId, setSongUpdateId] = useState()

  const openSongUpdateFrom = (id) => {
    setSongUpdateId(id)
    setSongUpdateFrom(true);
  }

  console.log("song update id is", songUpdateId)
  const songCloseModal = () => {
    setSongUpdateFrom(false)
  }


  // musick player 

  const [openMusickPlayer, setOpenMusickPlayer] = useState(false);
  const [playerId, setPlayerId] = useState();

  const openMusickModal = (id) => {
    setPlayerId(id)
    setOpenMusickPlayer(true)
  };

  const closeMusickPlayer = () => {
    setOpenMusickPlayer(false)
    setPlayerId(undefined)
  }


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
            onClick={openSongUploadmModal}
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
          dataSource={songData?.data?.data}
          columns={columns}
          pagination={{
            current: page,
            pageSize: per_page,
            total: songData?.data?.total,
            onChange: (page) => setPage(page),
          }}
          rowClassName={() => "hover:bg-transparent"}
        />
        {/* edit modal */}
        <Modal
          title="Basic Modal"
          className="!w-[650px] !top-10 !max-h-[90vh] overflow-y-scroll rounded-lg "
          open={songUpdateFrom}
          onOk={songCloseModal}
          onCancel={songCloseModal}
          footer={false}
        >
          <SongUpdateFrom setOpenSongModal={setSongUpdateFrom} songUpdateId={songUpdateId}  ></SongUpdateFrom>

        </Modal>
        {/* song add modal  */}
        <Modal
          title="Basic Modal"
          className="!w-[650px] !top-10 !max-h-[90vh] overflow-y-scroll rounded-lg "
          open={openSongModal}
          onOk={closeModal}
          onCancel={closeModal}
          footer={false}
        >
          <AddSong setOpenSongModal={setOpenSongModal} ></AddSong>

        </Modal>

        {/* musick details and player  */}

        {playerId && openMusickPlayer && (
          <MusickPlayer
            playerId={playerId}
            isOpen={openMusickPlayer}
            onClose={closeMusickPlayer}
          />
        )}


      </div>

    </div>
  );
};

export default Manage_Song;

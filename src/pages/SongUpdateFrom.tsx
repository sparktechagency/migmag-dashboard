import React, { useState, useEffect } from 'react';
import { Form, Button, Upload, message, Radio, Select, Input } from 'antd';
import { useArtistGetQuery } from '../redux/dashboardFeatures/Artist/artistApiSlice';
import { useGenreGetQuery, useKeyGetQuery, useLicenseGetQuery, useTypeGetQuery } from '../redux/dashboardFeatures/catagory/catagoryApiSlice';
import { useCreateNewSongMutation, useUpdateSongMutation, useSongDetailsQuery } from '../redux/dashboardFeatures/manage_song/songApiSlice';
import { imgUrl } from './../utils/imgUrl';
import axios from 'axios';
import { UploadCloud } from 'lucide-react';
import Dragger from 'antd/es/upload/Dragger';

const SongUpdateForm = ({ setOpenSongModal, songUpdateId }) => {
    console.log(`song update id is ${songUpdateId}`);
    const [form] = Form.useForm();
    const [imagePreview, setImagePreview] = useState([]);
    const [mp3FileList, setMp3FileList] = useState([]);

    const { data: artistData } = useArtistGetQuery({});
    const { data: genres } = useGenreGetQuery([]);
    const { data: keys } = useKeyGetQuery([]);
    const { data: type } = useTypeGetQuery([]);
    const { data: licens } = useLicenseGetQuery([]);
    const [createNewSong, { isLoading }] = useCreateNewSongMutation();
    const [updateSong, { isLoading: isUpdating }] = useUpdateSongMutation();

    // Fetch song details using the songUpdateId
    const { data: singleSong, isLoading: songLoading, error } = useSongDetailsQuery(songUpdateId);
    const songDetails = singleSong?.data;


    const handleImageChange = (info) => {
        const latestFile = info.fileList[0]?.originFileObj;
        if (!latestFile) return;

        if (!latestFile.type.startsWith("image/")) {
            message.error("You can only upload image files!");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result as string); // Set uploaded image as preview
        };
        reader.readAsDataURL(latestFile);
    };

    // const songData = `${import.meta.env.VITE_BASE_URL}/${songDetails?.song}`
    // console.log('song data-----> ', songData)



    useEffect(() => {

        if (songDetails) {

            const song_poster = {
                uid: '-1',
                name: 'guest_profile.jpg',
                status: 'done',
                url: `${import.meta.env.VITE_BASE_URL}/${songDetails?.song_poster}`,
            };
            const audioFile = {
                uid: '-1',
                name: 'podcast.mp3',
                status: 'done',
                url: `${import.meta.env.VITE_BASE_URL}/${songDetails?.song}`,
            };
            form.setFieldsValue({
                title: songDetails?.title,
                name: songDetails?.artist_id,
                genre: songDetails?.genre_id,
                key: songDetails?.key_id,
                License: songDetails?.license_id,
                type: songDetails?.type_id,
                BPM: songDetails?.bpm,
                price: songDetails?.price,
                publishStatus: songDetails?.is_published.toString(),
                gender: songDetails?.gender,
                mp3File: [audioFile],
                song_poster: [song_poster],
            });

            // Set image preview if song_poster exists
            setImagePreview([song_poster]);
            setMp3FileList([audioFile])

            // if (songDetails?.song_poster) {
            //     setImagePreview(songDetails?.song_poster);
            // }



            // Set default song file if available
            if (songDetails?.song) {
                form.setFieldsValue({
                    song: [{
                        uid: '-1', // Unique ID for the file in Ant Design's Upload component
                        name: songDetails?.song, // File name or URL
                        status: 'done', // Indicates the file has been uploaded
                        url: songDetails?.song, // URL or default file
                    }]
                });
            }
        }
    }, [songDetails, form]);



    const handleUploadTwo = ({ fileList }) => {
        setMp3FileList(fileList);
    };





    const onFinish = async (values) => {
        const formData = new FormData();

        // Handle song file
        // const songFile = values?.song?.[0]?.originFileObj || songDetails?.song; // Use default if not provided
        // formData.append('song', songFile);

        // Handle song poster (image)
        // const songPoster = values?.image?.[0]?.originFileObj || songDetails?.song_poster;
        // formData.append('song_poster', songPoster);

        if (imagePreview[0]?.originFileObj) {
            formData.append("song_poster", imagePreview[0].originFileObj);
        }

        const newMp3File = values?.mp3File?.[0]?.originFileObj;

        if (newMp3File) {
            // new mp3 file uploaded
            formData.append("song", newMp3File);
        }


        // Append other form data
        formData.append('title', values?.title || songDetails?.title);
        formData.append('artist_id', values?.artistName || songDetails?.artist_id);
        formData.append('price', values?.price || songDetails?.price);
        formData.append('genre_id', values?.genre || songDetails?.genre_id);
        formData.append('key_id', values?.key || songDetails?.key_id);
        formData.append('license_id', values?.License || songDetails?.license_id);
        formData.append('type_id', values?.type || songDetails?.type_id);
        formData.append('bpm', values?.BPM || songDetails?.bpm);
        formData.append('gender', values?.gender || songDetails?.gender);
        formData.append('is_published', values?.publishStatus || songDetails?.is_published.toString());

        // Log the form data to verify it's being sent
        // for (let [key, value] of formData.entries()) {
        //     console.log(`key: ${key}, value: ${value}`);
        // }



        try {
            if (songUpdateId) {
                const token = localStorage.getItem("admin_token");
                const res = await axios.post(
                    `http://103.186.20.110:8002/api/update-song/${songUpdateId}?_method=PUT`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                if (res) {
                    message.success('Song updated successfully');
                    setOpenSongModal(false);
                    form.resetFields();
                }
            }
        } catch (error: any) {
            console.log(error);
            message.error(error?.data?.message || 'Something went wrong');
        }
    };


    const defaultImage = `${imgUrl}/${songDetails?.song_poster}`

    // console.log(`single song is `, singleSong?.data);
    // console.log(`single song_poster is `, singleSong?.data?.song_poster);
    // console.log(`single song image is `, singleSong?.data?.song);
    const songPoster = singleSong?.data?.song_poste;
    const songM3 = singleSong?.data?.song

    console.log(`image imagePreview is`, imagePreview)

    if (songLoading) {
        return (
            <div className="flex h-screen justify-center items-center">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-2xl">
            <h1 className="text-2xl font-semibold">Update Song</h1>
            <Form form={form} onFinish={onFinish} layout="vertical">
                {/* Upload audio */}
                <h1>Upload song....</h1>
                {/* <Form.Item
                    name="song"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e && e.fileList}
                    rules={[{ required: true, message: "Upload an audio file!" }]}
                    className="bg-[#f5f5f5] border-dashed text-center py-4"
                >
                    <Upload accept="audio/*" maxCount={1} beforeUpload={() => false}>
                        <Button>Upload Audio</Button>
                    </Upload>
                </Form.Item> */}

                <div className="pt-6">
                    <Form.Item
                        name="mp3File"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            // Ensure it returns fileList array
                            if (Array.isArray(e)) return e;
                            return e && e.fileList;
                        }}

                    >
                        <Dragger
                            beforeUpload={() => false} // Prevents auto-upload
                            fileList={mp3FileList}
                            onChange={handleUploadTwo}
                            accept=".mp3"
                            maxCount={1}
                            style={{
                                backgroundColor: 'transparent',
                                border: '2px dashed #888',
                                borderRadius: '8px',
                                padding: '0px 20px',
                            }} >

                            <div>
                                <p style={{ color: '#fff', fontSize: '16px', fontWeight: 500 }}>
                                    Upload podcast of drag & drop here.
                                </p>
                            </div>


                        </Dragger>
                    </Form.Item>
                </div>



                {/* Upload image */}
                <Form.Item
                    className="md:col-span-2"
                    name="thumbnail"
                >
                    <Upload

                        accept="image/*"
                        maxCount={1}
                        showUploadList={{ showPreviewIcon: true }}
                        fileList={imagePreview}
                        onChange={({ fileList }) => setImagePreview(fileList)}
                        beforeUpload={() => false}
                    >
                        <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                            <UploadCloud className="w-5 h-5 text-gray-400" />
                            <span className=" text-[#fff]">Upload thumbnail.</span>
                        </div>
                    </Upload>
                </Form.Item>

                {/* Image Preview */}
                {/* <div className="flex justify-center my-4">
                    <img
                        src={`${import.meta.env.VITE_BASE_URL}/${songDetails?.song_poster}`}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-xl shadow-md border"
                    />
                </div> */}







                {/* song title  */}
                <div>
                    <Form.Item
                        className="flex-1"
                        label="Title"
                        name="title"
                    // rules={[{ required: true, message: "Please enter song title" }]}
                    >
                        <Input defaultValue={songDetails?.title} placeholder="Enter title of this song" required></Input>
                    </Form.Item>
                    {/* artist name  */}
                    <Form.Item
                        label="Artist name"
                        name="artistName"
                    // rules={[{ required: true, message: "Please select an artist name!" }]}
                    >
                        <Select
                            // loading={artistDataLoading}
                            className="bg-[#f5f5f5] h-12 rounded-lg"
                            defaultValue={songDetails?.artist?.name}
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
                        // rules={[{ required: true, message: "Please select an Genre!" }]}
                        >
                            <Select
                                // loading={genresLoading}
                                className="bg-[#f5f5f5] h-12 rounded-lg"
                                defaultValue={songDetails?.genre_id}
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

                        // rules={[{ required: true, message: "Please input a BPM!" }]}
                        >
                            <Input
                                max={1000}

                                maxLength={4}
                                min={30}
                                defaultValue={songDetails?.bpm}
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
                        // rules={[{ required: true, message: "Please select a Key!" }]}
                        >
                            <Select
                                // loading={keysLoading}
                                className="bg-[#f5f5f5] h-12 rounded-lg"
                                defaultValue={songDetails?.key_id}
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
                        {/* Key */}
                        <Form.Item
                            className="flex-1"
                            label="Type"
                            name="type"
                        // rules={[{ required: true, message: "Please select a Type!" }]}
                        >
                            <Select
                                // loading={licensLoading}
                                className="bg-[#f5f5f5] h-12 rounded-lg"
                                defaultValue={songDetails?.type_id}
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

                    <div className="flex gap-3">
                        {/*Price */}
                        <Form.Item
                            className="flex-1"
                            label="Price"
                            name="price"
                        // rules={[{ required: true, message: "Please select a Price!" }]}
                        >
                            <Input defaultValue={songDetails?.price} placeholder="Enter price of the song" required></Input>
                        </Form.Item>

                        <Form.Item
                            className="flex-1"
                            label="License"
                            name="License"
                        // rules={[{ required: true, message: "Please select a License!" }]}
                        >
                            <Select
                                // loading={typeLoading}
                                className="bg-[#f5f5f5] h-12 rounded-lg"
                                defaultValue={songDetails?.license_id}
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
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "Please select an publish status!",
                        //     },
                        // ]}
                        >
                            <Select
                                // loading={genresLoading}
                                className="bg-[#f5f5f5] h-12 rounded-lg"
                                defaultValue={songDetails?.is_published ? "Publish" : "Unpublish"}
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
                            <Radio.Group defaultValue={songDetails?.gender} className="flex  gap-3 mt-3 ">
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
                                // onClick={handleCancel}
                                className="flex-1  bg-[#fff5f4] text-[#FF3B30] border-none rounded-2xl p-5 font-bold font-degular text-xl"
                            >
                                Cancel
                            </Button>
                            <Button
                                loading={isUpdating}
                                htmlType="submit"
                                className="w-full flex-1 bg-[#E7F056] border-none rounded-2xl p-5 font-bold font-degular text-xl"
                            >
                                Save changes
                            </Button>
                        </div>
                    </Form.Item>
                </div>


            </Form>
        </div>
    );
};

export default SongUpdateForm;

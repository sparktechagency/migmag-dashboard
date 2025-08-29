import React, { useState } from 'react';
import { Form, Button, Upload, message, Radio, Select, Input } from 'antd';
import { useArtistGetQuery } from '../redux/dashboardFeatures/Artist/artistApiSlice';
import { useGenreGetQuery, useKeyGetQuery, useLicenseGetQuery, useTypeGetQuery } from '../redux/dashboardFeatures/catagory/catagoryApiSlice';
import { useCreateNewSongMutation } from '../redux/dashboardFeatures/manage_song/songApiSlice';

const AddSong = ({ setOpenSongModal }) => {
    const [form] = Form.useForm();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data: artistData } = useArtistGetQuery({});
    const { data: genres } = useGenreGetQuery([]);
    const { data: keys } = useKeyGetQuery([]);
    const { data: type } = useTypeGetQuery([]);
    const { data: licens } = useLicenseGetQuery([]);
    const [createNewSong, { isLoading }] = useCreateNewSongMutation();

    const onFinish = async (values: any) => {
        const formData = new FormData();
        formData.append('title', values?.title);
        formData.append('song', values?.song[0].originFileObj);
        formData.append('song_poster', values?.image[0].originFileObj);
        formData.append('artist_id', values.artistName);
        formData.append('price', values.price);
        formData.append('genre_id', values.genre);
        formData.append('key_id', values.key);
        formData.append('license_id', values.License);
        formData.append('type_id', values.type);
        formData.append('bpm', values.BPM);
        formData.append('gender', values.gender);
        formData.append('is_published', values.publishStatus);

        try {
            const res = await createNewSong(formData).unwrap();

            if (res) {
                message.success('Song created successfully');
                form.resetFields();
                setImagePreview(null);
                setOpenSongModal(false)
            }
        } catch (error: any) {
            message.error(error?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="p-6 bg-white rounded-2xl">
            <h1 className="text-2xl font-semibold">Add New Song</h1>
            <Form form={form} onFinish={onFinish} layout="vertical">
                {/* Upload audio */}
                <Form.Item
                    name="song"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e && e.fileList}
                    rules={[{ required: true, message: "Upload an audio file!" }]}
                    className="bg-[#f5f5f5] border-dashed text-center py-4"
                >
                    <Upload accept="audio/*" maxCount={1} beforeUpload={() => false}>
                        <Button>Upload Audio</Button>
                    </Upload>
                </Form.Item>

                {/* Upload image */}
                <Form.Item
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e && e.fileList}
                    rules={[{ required: true, message: "Upload a Thumbnail!" }]}
                    className="bg-[#f5f5f5] border-dashed text-center py-4 my-4"
                >
                    <Upload
                        accept="image/*"
                        maxCount={1}
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={(info) => {
                            const latestFile = info.fileList[0]?.originFileObj as File | undefined;
                            if (!latestFile) return;

                            if (!latestFile.type.startsWith("image/")) {
                                message.error("You can only upload image files!");
                                return;
                            }

                            const reader = new FileReader();
                            reader.onload = () => {
                                setImagePreview(reader.result as string);
                            };
                            reader.readAsDataURL(latestFile);
                        }}
                    >
                        <Button>Upload Thumbnail</Button>
                    </Upload>
                </Form.Item>

                {/* Image Preview */}
                {imagePreview && (
                    <div className="flex justify-center my-4">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-40 h-40 object-cover rounded-xl shadow-md border"
                        />
                    </div>
                )}
                <div>
                    <Form.Item
                        className="flex-1"
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: "Please enter song title" }]}
                    >
                        <Input placeholder="Enter title of this song" required></Input>
                    </Form.Item>
                    <Form.Item
                        label="Artist name"
                        name="artistName"
                        rules={[{ required: true, message: "Please select an artist name!" }]}
                    >
                        <Select
                            // loading={artistDataLoading}
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
                                // loading={genresLoading}
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
                                // loading={keysLoading}
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
                                // loading={licensLoading}
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
                            rules={[{ required: true, message: "Please select a License!" }]}
                        >
                            <Select
                                // loading={typeLoading}
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
                                // loading={genresLoading}
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
                                // onClick={handleCancel}
                                className="flex-1  bg-[#fff5f4] text-[#FF3B30] border-none rounded-2xl p-5 font-bold font-degular text-xl"
                            >
                                Cancel
                            </Button>
                            <Button
                                loading={isLoading}
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

export default AddSong;

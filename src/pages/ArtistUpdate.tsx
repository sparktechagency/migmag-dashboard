import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useArtistUpdateMutation, useSingleArtistQuery, } from "../redux/dashboardFeatures/Artist/artistApiSlice";
import { imgUrl } from './../utils/imgUrl';
import { updateAlert } from "../utils/updateAlert";
import Swal from "sweetalert2";



const ArtistUpdate: React.FC = ({ slug, artistId, artistFrom, setArtistModal }) => {
    console.log(artistId)
    const { data, isLoading } = useSingleArtistQuery(slug);
    const [artistUpdate] = useArtistUpdateMutation();

    console.log("artist data is", data);

    const [artist, setArtist] = useState({
        name: "",
        location: "",
        description: "",
        gender: "",
        language: "",
        price: "",
    });

    console.log(`artist data is`, artistId)

    const [profilePreview, setProfilePreview] = useState<string | null>(null);
    const [profileFile, setProfileFile] = useState<File | null>(null);

    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);

    // Populate form when API data is ready
    useEffect(() => {
        if (data) {
            setArtist({
                name: data?.data?.artist?.name,
                location: data?.data?.artist?.location,
                description: data?.data?.artist?.description,
                gender: data?.data?.artist?.gender,
                language: data?.data?.artist?.language,
                price: data?.data?.artist?.price,
            });

            if (data?.data?.artist?.profile) setProfilePreview(data?.data?.artist?.profile);
            if (data?.data?.artist?.cover_song) setCoverPreview(data?.data?.artist?.cover_song);
        }
    }, [data]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked, files } = e.target;

        // Profile Image
        if (name === "profileImage" && files && files[0]) {
            setProfileFile(files[0]);
            setProfilePreview(URL.createObjectURL(files[0]));
            return;
        }

        // Cover Song
        if (name === "coverSong" && files && files[0]) {
            setCoverFile(files[0]);
            setCoverPreview(URL.createObjectURL(files[0]));
            return;
        }

        if (type === "checkbox") {
            let updatedSingerInfo = [...artist.singerInfo];
            if (checked) {
                updatedSingerInfo.push(value);
            } else {
                updatedSingerInfo = updatedSingerInfo.filter((v) => v !== value);
            }
            setArtist((prev) => ({ ...prev, singerInfo: updatedSingerInfo }));
        } else if (type === "radio") {
            setArtist((prev) => ({ ...prev, [name]: value }));
        } else {
            setArtist((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", artist.name);
        formData.append("location", artist.location);
        formData.append("description", artist.description);
        formData.append("gender", artist.gender);
        formData.append("language", artist.language);
        formData.append("_method", "PUT");
        formData.append("price", artist.price.toString());


        if (profileFile) formData.append("profile", profileFile);
        if (coverFile) formData.append("cover_song", coverFile);

        try {

            const res = await updateAlert();

            if (res.isConfirmed) {
                const res = await artistUpdate({ artistId, formData }).unwrap();
                console.log(res)
                // artistFrom.reset();
                setArtistModal(false)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: res?.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (error) {
            console.error(error);
            alert("Failed to update artist");
        }
    };

    if (isLoading) {
        return <div className=" flex items-center justify-center " >
            <h1>Loading...</h1>
        </div>
    }

    return (
        <form
            className="max-w-xl mx-auto p-6 bg-white text-black shadow rounded-lg space-y-5"
            onSubmit={handleSubmit}
        >
            <h1 className="text-2xl font-semibold text-center mb-4">Artist Form</h1>

            {/* Profile Image */}
            <div>
                <label className="block font-medium">Profile Image</label>
                <input
                    type="file"
                    name="profileImage"
                    className="mt-2"
                    accept="image/*"
                    onChange={handleChange}
                />
                {profilePreview && (
                    <img
                        src={
                            profileFile
                                ? profilePreview // Local preview for newly selected file
                                : `${imgUrl}/${profilePreview}` // Server image for existing profile
                        }
                        alt="Profile Preview"
                        className="mt-2 w-32 h-32 object-cover rounded-full border"
                    />
                )}
            </div>

            {/* Cover Song */}
            <div>
                <label className="block font-medium">Cover Song</label>
                <input
                    type="file"
                    name="coverSong"
                    className="mt-2"
                    accept="audio/*"
                    onChange={handleChange}
                />
                {coverPreview && (
                    <audio controls className="mt-2 w-full">
                        <source
                            src={coverFile ? coverPreview : `${imgUrl}/${coverPreview}`}
                            type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                    </audio>
                )}
            </div>



            {/* Name */}
            <div>
                <label className="block font-medium">Artist Name</label>
                <input
                    type="text"
                    name="name"
                    value={artist.name}
                    className="w-full border border-black hover:outline-0 focus:outline-0  rounded p-2"
                    onChange={handleChange}
                />
            </div>

            {/* Location */}
            <div>
                <label className="block font-medium">Location</label>
                <input
                    type="text"
                    name="location"
                    value={artist.location}
                    className="w-full border border-black hover:outline-0 focus:outline-0  rounded p-2"
                    onChange={handleChange}
                />
            </div>

            {/* Description */}
            <div>
                <label className="block font-medium">Description</label>
                <textarea
                    name="description"
                    value={artist.description}
                    className="w-full border border-black hover:outline-0 focus:outline-0  rounded p-2"
                    rows={3}
                    onChange={handleChange}
                />
            </div>

            {/* Gender */}
            <div>
                <label className="block font-medium">Gender</label>
                <div className="flex gap-4 mt-1">
                    {["male", "female", "other"].map((g) => (
                        <label key={g} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value={g}
                                checked={artist.gender === g}
                                onChange={handleChange}
                            />
                            {g.charAt(0).toUpperCase() + g.slice(1)}
                        </label>
                    ))}
                </div>
            </div>



            {/* Language */}
            <div>
                <label className="block font-medium">Language</label>
                <input
                    type="text"
                    name="language"
                    value={artist.language}
                    className="w-full border border-black hover:outline-0 focus:outline-0  rounded p-2"
                    onChange={handleChange}
                />
            </div>

            {/* Price */}
            <div>
                <label className="block font-medium">Price</label>
                <input
                    type="number"
                    name="price"
                    value={artist.price}
                    className="w-full border border-black hover:outline-0 focus:outline-0  rounded p-2"
                    onChange={handleChange}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-[#E7F056] text-black font-medium p-2 rounded"
            >
                Submit
            </button>
        </form>

    )
};

export default ArtistUpdate;

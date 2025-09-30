"use client";

import { useState, useEffect, useRef } from "react";
import { Music } from "lucide-react";
import { Modal } from "antd";
import { useSongDetailsQuery } from "../../redux/dashboardFeatures/manage_song/songApiSlice";
import { imgUrl } from "../../utils/imgUrl";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface MusickPlayerProps {
    playerId: number;
    isOpen: boolean;
    onClose: () => void;
    loop?: boolean;
}

export default function MusickPlayer({
    playerId,
    isOpen,
    onClose,
    loop = false,
}: MusickPlayerProps) {
    const { data, isLoading } = useSongDetailsQuery(playerId);
    const songUrl = data?.data?.song ? `${imgUrl}/${data?.data?.song}` : "";

    const playerRef = useRef<AudioPlayer>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Stop audio when modal closes
    useEffect(() => {
        if (!isOpen && playerRef.current) {
            const audioEl = playerRef.current.audio.current;
            if (audioEl) {
                audioEl.pause();
                audioEl.currentTime = 0;
            }
            setIsPlaying(false);
        }
    }, [isOpen]);

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={600}
            centered
            bodyStyle={{ padding: 20 }}
        >
            {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div>
                    {/* Song Info */}
                    <div className="flex items-start gap-4">
                        <img
                            src={`${imgUrl}/${data?.data?.song_poster}`}
                            alt={data?.data?.title}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-1">{data?.data?.title}</h2>
                            <p className="text-gray-500 mb-2">{data?.data?.artist?.name}</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="flex items-center bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded">
                                    <Music className="w-3 h-3 mr-1" /> {data?.data?.genre?.name}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* React H5 Audio Player */}
                    <div className="mt-6">
                        <AudioPlayer
                            ref={playerRef}
                            src={songUrl}
                            loop={loop}
                            autoPlay={false}
                            showJumpControls={false}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => setIsPlaying(false)}
                            customAdditionalControls={[]} // remove extra controls
                            customVolumeControls={[]} // remove volume
                            layout="horizontal"
                            className="rounded-md shadow-none bg-black text-white"
                        />
                    </div>
                </div>
            )}
        </Modal>
    );
}

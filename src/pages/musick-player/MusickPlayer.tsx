"use client";

import { useState, useEffect, useRef } from "react";
import { Music, Play, Pause } from "lucide-react";
import { Modal, Button } from "antd";
import { useSongDetailsQuery } from "../../redux/dashboardFeatures/manage_song/songApiSlice";
import { imgUrl } from "../../utils/imgUrl";

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

    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0); // 0-1
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);

    // Stop audio when modal closes
    useEffect(() => {
        const audioEl = audioRef.current;
        if (!isOpen && audioEl) {
            audioEl.pause();
            audioEl.currentTime = 0;
            setIsPlaying(false);
            setPlayed(0);
        }
    }, [isOpen]);

    const togglePlay = () => {
        const audioEl = audioRef.current;
        if (!audioEl) return;
        if (isPlaying) audioEl.pause();
        else audioEl.play();
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const audioEl = audioRef.current;
        if (!audioEl) return;
        if (!isSeeking) {
            setPlayed(audioEl.currentTime / audioEl.duration);
        }
        setDuration(audioEl.duration);
    };

    const handleSeekStart = () => {
        setIsSeeking(true);
    };

    const handleSeekEnd = (value: number) => {
        const audioEl = audioRef.current;
        if (!audioEl) return;
        audioEl.currentTime = (value / 100) * audioEl.duration;
        setPlayed(value / 100);
        setIsSeeking(false);
    };

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

                    {/* Audio Element */}
                    <audio
                        ref={audioRef}
                        src={songUrl}
                        loop={loop}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => setIsPlaying(false)}
                    />

                    {/* Play Button */}
                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            type="primary"
                            shape="circle"
                            size="large"
                            onClick={togglePlay}
                        >
                            {isPlaying ? <Pause /> : <Play />}
                        </Button>
                    </div>

                    {/* Progress Slider */}
                    <input
                        type="range"
                        min={0}
                        max={100}
                        step={0.1}
                        value={played * 100}
                        onMouseDown={handleSeekStart}
                        onTouchStart={handleSeekStart}
                        onChange={(e) => handleSeekEnd(Number(e.target.value))}
                        className="w-full mt-4"
                    />

                    <div className="flex justify-between text-sm text-gray-500">
                        <span>{formatTime(played * duration)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>

                    {/* Waveform */}
                    <div className="mt-6 mb-4 flex h-24 items-center gap-0.5">
                        {Array.from({ length: 60 }).map((_, idx) => {
                            const barHeight = Math.random() * 24 + 8;
                            const progress = played * 60;
                            return (
                                <div
                                    key={idx}
                                    className="w-1 rounded bg-yellow-400 transition-all"
                                    style={{ height: idx <= progress ? barHeight : barHeight / 3 }}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </Modal>
    );
}

function formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

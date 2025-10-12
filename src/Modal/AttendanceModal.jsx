import { useEffect, useRef, useState } from "react";
import TextBox from "../Components/Form/TextBox.jsx";
import utilServices from "../services/utilServices.js";
import Button from "../Components/Button/Button.jsx"
import {useTranslation} from "react-i18next";
import {capitalize} from "../utils/helper.js";
import {ArrowPathIcon} from "@heroicons/react/24/solid/index.js";


const AttendanceModal = ({ onClose, onSubmit }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const {t} = useTranslation();
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [address, setAddress] = useState("");
    const [comment, setComment] = useState("");
    const [serverTime, setServerTime] = useState({
        day: "",
        datetime: new Date(),
    });

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                setLocation({ lat: latitude, lon: longitude });

                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const data = await res.json();
                setAddress(data.display_name || "Alamat tidak ditemukan");
            },
            (err) => {
                console.error(err);
                alert("Tidak bisa mengambil lokasi.");
            }
        );
    };

   const getServerTime = async () => {
       try {
           const serverTimeResponse = await utilServices.getServerTime()
           setServerTime({
               day: serverTimeResponse.data.day,
               datetime: new Date(serverTimeResponse.data.datetime),
           });
       } catch (error) {
           console.error("Error fetching data:", error);
       }
    }

    useEffect(() => {
        getLocation();
        getServerTime();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setServerTime((prevTime) => ({
                ...prevTime,
                datetime: new Date(prevTime.datetime.getTime() + 1000),
            }));
        }, 1000);

        return () => clearInterval(interval); // pastikan dihapus saat komponen unmount
    }, []);


    // Dapatkan akses kamera
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        }).catch((err) => {
            console.error(err);
            alert("Tidak bisa mengakses kamera.");
        });

        return () => {
            // Hentikan semua track video saat modal ditutup
            streamRef.current?.getTracks()?.forEach((track) => track.stop());
        };
    }, []);

    const formatDateTime = (date) => {
        const options = {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        };
        return date.toLocaleDateString("en-UK", options).replace(",", "");
    };


    const handleCapture = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const ctx = canvas.getContext("2d");

        const WIDTH = 640;
        const HEIGHT = 480;

        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        ctx.drawImage(video, 0, 0, WIDTH, HEIGHT);

        // Convert base64 ke blob
        canvas.toBlob((blob) => {
            const photoFile = new File([blob], "photo.jpg", { type: "image/jpeg" });

            const data = {
                latitude: location.lat,
                longitude: location.lon,
                comment,
                photo: photoFile,
                address : address
            };

            onSubmit(data); // kirim ke handleSubmit
        }, "image/jpeg", 0.7);

    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-lg">
                <h2 className="text-xl font-bold">{capitalize(t("attendanceForm"))}</h2>

                {/* MAP */}
                <div>
                    <iframe
                        title="map"
                        className="w-full h-48 rounded-xl"
                        src={`https://maps.google.com/maps?q=${location.lat},${location.lon}&z=15&output=embed`}
                        allowFullScreen
                    />
                </div>

                {/* TOMBOL REFRESH */}
                <div className="flex justify-end">
                    <button
                        onClick={getLocation}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        <ArrowPathIcon className={"w-4 cursor-pointer text-primary"}/>
                    </button>
                </div>

                <div className="flex gap-6 justify-around items-center">
                    <div className="flex flex-col items-center">
                        <video ref={videoRef} autoPlay className="rounded-xl w-64 h-48 object-cover transform scale-x-[-1]" />
                        <canvas ref={canvasRef} className="hidden" />
                    </div>

                    <div className="flex flex-col gap-4 w-full text-left">
                        <TextBox onlyBottom={true} label={capitalize(t("time"))} id="time" name="time" type="text" value={`${serverTime.day ? `${formatDateTime(serverTime.datetime)}` : "Loading data ..."}`} readOnly={true}/>
                        <TextBox onlyBottom={true} label={capitalize(t("address"))} id="address" name="address" type ="text" value={address ? address : "loading data ..."} readOnly={true}/>
                        <TextBox onlyBottom={true} label={capitalize(t("comment"))} id="comment" name="comment" type ="text" value={comment} handleChange={(e) => setComment(e.target.value)}/>
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-2 pt-2">
                    <Button text={capitalize(t('back'))} onClick={onClose} fill={false} />
                    <Button text={capitalize(t('clock'))} onClick={handleCapture}/>
                </div>
            </div>
        </div>
    );
};

export default AttendanceModal;

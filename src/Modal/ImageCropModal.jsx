// src/components/ImageCropModal.jsx
import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";
import { getCroppedImg } from "../utils/cropImageHelper.js"; // kita buat helper-nya nanti
import { Dialog } from "@headlessui/react";

const ImageCropModal = ({ imageSrc, onClose, onCropDone }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCrop = async () => {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onCropDone(croppedImage);
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-[90vw] max-w-lg">
                <div className="relative w-full h-96 bg-gray-200">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1} // 1:1 untuk foto profil
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>
                <div className="flex justify-between items-center mt-4">
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(e.target.value)}
                        className="w-full mr-4"
                    />
                    <button onClick={handleCrop} className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer">
                        Done
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default ImageCropModal;

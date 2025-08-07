// src/utils/cropImageHelper.js
export const getCroppedImg = (imageSrc, cropPixels) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.crossOrigin = "anonymous";

        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = cropPixels.width;
            canvas.height = cropPixels.height;

            ctx.drawImage(
                image,
                cropPixels.x,
                cropPixels.y,
                cropPixels.width,
                cropPixels.height,
                0,
                0,
                cropPixels.width,
                cropPixels.height
            );

            canvas.toBlob((blob) => {
                if (!blob) return reject(new Error("Canvas is empty"));
                const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
                resolve(file);
            }, "image/jpeg");
        };

        image.onerror = reject;
    });
};

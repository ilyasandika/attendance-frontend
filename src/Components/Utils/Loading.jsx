// Loading.js
import React from "react";

const Loading = ({ size = 32, text }) => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="flex flex-col items-center">
                <div
                    className="animate-spin rounded-full border-3 border-t-gray-500 border-b-gray-300"
                    style={{ width: size, height: size }}
                ></div>
                {text && <span className="mt-2 text-gray-700">{text}</span>}
            </div>
        </div>
    );
};

export default Loading;

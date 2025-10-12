// src/components/FileInput.js
import React, {useEffect, useState} from 'react';
import {ArrowUpTrayIcon} from "@heroicons/react/20/solid/index.js";
import {EyeIcon} from "@heroicons/react/16/solid/index.js";

const FileInput = ({label, setFile, accept, link = null, error}) => {
    const [fileName, setFileName] = useState('');
    const [preview, setPreview] = useState(link || null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setFileName(file.name);
            setPreview(URL.createObjectURL(file));
        } else {
            setFileName('Belum ada file yang dipilih');
        }
    };

    const errorClass = error ? "animate-shake text-red-500" : "";
    return (

       <div className={`flex flex-col ${errorClass}`}>
           <label className="text-sm font-semibold">
               {label}
           </label>
           <div className="flex items-center space-x-4 mt-2">
               <label htmlFor="file-upload" className="relative cursor-pointer">
                   <div className="flex items-center justify-center py-2 px-4 border border-primary/20 rounded-md hover:bg-gray-100 transition-colors duration-200 ease-in-out">
                       <ArrowUpTrayIcon className="size-4"/>
                       <span className="ml-2 text-sm text-gray-700">{fileName ? fileName : link ? "Unggah file untuk memperbarui lampiran" : "Silahkan unggah File" }</span>
                   </div>
               </label>
               <input
                   id="file-upload"
                   type="file"
                   className="hidden"
                   accept={accept}
                   onChange={handleFileChange}
               />

               {/* Nama File yang Diunggah */}
               {
                   preview &&
                   <a href={preview} target="_blank" className="text-sm flex items-center gap-1 hover:underline group w-fit">
                       <EyeIcon className="w-4 inline"/>
                       <span className="group-hover:underline">Preview</span>
                   </a>
               }

               {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
           </div>
       </div>
    );
};

export default FileInput;
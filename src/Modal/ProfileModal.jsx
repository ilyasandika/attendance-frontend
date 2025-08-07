// src/components/ProfileModal.jsx
import { useEffect, useRef } from "react";

const ProfileModal = ({ onClose, onLogout, onEdit }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div
            ref={modalRef}
            className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md z-50"
        >
            <button
                onClick={onEdit}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
            >
                Edit Profile
            </button>
            <button
                onClick={onLogout}
                className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 cursor-pointer"
            >
                Logout
            </button>
        </div>
    );
};

export default ProfileModal;

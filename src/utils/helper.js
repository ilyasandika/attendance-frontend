const getAuthToken = () => {
    return localStorage.getItem("token");
};


const updateSearchParams = (setSearchParams, currentPage, search, option = {}) => {
    const pageName = option.pageName || "page";
    const searchName = option.searchName || "search";

    setSearchParams((prevParams) => {
        prevParams.set(pageName, currentPage ?? 1);

        if (search) {
            prevParams.set(searchName, search);
            prevParams.set(pageName, 1);
        } else {
            prevParams.delete(searchName);
        }

        return prevParams;
    });
};

const handlePageChange = (setSearchParams, newPage, totalPages, pageName) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setSearchParams((prevParams) => {
            const updatedParams = new URLSearchParams(prevParams);
            updatedParams.set(pageName, newPage.toString());
            return updatedParams;
        });
    }
};

const formattedDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};

const getStatusColor = (status, withBackground = false) => {

    if (withBackground) {
        return {
            "On Time": "bg-green-100 text-green-600",
            "true": "bg-green-100 text-green-600",
            "Late": "bg-yellow-100 text-yellow-600",
            "Present": "text-green-600",
            "Early Leave": "bg-yellow-100 text-yellow-600",
            "Absent": "bg-red-100 text-red-600",
            "false": "bg-red-100 text-red-600",
        }[status ?? ""] || "bg-gray-100 text-gray-500";
    }

    return {
        "On Time": "text-green-600",
        "true": "text-green-600",
        "Present": "text-green-600",
        "Late": "text-yellow-600",
        "Early Leave": "text-yellow-600",
        "Absent": "text-red-600",
        "false": "text-red-600",
    }[status ?? ""] || "text-gray-500";
}

const capitalize = (text, all = true) => {
    if (!text) return '';

    if (all) {
        return text
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
};



export { getAuthToken, updateSearchParams, handlePageChange, formattedDate, getStatusColor, capitalize};

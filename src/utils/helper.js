const getAuthToken = () => {
    return localStorage.getItem("token");
};

const getUserId = () => {
    return localStorage.getItem("employeeId");
};

const minutesToHM = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;
    return {
        hours : hours,
        minutes : minutesLeft,
    };
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

const timestampToObject = (timestamp, language = 'en-EN') => {
    if (!timestamp) return null;
    const date = new Date(timestamp * 1000);

    const parts = new Intl.DateTimeFormat(language, {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).formatToParts(date);

    return {
        day: parts.find(p => p.type === "weekday")?.value,
        date: parts.find(p => p.type === "day")?.value,
        month: parts.find(p => p.type === "month")?.value,
        year: parts.find(p => p.type === "year")?.value,
        time: `${parts.find(p => p.type === "hour")?.value}:${parts.find(p => p.type === "minute")?.value}:${parts.find(p => p.type === "second")?.value}`
    };

};


const formattedDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};

const getStatusColor = (status, withBackground = false) => {

    const padding = "px-4 py-2 rounded-lg font-bold"

    if (withBackground) {
        return {
            "on time": `${padding} bg-green-100 text-green-600`,
            "true": `${padding} bg-green-100 text-green-600`,
            "late": `${padding} bg-yellow-100 text-yellow-600`,
            "present": `${padding} bg-green-100 text-green-600`,
            "early leave": `${padding} bg-yellow-100 text-yellow-600`,
            "absent": `${padding} bg-red-100 text-red-600`,
            "false": `${padding} bg-red-100 text-red-600`,
            "draft" : `${padding} bg-gray-100 text-gray-500`,
            "active" : `${padding} bg-green-100 text-green-600`,
            "pending": `${padding} bg-yellow-100 text-yellow-600`,
            "approved" : `${padding} bg-green-100 text-green-600`,
            "rejected" : `${padding} bg-red-100 text-red-600`,
        }[status ?? ""] || `${padding} bg-gray-100 text-gray-500`;
    }

    return {
        "on time": "text-green-600",
        "true": "text-green-600",
        "present": "text-green-600",
        "late": "text-yellow-600",
        "early leave": "text-yellow-600",
        "absent": "text-red-600",
        "false": "text-red-600",
        "active" : "text-green-600",
        "pending": `text-yellow-600`,
        "approved" : `text-green-600`,
        "rejected" : `text-red-600`,
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



export { getUserId, timestampToObject, getAuthToken, updateSearchParams, handlePageChange, formattedDate, getStatusColor, capitalize, minutesToHM};

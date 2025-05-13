const getAuthToken = () => {
    return localStorage.getItem("token");
};

const updateSearchParams = (setSearchParams, currentPage, search) => {
    setSearchParams((prevParams) => {
        prevParams.set("page", currentPage ?? 1);

        if (search) {
            prevParams.set("search", search);
            prevParams.set("page", 1);
        } else {
            prevParams.delete("search");
        }

        return prevParams;
    });
};

const handlePageChange = (setSearchParams, newPage, totalPages) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setSearchParams((prevParams) => {
            const updatedParams = new URLSearchParams(prevParams);
            updatedParams.set("page", newPage.toString());
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

export { getAuthToken, updateSearchParams, handlePageChange, formattedDate };

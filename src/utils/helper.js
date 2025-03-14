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

export { getAuthToken, updateSearchParams, handlePageChange };

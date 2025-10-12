import { useState, useCallback } from "react";

export function usePaginationSearch(options = {}) {
    const { pageParam = "page", searchParam = "search" } = options;

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const getParams = useCallback(() => {
        const params = {};
        params[pageParam] = page;
        if (search) params[searchParam] = search;
        return params;
    }, [page, search, pageParam, searchParam]);

    const setSearchQuery = useCallback((q) => {
        setSearch(q);
        setPage(1);
    }, []);

    return {
        page,
        setPage,
        search,
        setSearch: setSearchQuery,
        getParams,
    };
}

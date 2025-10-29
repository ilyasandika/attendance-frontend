import { Link } from "react-router-dom";
import TableHeader from "./TableHeader.jsx";
import TableItem from "./TableItem.jsx";
import { capitalize, handlePageChange } from "../../utils/helper.js";
import { useTranslation } from "react-i18next";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid/index.js";


const DataTable = ({ header, columns, items, pagination, isLoading, onClick = null }) => {
    const { t } = useTranslation();

    const perPageOptions = [10, 25, 50, 100];

    const handlePerPageChange = (e) => {
        const newPerPage = Number(e.target.value);
        pagination.setRowsPerPage(newPerPage);
        handlePageChange(pagination.setSearchParams, 1, 1, pagination.pageName);
    };

    return (
        <div className="bg-white p-10 rounded-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{header.title}</h2>
                <div className="flex gap-2">
                    {pagination && (
                        <input
                            type="text"
                            placeholder={`${capitalize(t("search"))} ...`}
                            className="border rounded-lg px-3 py-1"
                            value={pagination.search}
                            onChange={(e) => pagination.setSearch(e.target.value)}
                        />
                    )}
                    {header.button && (
                        <Link
                            to={header.button.link}
                            onClick={header.button.onClick}
                            className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer"
                        >
                            {header.button.text}
                        </Link>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="w-full border-y border-primary/40 rounded">
                    <thead className="bg-white text-left text-sm">
                    <tr>
                        {columns.map((column, index) => (
                            <TableHeader key={`${column.id} ${index}`}>
                                {column.label}
                            </TableHeader>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="text-left text-sm">
                    {isLoading ? (
                        <tr>
                            <TableItem isFull={true} totalCol={columns.length}>
                                <span className="text-center">Loading data ...</span>
                            </TableItem>
                        </tr>
                    ) : items.length < 1 ? (
                        <tr>
                            <TableItem isFull={true} totalCol={columns.length}>
                                <span className="text-center">Nothing to display</span>
                            </TableItem>
                        </tr>
                    ) : (
                        items.map((item, index) => (
                            <tr key={`${item.id} ${index}`} className="hover:bg-gray-50">
                                {columns.map((column, index) => (
                                    <TableItem key={`${column.id} ${index}`}>
                                        {column.render
                                            ? column.render(item[column.key], item)
                                            : item[column.key]}
                                    </TableItem>
                                ))}
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                        <label htmlFor="rowsPerPage" className="text-sm text-gray-700">
                            {capitalize(t("rows per page"))}:
                        </label>
                        <select
                            id="rowsPerPage"
                            value={pagination.RowsPerPage}
                            onChange={handlePerPageChange}
                            className="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            {perPageOptions.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            disabled={pagination.currentPage === 1}
                            onClick={() =>
                                handlePageChange(
                                    pagination.setSearchParams,
                                    pagination.currentPage - 1,
                                    pagination.totalPages,
                                    pagination.pageName
                                )
                            }
                            className={`px-4 py-1 border rounded hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {/*{capitalize(t("previous"))}*/}
                            <ChevronLeftIcon className="w-4 h-4"/>
                        </button>
                        <span>
                            {capitalize(t("page"))} {pagination.currentPage} {t("of")}{" "}
                            {pagination.totalPages}
                        </span>
                        <button
                            disabled={pagination.currentPage === pagination.totalPages}
                            onClick={() =>
                                handlePageChange(
                                    pagination.setSearchParams,
                                    pagination.currentPage + 1,
                                    pagination.totalPages,
                                    pagination.pageName
                                )
                            }
                            className={`px-4 py-1 border rounded hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {/*{capitalize(t("next"))}*/}
                            <ChevronRightIcon className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
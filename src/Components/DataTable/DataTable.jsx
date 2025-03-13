import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import TableHeader from "./TableHeader.jsx";
import TableItem from "./TableItem.jsx";

const DataTable = ({ header, columns, items, pagination }) => {
    return (
        <div className="bg-white p-10 rounded-xl">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{header.title}</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded-lg px-3 py-1"
                        value={header.search}
                        onChange={(e) => pagination.setSearch(e.target.value)}
                    />
                    <Link to={header.button.link} className="bg-primary text-white px-4 py-2 rounded-lg">
                        {header.button.text}
                    </Link>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full border-y border-primary/40 rounded">
                    <thead className="bg-white text-left text-sm">
                        <tr>
                            {columns.map((column) => (
                                <TableHeader key={column.key}>{column.label}</TableHeader>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-left text-sm">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                {columns.map((column) => (
                                    <TableItem key={column.key}>{column.render ? column.render(item[column.key], item) : item[column.key]}</TableItem>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={pagination.currentPage === 1}
                    onClick={() => pagination.handlePageChange(pagination.currentPage - 1)}
                    className="px-4 py-1 border rounded hover:cursor-pointer disabled:opacity-50">
                    Previous
                </button>
                <span>
                    Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => pagination.handlePageChange(pagination.currentPage + 1)}
                    className="px-4 py-1 border rounded hover:cursor-pointer disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataTable;

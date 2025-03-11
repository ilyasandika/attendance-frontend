const TableHeader = ({ children }) => {
    return (
        <>
            <th className="py-2 px-4 border-y border-primary/40">{children}</th>
        </>
    );
};

export default TableHeader;

const TableItem = ({ children, isFull = false, totalCol = 1 }) => {


    return (
        <>
            <td className={`${isFull ? "text-center" : ""} py-3 px-4 border-t border-primary/10  `} colSpan={isFull ? totalCol : undefined}>
                {children}
            </td>
        </>
    );
};

export default TableItem;

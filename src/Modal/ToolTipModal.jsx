const ToolTipModal = ({
                          message = "Hubungi admin jika ingin mengubah data",
                          position = "center", // left | center | right
                      }) => {
    let positionClass = "";

    switch (position) {
        case "left":
            positionClass = "left-0";
            break;
        case "right":
            positionClass = "right-0";
            break;
        case "center":
        default:
            positionClass = "left-1/2 -translate-x-1/2";
            break;
    }

    return (
        <div
            className={`absolute ${positionClass} bottom-full mb-2
                        bg-red-800 text-white text-xs px-2 py-1 rounded shadow-md
                        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-max whitespace-nowrap`}
        >
            {message}
        </div>
    );
};

export default ToolTipModal;

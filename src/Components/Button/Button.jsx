import {Link} from "react-router-dom";

const Button = ({type = "submit", onClick = null, to = null, text, fill = true, danger = false, warning = false, success = false, className = ""}) => {

    let colorFill;
    const basicStyle = " font-medium cursor-pointer px-4 py-2 rounded-md";

    if (fill) {
        if (danger) {
            colorFill = "bg-red-600 text-white hover:bg-red-700";
        } else if (warning) {
            colorFill = "bg-yellow-600 hover:bg-yellow-700";
        } else if (success) {
            colorFill = "bg-success hover:bg-success/90 text-white"
        } else {
            colorFill = "bg-primary text-white";
        }
    }

    if (type === "link") {
        return (
            <Link
                to={to}
                className={` ${basicStyle} ${fill ? colorFill : "border border-primary text-primary hover:bg-primary/10"} ${className} `}
            >
                {text}
            </Link>
        );
    }
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${basicStyle} ${fill ? colorFill : "border border-primary text-primary  hover:bg-primary/10 "}${className} `}
        >
            {text}
        </button>
    );
}

export default Button;
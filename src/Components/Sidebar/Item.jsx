import {Link, useLocation} from "react-router-dom";
import {useState} from "react";
import ItemChild from "./ItemChild.jsx";

const Item = ({ items }) => {
    // ${isChildActive ? "bg-primary/10" : "bg-white"}
    // const location = useLocation();
    const [open, setOpen] = useState(false);
    // const isChildActive = childrenItems.some((item) => location.pathname.startsWith(item.to));

    return (
        <nav className="mt-5">
            <ul>
                {items.map((item, index) => {
                    return item.isAllowed &&
                    (<li key={index}>
                        <Link
                            to={item.to}
                            className={`flex items-center gap-4 pl-2 py-2 mb-2 hover:bg-primary/10 hover:cursor-pointer text-sm font-medium rounded-lg transition ${
                                item.isActive ? "bg-primary/10" : "bg-white"
                            }`}>
                            <img src={item.isActive ? item.activeIcon : item.inActiveIcon} alt={item.name} className="w-4 h-6" />
                            <span className="text-medium">{item.name}</span>
                        </Link>
                    </li>)
            })}
            </ul>
        </nav>
    );
};

export default Item;

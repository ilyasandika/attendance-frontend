import { Link } from "react-router-dom";

const ItemChild = ({ items }) => {
    return (
        <nav className="mt-2">
            <ul>
                {items.map((item, index) => {
                    return item.isAllowed &&
                        (<li key={index}>
                            <Link
                                to={item.to}
                                className={`flex items-center gap-4 ml-8 pl-4 py-3 hover:bg-primary/10 hover:cursor-pointer text-sm rounded-lg transition ${
                                    item.isActive ? "bg-primary/10" : "bg-white"
                                }`}>
                                {/*<img src={item.isActive ? item.activeIcon : item.inActiveIcon} alt={item.name} className="w-4 h-6" />*/}
                                <span className="text-medium">{item.name}</span>
                            </Link>
                        </li>)
                })}
            </ul>
        </nav>
    );
};

export default ItemChild;

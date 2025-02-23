import { Link } from "react-router-dom";

const Sidebar = ({ items }) => {
    return (
        <nav className="mt-5">
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.to}
                            className={`flex items-center gap-4 pl-4 py-3 mb-2 hover:bg-primary/10 hover:cursor-pointer font-medium rounded-lg transition ${
                                item.isActive ? "bg-primary/10" : "bg-white"
                            }`}>
                            <img src={item.isActive ? item.activeIcon : item.inActiveIcon} alt={item.name} className="w-4 h-6" />
                            <span className="text-md">{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;

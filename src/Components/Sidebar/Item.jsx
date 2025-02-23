const Item = ({ items }) => {
    return (
        <>
            <nav className="mt-5">
                <ul>
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={`pl-4 py-3 mb-2 hover:bg-primary/10 hover:cursor-pointer font-medium rounded-lg ${
                                item.isActive ? "bg-primary/10" : "bg-white"
                            }`}>
                            <span className="flex gap-4">
                                <img src={item.isActive ? item.activeIcon : item.inActiveIcon} />
                                {item.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Item;

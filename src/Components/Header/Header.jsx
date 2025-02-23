const Header = () => {
    return (
        <header className="bg-white px-10 py-10 fixed left-64 top-0 right-0 h-16 flex items-center justify-between">
            <h1 className="font-semibold">Sunday, 23 Februari 2025 00:00:00</h1>
            <div className="flex items-center gap-6">
                <div className="flex flex-col text-right">
                    <span className="font-bold">Ilyas Andika</span>
                    <span>Helper Support</span>
                </div>
                <img src="/profile/default.svg" className="w-10 rounded-full" />
            </div>
        </header>
    );
};

export default Header;

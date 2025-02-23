import { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import Header from "./Components/Header/Header.jsx";
import AppRoutes from "./routes.jsx";

function App() {
    return (
        <>
            <div className="flex">
                <Sidebar />

                <div className="flex-1">
                    <Header />

                    {/* Content */}
                    <main className="p-14 mt-16 text-center">
                        <AppRoutes />
                    </main>
                </div>
            </div>
        </>
    );
}

export default App;

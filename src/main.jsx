import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "./i18n";
import {SidebarProvider} from "./contexts/useSideBar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <SidebarProvider>
            <App />
        </SidebarProvider>
    </BrowserRouter>
);

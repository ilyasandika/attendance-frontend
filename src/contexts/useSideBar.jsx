import { createContext, useState, useContext } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
    const [minimize, setMinimize] = useState(true);

    return (
        <SidebarContext.Provider value={{ minimize, setMinimize }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    return useContext(SidebarContext);
}
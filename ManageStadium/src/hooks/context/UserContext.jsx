import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return null;
        try {
            return JSON.parse(storedUser);
        } catch (err) {
            console.warn("Invalid user data in localStorage, clearing it.", err);
            localStorage.removeItem("user");
            return null;
        }
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
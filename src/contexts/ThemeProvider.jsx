import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext)

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("system");

    const systemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

    useEffect(() => {
        const storageTheme = localStorage.getItem("theme") || "system";
        setTheme(storageTheme);
    }, [])

    useEffect(() => {
        let appliedTheme = theme
        if (appliedTheme === "system") {
            appliedTheme = systemTheme();
        }
        document.documentElement.setAttribute("data-theme", appliedTheme);
        localStorage.setItem("theme", theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export {useTheme, ThemeProvider}

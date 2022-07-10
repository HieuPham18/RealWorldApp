import { createContext, useContext, useState, useEffect } from "react";
import { userContext } from "./userContext";

export const articleContext = createContext()

export function ArticleContextProvider({ children }) {
    const [tagContext, setTagContext] = useState(null)

    return (
        <articleContext.Provider value={{ tagContext, setTagContext }}>
            {children}
        </articleContext.Provider>
    )
}
import { createContext } from "react";
import { useState, useEffect } from "react";
import { getUser } from "../services/userAuth";

const API_USER = 'https://api.realworld.io/api/user'

export const userContext = createContext()

export function UserContextProvider({ children }) {
    const [accessToken, setAccessToken] = useState(JSON.parse(localStorage.getItem("auth")))
    
    const [infoUser, setInfoUser] = useState(null)

    useEffect(() => {
        (async () => {
            if (accessToken) {
                const res = await getUser(accessToken)
                setInfoUser(res)
            }
        })()
    }, [accessToken])


    return (
        <userContext.Provider value={{ infoUser, accessToken, setAccessToken, setInfoUser }}>
            {children}
        </userContext.Provider>
    )
}



// const getUser = async (token) => {
//     const userByToken = await axios.get(API_USER, { headers: { "Authorization": `Bearer ${token}` } })
//     const res = await userByToken.data.user
//     setCurrentUser(res)
// }
// (
//     async () => {
//         if (accessToken) {
//             const res = await getUser(accessToken)
//             return res
//         }
//     }
// )()
// , [accessToken])

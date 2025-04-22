import React , {createContext, useState, useEffect} from "react";
import { API_Paths } from "../utils/apiPaths";

export const UserContext = createContext()
export const ContextProvider = ({children}) => {
    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)
    // console.log(user)

    useEffect(() => {

        if(user){
            return
        }

        const token = localStorage.getItem('token')
        if(!token) {
            setLoading(false)
            return
        }

        const fetchUser = async () => {
            setLoading(true)
            try {
                const response = await fetch(API_Paths.USER.PROFILE, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })

                if(!response.ok) {
                    throw new Error('Failed to fetch user data')
                }

                const data = await response.json()
                setUser(data)
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchUser();

    }, [])

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token);
        setLoading(false);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        
    }


    return (
        <UserContext.Provider value={{user, loading, updateUser, handleLogout}}>
            {children}
        </UserContext.Provider>
    )
}
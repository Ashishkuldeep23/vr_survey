"use client"

import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";



export type typeUserData = {
    userId: string;
    username: string;
    id: string
}




interface GlobalContextInterface {

    userData: typeUserData,
    // setUserData: (dsat: typeUserData) => void
    setUserData: Function,
    fetchUserDataWithToken: Function,
    setIsLoading: Function
    isLoading: boolean,

}


const GlobalContext = createContext<GlobalContextInterface | null>(null);


export const useGlobalContext = () => useContext(GlobalContext)



const GlobalProvider = ({ children }: { children: React.ReactNode }) => {


    const [userData, setUserData] = useState<typeUserData>({
        userId: "",
        username: "",
        id: ""
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)


    const fetchUserDataWithToken = async (token: string) => {

        try {

            setIsLoading(true)

            const options: RequestInit = {
                credentials: 'include',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token })
            }

            const response = await fetch('/api/user', options)
            let result = await response.json();

            // console.log(result.data)

            if (result.success) {
                // setUserData(pre =>( {id : "" , name : ""}))
                // setUserData(result.data)

                setUserData({
                    id: result.data._id,
                    userId: result.data.userId,
                    username: result.data.username
                })

            }

            return result
        } catch (e: any) {
            toast.error(e.message)
        }
        finally {
            setIsLoading(false)
        }

    }


    // console.log(isLoading)

    return (

        <GlobalContext.Provider value={{
            userData,
            setUserData,
            fetchUserDataWithToken,
            isLoading,
            setIsLoading
        }}>
            {children}
        </GlobalContext.Provider >

    )
}

export default GlobalProvider

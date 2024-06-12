"use client"

import React, { createContext, useContext, useState } from "react";



export type typeUserData = {
    id: string;
    name: string;
}




interface GlobalContextInterface {

    userData: typeUserData,
    // setUserData: (dsat: typeUserData) => void
    setUserData: Function,

}


const GlobalContext = createContext<GlobalContextInterface | null>(null);


export const useGlobalContext = () => useContext(GlobalContext)





const GlobalProvider = ({ children }: { children: React.ReactNode }) => {


    const [userData, setUserData] = useState<typeUserData>({
        id: "", name: ""
    })


    return (

        <GlobalContext.Provider value={{
            userData,
            setUserData
        }}>
            {children}
        </GlobalContext.Provider >

    )
}

export default GlobalProvider

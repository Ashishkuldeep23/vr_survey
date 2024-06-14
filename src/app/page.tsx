'use client'

import LogInForm from "@/components/LogInForm";
import { useGlobalContext } from "@/context/contextProvider";
import { gettingTokenInCookieAndLocalHost } from "@/helper/helper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";


{/* <Image
src="/vercel.svg"
alt="Vercel Logo"
className="dark:invert"
width={100}
height={24}
priority
/> */}

// import { z } from "zod"



export default function Home() {

  const router = useRouter()
  const userData = useGlobalContext()?.userData
  const fetchUserDataWithToken = useGlobalContext()?.fetchUserDataWithToken


  useEffect(() => {

    // console.log(gettingTokenInCookieAndLocalHost())

    const userToken = gettingTokenInCookieAndLocalHost()

    if (!userToken) {
      router.replace("/")
    }
    else {

      // console.log(userData)

      if (userData && !userData.id) {
        // console.log("fetch data with token ----------।")

        fetchUserDataWithToken && fetchUserDataWithToken(userToken)
      }
    }

  }, [])



  return (
    <main className=" py-5 px-2 bg-gray-800/90 h-[100vh]">

      <div
        className=" flex justify-center items-center"
      >
        <LogInMainDiv />

      </div>

    </main>
  )
}





function LogInMainDiv() {
  return (

    <div
      className=" w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] mt-14 sm:mt-20 lg:mt-32 border border-white rounded-md p-2  "
    >

      <p className=" text-center font-semibold text-white">Log IN</p>

      <LogInForm />
    </div>
  )
}
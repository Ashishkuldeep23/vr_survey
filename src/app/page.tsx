import LogInForm from "@/components/LogInForm";
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
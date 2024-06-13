'use client'

import React, { useEffect } from 'react'

import { gettingTokenInCookieAndLocalHost } from "@/helper/helper"
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/context/contextProvider'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';

// import toast from 'react-hot-toast'

const Dashboard = () => {

    const router = useRouter()

    const userData = useGlobalContext()?.userData
    const fetchUserDataWithToken = useGlobalContext()?.fetchUserDataWithToken

    // console.log(userData);

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


    // // // md is going to breakpoint here -------->

    return (
        <section

            className=' bg-sky-100 min-h-[100vh] w-full py-3 md:py-7 px-2 sm:px-20 lg:px-36 flex gap-2 flex-col md:flex-row '
        >

            {/* nav bar -------> */}
            <div className=' bg-white shadow-md shadow-zinc-400 max-h-[85vh] rounded-xl  md:w-[25vh]  my-5 py-2 w-full flex justify-between gap-5 md:items-center  md:flex-col md:py-5  '>

                <div className=' w-[60%]  '>
                    <ul className=' flex justify-between items-center flex-wrap gap-2  md:gap-y-5 '>

                        {
                            [
                                {
                                    tabName: "Dashboard",
                                    action: "",
                                    style: "",

                                },
                                {
                                    tabName: "Add Member",
                                    action: "",
                                    style: "",

                                },
                                {
                                    tabName: "Add Location",
                                    action: "",
                                    style: "",

                                },
                                {
                                    tabName: "Add user",
                                    action: "",
                                    style: "",

                                },
                            ].map((ele) => {
                                return <li key={uuidv4()} className=' rounded bg-sky-300  text-lg font-semibold'>
                                    <button className='px-3'>{ele.tabName}</button>
                                </li>
                            })
                        }


                        {/* <li className=' rounded bg-blue-500 px-3 text-lg font-semibold'></li>
                        <li className='rounded bg-blue-500 px-3 text-lg font-semibold'></li>
                        <li className='rounded bg-blue-500 px-3 text-lg font-semibold'></li>
                        <li className='rounded bg-blue-500 px-3 text-lg font-semibold'></li> */}


                    </ul>

                </div>
                <div className=' w-[20%] flex flex-col  items-end md:mx-5 '>

                    <div className='rounded-full flex justify-center items-center flex-col'>

                        <Image
                            src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
                            className=' w-8 h-8 rounded-full border border-blue-500'
                            alt='user'
                            width={18}
                            height={18}
                            priority
                        />
                        <p className=' text-blue-900 text-xs'>{userData?.userId || "UserId"}</p>
                    </div>

                </div>
            </div>



            <div className='my-5'>


                {/* filter div here ---------------> */}
                <div className=' bg-white shadow-md shadow-zinc-400 rounded-xl p-5 flex justify-between'>

                    <div className=' w-[70%] flex justify-between flex-wrap gap-2'>
                        <p className=' border border-black px-2 py-1'>Search bar for member</p>

                        <select className='border border-black w-28' name="" id="">
                            {/* <option disabled defaultValue="Taluka" value=""></option> */}
                            <option value="1">Taluka</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                        </select>


                        <select className='border border-black w-28' name="" id="">
                            {/* <option disabled defaultValue={"Village"} value=""></option> */}
                            <option value="1">Village</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                        </select>


                        <select className='border border-black w-28' defaultValue={"Ward"} name="" id="">
                            {/* <option   value="">Ward</option> */}
                            <option value="1">Ward</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                        </select>

                    </div>




                    <div className=' w-[20%]'>

                        <button className=' border border-black px-2 py-1'>Search</button>

                    </div>

                </div>


                <div className='bg-sky-100 h-auto w-auto md:w-[70vw]  mt-10 p-5  rounded-xl  flex gap-8 flex-wrap  justify-center sm:justify-start '>

                    {
                        [null, null, null, null , null , null , null , null ].map(() => {
                            return <div key={uuidv4()} className=' w-[280px] h-[230px]  bg-white shadow-md shadow-zinc-400  border rounded-xl '>

                            </div>
                        })
                    }

                </div>

            </div>


        </section>
    )
}

export default Dashboard
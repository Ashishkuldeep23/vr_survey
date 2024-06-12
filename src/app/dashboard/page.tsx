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

    return (
        <section

            className=' bg-gray-300 min-h-[100vh] w-full py-5 md:py-10 px-2 sm:px-20 lg:px-36'
        >

            {/* nav bar -------> */}

            <div className=' my-5 w-full flex justify-between gap-5  '>

                <div className=' w-[60%]'>
                    <ul className=' flex justify-between items-center flex-wrap gap-2 '>
                        <li className=' rounded bg-blue-500 px-3 text-lg font-semibold'>Dashboard</li>
                        <li className='rounded bg-blue-500 px-3 text-lg font-semibold'>Add Member</li>
                        <li className='rounded bg-blue-500 px-3 text-lg font-semibold'>Add Location</li>
                        <li className='rounded bg-blue-500 px-3 text-lg font-semibold'>Add user</li>
                    </ul>

                </div>
                <div className=' w-[20%] flex flex-col  items-end '>

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


            {/* filter div here ---------------> */}
            <div className='my-10 bg-blue-200 rounded p-5 flex justify-between'>

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


            <div className=' my-10 p-5  rounded bg-blue-200 flex gap-4 flex-wrap  justify-center sm:justify-start '>

                {
                    [null, null, null, null].map(() => {
                        return <div key={uuidv4()} className=' w-[280px] h-[230px] bg-white border rounded'>

                        </div>
                    })
                }

            </div>



        </section>
    )
}

export default Dashboard
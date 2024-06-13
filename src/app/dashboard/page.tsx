'use client'

import React, { useEffect, useState } from 'react'

import { gettingTokenInCookieAndLocalHost } from "@/helper/helper"
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/context/contextProvider'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';
import { TbDeviceIpadHorizontalSearch } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { RiUserAddLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";



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


            <NavbarDiv />


            <FilterSectionWithCardDiv />


        </section>
    )
}

export default Dashboard



const NavbarDiv = () => {


    const userData = useGlobalContext()?.userData

    return (
        <div
            className=' bg-white shadow-md shadow-zinc-400 max-h-[85vh] rounded-xl  md:w-[25vh]  my-5 py-2 w-full flex justify-between gap-5 md:items-center  md:flex-col-reverse md:justify-end md:py-5  '
        >

            <div className=' w-[60%] md:mt-14 '>
                <ul className=' flex justify-center items-center flex-wrap gap-2  md:gap-y-5 '>

                    {
                        [
                            {
                                tabName: "Dashboard",
                                icon: <TbDeviceIpadHorizontalSearch className=' h-7 w-7' />,
                                action: "",
                                style: "",

                            },
                            {
                                tabName: "Add Member",
                                icon: <FiUsers className=' h-7 w-7' />,
                                action: "",
                                style: "",

                            },
                            {
                                tabName: "Add Location",
                                icon: <IoLocationOutline className=' h-7 w-7' />,
                                action: "",
                                style: "",

                            },
                            {
                                tabName: "Add user",
                                icon: <RiUserAddLine className=' h-7 w-7' />,
                                action: "",
                                style: "",

                            },
                        ].map((ele) => {
                            return <li key={uuidv4()} className=' rounded text-lg font-semibold  flex flex-col justify-center items-center'>

                                <span className=' h-8 w-8 '>{ele.icon || ""}</span>

                                <button className='text-[.65rem] leading-3'>{ele.tabName}</button>
                            </li>
                        })
                    }


                    {/* <li className=' rounded bg-blue-500 px-3 text-lg font-semibold'></li>
                            <li className='rounded bg-blue-500 px-3 text-lg font-semibold'></li>
                            <li className='rounded bg-blue-500 px-3 text-lg font-semibold'></li>
                            <li className='rounded bg-blue-500 px-3 text-lg font-semibold'></li> */}


                </ul>

            </div>

            <div className=' w-[20%] md:w-auto flex flex-col  items-end mx-2 md:mx-5  '>

                <div className='rounded-full flex justify-center items-center flex-col'>

                    {/* <Image
                                src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
                                className=' w-10 h-10 rounded-full border border-blue-500'
                                alt='user'
                                width={18}
                                height={18}
                                priority
                            /> */}

                    <CiUser className=' w-8 h-8 rounded-full border p-0.5 border-black ' />

                    <p className=' text-blue-900 text-base font-semibold'>{userData?.userId || "UserId"}</p>
                </div>

            </div>

        </div>

    )
}



const FilterSectionWithCardDiv = () => {

    type TypeFilterInputs = {
        searchText: string,
        taluka: string,
        village: string,
        ward: string
    }


    const [filterInputs, setFiterInputs] = useState({

        searchText: "",
        taluka: "",
        village: "",
        ward: ""
    })



    const filterInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setFiterInputs(pre => ({ ...pre, searchText: e.target.value }))

    }



    const filterSelectOnChange = (whichOne: keyof TypeFilterInputs, e: React.ChangeEvent<HTMLSelectElement>) => {


        console.log(e.target.value)


        setFiterInputs({ ...filterInputs, [whichOne]: e.target.value })


    }



    return (

        <div className='my-5'>

            {/* filter div here ---------------> */}
            <div
                className=' bg-sky-100 rounded-xl px-5 pt-5 flex flex-col items-start gap-3 justify-between'
            >

                <div className=' w-[100%] md:w-[80%] flex justify-between items-center flex-wrap gap-2'>

                    <div className=' bg-white w-[90%] sm:w-[70%] md:w-[40%] border border-black flex gap-2 items-center px-3  rounded-full text-xl py-0.5 '>

                        <span><CiSearch /></span>
                        <input
                            value={filterInputs.searchText}
                            onChange={(e) => { filterInputOnChange(e) }}
                            type="text"
                            className=' w-[85%]'
                            placeholder='Search bar for member'
                        />
                    </div>

                    <p ></p>

                    <select
                        className=' bg-white border rounded border-black w-28'
                        name=""
                        id=""
                        onChange={(e) => filterSelectOnChange("taluka", e)}
                        value={filterInputs.taluka}
                    >
                        {/* <option disabled defaultValue="Taluka" value=""></option> */}
                        <option value="Taluka">Taluka</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>


                    <select
                        className=' bg-white border rounded border-black w-28'
                        name=""
                        id=""
                        onChange={(e) => filterSelectOnChange('village', e)}
                        value={filterInputs.village}
                    >
                        {/* <option disabled defaultValue={"Village"} value=""></option> */}
                        <option value="Village">Village</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                    </select>


                    <select
                        className=' bg-white border rounded border-black w-28'
                        defaultValue={"Ward"}
                        name=""
                        id=""
                        onChange={(e) => filterSelectOnChange('ward', e)}
                        value={filterInputs.ward}
                    >
                        {/* <option   value="">Ward</option> */}
                        <option value="Ward">Ward</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                    </select>

                </div>


                <div className=' w-full flex '>
                    <button className=' ml-auto md:ml-[40vh] bg-white border border-black px-7 py-1 rounded-full'>Search</button>
                </div>

            </div>


            {
                filterInputs.searchText || filterInputs.taluka || filterInputs.village || filterInputs.ward

                    ?

                    <div className=' md:m-14 w-auto md:w-[50vw] mt-5 p-5 bg-white flex  justify-center items-center flex-col rounded-xl shadow-md shadow-zinc-400  '>

                        <p className=' flex flex-wrap gap-2'>
                            <span>Filtered by :- </span>
                            {
                                filterInputs.searchText
                                &&
                                <span>Text : {filterInputs.searchText}, </span>
                            }



                            {
                                filterInputs.taluka
                                &&
                                <span> Taluka : {filterInputs.taluka}, </span>
                            }


                            {
                                filterInputs.village
                                &&
                                <span> Village : {filterInputs.village}, </span>
                            }


                            {

                                filterInputs.ward
                                &&
                                <span> Ward : {filterInputs.ward}</span>
                            }



                        </p>


                        <div
                            className=' w-[100%]'
                        >
                            <p
                                className='my-2 py-1 px-2 border-b border-black w-full flex justify-between flex-wrap gap-1'
                            >

                                <span className=' w-32 overflow-x-auto '>Member Name</span>
                                <span className=' w-32 overflow-x-auto '>Talukaaaaaa</span>
                                <span className=' w-32 overflow-x-auto '>Village</span>
                                <span className=' w-32 overflow-x-auto '>Ward</span>
                                <span className=' w-32 overflow-x-auto '>View Details</span>

                            </p>



                            <p
                                className='my-2 py-1 px-2 border-b border-black w-full flex justify-between flex-wrap gap-1'
                            >

                                <span className=' w-32 overflow-x-auto '>Member Name</span>
                                <span className=' w-32 overflow-x-auto '>Talukaaaaaa</span>
                                <span className=' w-32 overflow-x-auto '>Village</span>
                                <span className=' w-32 overflow-x-auto '>Ward</span>
                                <span className=' w-32 overflow-x-auto '>View Details</span>

                            </p>



                            <p
                                className='my-2 py-1 px-2 border-b border-black w-full flex justify-between flex-wrap gap-1'
                            >

                                <span className=' w-32 overflow-x-auto '>Member Name</span>
                                <span className=' w-32 overflow-x-auto '>Talukaaaaaa</span>
                                <span className=' w-32 overflow-x-auto '>Village</span>
                                <span className=' w-32 overflow-x-auto '>Ward</span>
                                <span className=' w-32 overflow-x-auto '>View Details</span>

                            </p>



                            <p
                                className='my-2 py-1 px-2 border-b border-black w-full flex justify-between flex-wrap gap-1'
                            >

                                <span className=' w-32 overflow-x-auto '>Member Name</span>
                                <span className=' w-32 overflow-x-auto '>Talukaaaaaa</span>
                                <span className=' w-32 overflow-x-auto '>Village</span>
                                <span className=' w-32 overflow-x-auto '>Ward</span>
                                <span className=' w-32 overflow-x-auto '>View Details</span>

                            </p>



                        </div>



                    </div>

                    :


                    <div
                        className='bg-sky-100 h-auto w-auto md:w-[65vw] mt-5 p-5 rounded-xl flex gap-10 flex-wrap justify-center flex-col-reverse lg:flex-row items-center lg:items-start '
                    >


                        <div className=' flex  flex-col gap-5'>

                            {
                                [null, null, null].map(() => {
                                    return <div
                                        key={uuidv4()}
                                        className=' p-4 w-[85vw] md:w-[530px]  bg-white shadow-md shadow-zinc-400 border rounded-xl '
                                    >

                                        <p className=' font-semibold'>Taluka</p>

                                        <div className=' mt-4 px-5 flex items-center gap-5'>


                                            {
                                                [
                                                    {
                                                        name: "Panhala"
                                                    },
                                                    {
                                                        name: "Shahuwadi"
                                                    },
                                                    {
                                                        name: "Shirala"
                                                    },
                                                ].map((e) => {
                                                    return <div
                                                        key={uuidv4()}
                                                        className=' w-20 flex flex-col items-center'
                                                    >
                                                        <span className=' px-4 py-2 text-2xl rounded-full bg-gray-300'>{e.name[0].toString()}</span>
                                                        <p className=' text-sm mt-2 text-center'>{e.name}</p>
                                                    </div>
                                                })
                                            }

                                        </div>



                                    </div>
                                })
                            }
                        </div>


                        <div>

                            <div className=' shadow-md shadow-zinc-400  my-4 px-4 py-2 rounded-lg bg-white'>
                                <span>125</span>
                                <span> Total members</span>
                            </div>

                            <div className='shadow-md shadow-zinc-400  my-4 px-4 py-2 rounded-lg bg-white'>
                                <span>125</span>
                                <span> Total members</span>
                            </div>

                            <div className='shadow-md shadow-zinc-400  my-4 px-4 py-2 rounded-lg bg-white'>
                                <span>125</span>
                                <span> Total members</span>
                            </div>


                        </div>


                    </div>
            }






        </div >
    )
}

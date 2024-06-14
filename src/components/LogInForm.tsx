"use client"

// import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGlobalContext } from "@/context/contextProvider"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import Loader from "./loader"
import { gettingTokenInCookieAndLocalHost } from "@/helper/helper"

const formSchema = z.object({
    // username: z.string().min(2, {
    //     message: "Username must be at least 2 characters.",
    // }),
    userId: z.string().min(4, { message: "UserId must be at least 4 characters." }).toLowerCase(),
    password: z.string().min(4, { message: "UserId must be at least 4 characters." })
})


export default function LogInForm() {
    // ...

    const router = useRouter()

    const setUserData = useGlobalContext()?.setUserData
    const isLoading = useGlobalContext()?.isLoading
    const setIsLoading = useGlobalContext()?.setIsLoading

    const [errMsg, setErrMsg] = useState<string>("")


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // username: "",
            userId: "",
            password: ""
        }
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {

        // console.log(values)


        if (!values.userId || !values.password) {
            return toast.error("Mandatory fileds are missing.")
        }

        // // // Back to normal all states ------->
        setErrMsg("")
        setIsLoading && setIsLoading(true)

        try {

            let result = await logInUser(values)

            console.log({ result })

            if (result && result.success && result.data && setUserData) {
                // alert("Now move to dashboard")

                // // // Set here cookie -------->

                // document.cookie = `token=${result.data.token};`;

                localStorage.setItem("surveyToken", result.data.token)

                setUserData(result.data)

                router.push("/dashboard")
            }


            if (!result.success) {
                setErrMsg(result.message)
            }


        } catch (err) {
            toast.error(JSON.stringify(err))

        } finally {
            setIsLoading && setIsLoading(false)
        }



    }


    async function logInUser(bodyData: z.infer<typeof formSchema>) {


        const options: RequestInit = {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData)
        }

        const response = await fetch('/api/user/login', options)
        let data = await response.json();
        return data
    }


    useEffect(() => {
        const userToken = gettingTokenInCookieAndLocalHost()
        if (userToken) {
            router.replace("/dashboard")
        }
    }, [])

    // console.log(isLoading)



    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 relative"
            >

                <Loader isLoading={isLoading || false} />

                <FormField
                    control={form.control}
                    name='userId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>User Id</FormLabel>
                            <FormControl>
                                <Input placeholder="User Id" className=" bg-black/20 text-white" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" className=" bg-black/20 text-white" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {
                    errMsg
                    &&
                    <p className=" text-red-400 font-semibold ml-1">{errMsg}</p>
                }

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

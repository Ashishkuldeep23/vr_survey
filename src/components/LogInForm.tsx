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


        let result = await logInUser(values)

        // console.log({ result })


        if (result && result.success && result.data && setUserData) {
            // alert("Now move to dashboard")

            setUserData(result.data)

            router.push("/dashboard")

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




    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >
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


                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

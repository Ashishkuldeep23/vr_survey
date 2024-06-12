
import User from '../../../../models/userModel';
// import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { dbConnect } from "../../../../DB/dbConfig";




dbConnect()

export async function POST(req: NextRequest) {

    try {

        // console.log("Called ----------->")

        // console.log(req)

        const reqBody = await req.json()

        // console.log(reqBody)

        const { userId, password } = reqBody

        // // validation here --->

        const getUser = await User.findOne({ userId })

        // console.log(getUser)

        if (!getUser) {
            return NextResponse.json({ success: false, message: 'User not exist with given mail' }, { status: 404 })
        }


        // // // Steps her we should do ----->
        // // // Check password is correct or not (By comparing)
        // // // set JWT and create a token and store it in res.header 


        // // // validate pass here ----->
        // const validPass = await bcryptjs.compare(password, getUser.password)

        // if (!validPass) {
        //     return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 400 })
        // }



        // // // Match pass here ------------->
        if (password !== getUser.password) {
            return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 400 })
        }


        const tokenData = { id: getUser._id, userId: getUser.userId }

        const token = await jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!,
            { expiresIn: '10d' }
        )


        const response = NextResponse.json({
            success: true,
            message: "LogIn Successful.",
            data: { userId: getUser.userId, id: getUser._id, token: token, username: getUser.username }
        })


        response.cookies.set(
            "token",
            token,
            { httpOnly: true }
        )

        return response

        // return NextResponse.json({ success: true, data: createUser, message: "User created." }, { status: 201 })


    } catch (error: any) {
        console.log("Error!")
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}




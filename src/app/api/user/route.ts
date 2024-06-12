

import User from '../../../models/userModel';
// import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { dbConnect } from "../../../DB/dbConfig"


dbConnect()

export async function POST(req: NextRequest) {


    try {

        const reqBody = await req.json()

        // console.log(reqBody)

        const { token } = reqBody

        if (!token) return NextResponse.json({ success: false, message: 'Token is not given' }, { status: 400 })

        let verifyToken: any;

        try {
            verifyToken = await jwt.verify(token, `${process.env.TOKEN_SECRET}`)

            // console.log(verifyToken)
        } catch (err: any) {
            // console.log(err.message)

            if (err.message === "jwt must be provided") {

                return NextResponse.json({ success: false, message: `${err.message} | Login again please` }, { status: 403 })
            }

            if (err.message === "jwt expired") {

                return NextResponse.json({ success: false, message: `${err.message} | Login again please` }, { status: 403 })
            }

            return NextResponse.json({ success: false, message: `${err.message} | Login again please` }, { status: 403 })

        }


        if (Object.keys(verifyToken).length > 0) {

            let userId = verifyToken.id

            let findUser = await User.findById(userId)

            if (!findUser) {

                return NextResponse.json({ success: false, message: 'Data in token is bad or inomplete)' }, { status: 404 })
            }


            return NextResponse.json({
                success: true,
                message: "LogIn Successful.",
                data: findUser
            })


        } else {

            return NextResponse.json({ success: false, message: 'Payload is empty , LogIn again' }, { status: 401 })
        }



    } catch (error: any) {
        console.log("Error!")
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}

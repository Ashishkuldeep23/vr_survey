import mongoose from "mongoose";

type ConnectionObj = {
    isConnected?: number
}

const checkConnection: ConnectionObj = {}





export async function dbConnect() {


    if (checkConnection.isConnected) {
        console.log("Already connected to database.")
        return
    }

    try {

        let db = await mongoose.connect(process.env.MONGO_URL!)

        checkConnection.isConnected = db.connections[0].readyState


        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log('DB connected successfully')
        })

        connection.on("error", (err) => {
            console.log("Error in db connection.")
            console.log(err)
            process.exit()
        })

    } catch (error: any) {
        console.log("Something goes wrong!")
        console.log(error)
        process.exit()

        // return NextResponse.json({ success: false, message: `${error.message} (Server Error)` }, { status: 500 })

    }


}


import mongoose from "mongoose";


const wardSchema = new mongoose.Schema({


    number: {
        type: Number,
        required: [true, "Please provide a ward no."],
    },
    village: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "villages"
    }



}, { timestamps: true })



// // // Creating models in next js by userSchema --->

const User = mongoose.models.wards || mongoose.model("wards", wardSchema);

export default User


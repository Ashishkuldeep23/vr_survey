import mongoose from "mongoose";


const talukaSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide a username"],
        trim: true
    },
    district: {
        type: String,
        required: [true, "Please provide a username"],
        trim: true
    },


}, { timestamps: true })



// // // Creating models in next js by userSchema --->

const User = mongoose.models.talukas || mongoose.model("taluka", talukaSchema);

export default User


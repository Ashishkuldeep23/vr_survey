import mongoose from "mongoose";


const villageSchema = new mongoose.Schema({

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
    taluka: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "talukas"
    }


}, { timestamps: true })



// // // Creating models in next js by userSchema --->

const User = mongoose.models.villages || mongoose.model("villages", villageSchema);

export default User


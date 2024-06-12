import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    userId: {
        type: String,
        required: [true, "Please provide a username"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        trim: true
    },

}, { timestamps: true })



// // // Creating models in next js by userSchema --->

const User = mongoose.models.users || mongoose.model("users", UserSchema);

export default User


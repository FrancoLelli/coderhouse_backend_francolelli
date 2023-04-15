import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
    }
});

const userModel = mongoose.model("user", userSchema);
export default userModel;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required "]
    },

    email: {
        type: String,
        required: [true, "email is required "],
        unique: [true, "email is already taken "]
    },

    password: {
        type: String,
        required: [true, "password is required "],
        minLength: [6, "password Length should be greter that 6 charracter "]
    },

    address: {
        type: String,
        required: [true, "address is required "],
    },

    city: {
        type: String,
        required: [true, "city is required "],
    },

    country: {
        type: String,
        required: [true, "country is required "],
    },
    phone: {
        type: Number,
        required: [true, "phone number is required "],
    },

},{ timeseries: true })



const userModel = mongoose.model("User",userSchema)

export default userModel;
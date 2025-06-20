import mongoose from "mongoose";

const conntectDB = async () => {
    try {
         await mongoose.connect(process.env.URL)
        console.log("database connected succefully")
    } catch (error) {
        console.log("mongoDb", error)
    }
}


export default conntectDB

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken"

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

}, { timestamps: true })




//hash function
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)

})

//compare function
userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password)
}


// JWT token


userSchema.methods.generateToken = function () {
  return JWT.sign(
    { _id: this._id },                    
    process.env.JWT_SECRET,             
    { expiresIn: "7d" }                  
  );
};



const userModel = mongoose.model("User", userSchema)

export default userModel;
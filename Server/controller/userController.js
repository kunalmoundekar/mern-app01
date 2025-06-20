import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {

  try {
    const { name, email, password, address, city, country, phone } = req.body
    // validation
    if (!name || !email || !password || !address || !city || !country || !phone) {
      return res.status(500).send({
        success: false,
        message: "plese provide all filed"
      })
    }
    const existingUser = await userModel.findOne({ email })
    
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "user is alredy with register with this "
      })
    }

    const user = await userModel.create({
      name,
      email,
      password,
      address,
      city,
      country,
      phone
    })

    res.status(201).send({
      success: true,
      message: "Register  successfully",
      user
    })
  }

  catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Server error ",
      error: error.message
    })

  }

}



export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });
    }

   

    // check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    
    // if (user.password !== password) {
    //   return res.status(401).send({
    //     success: false,
    //     message: "Invalid password",
    //   });
    // }

    // success
    res.status(200).send({
      success: true,
      message: "Login successful",
      user,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


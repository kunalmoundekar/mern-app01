import userModel from "../models/userModel.js";

// ================= Register =================

export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, city, country, phone } = req.body;

    if (!name || !email || !password || !address || !city || !country || !phone) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields"
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already registered with this email"
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
      address,
      city,
      country,
      phone
    });

    res.status(201).send({
      success: true,
      message: "Registered successfully",
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// ================= Login =================
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password"
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials"
      });
    }

    // ✅ Generate token
    const token = user.generateToken();

    res.status(200)
    .cookie("token",token,{        // error "message": "unAuthraised User"
      secure : process.env.NODE_ENV == "development" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax", 
      httpOnly: process.env.NODE_ENV == "development" ? true : false,
      expires: new Date(Date.now()+2*24*60*60*1000)

    })
    
    .send({
      success: true,
      message: "Login successful",
      user,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// ================= Profile =================
export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id) ;

    res.status(200).send({
      success: true,
      message: "Profile fetched successfully",
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// ================= LogOut =================
export const logOutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      secure: process.env.NODE_ENV === "development" ? true : false,
      httpOnly: process.env.NODE_ENV === "development" ? true : false,
    });

    res.status(200).send({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
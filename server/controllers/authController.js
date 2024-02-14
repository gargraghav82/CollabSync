import { user } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email }).select('+password');
    
    if (existingUser == undefined) {
      return res.status(401).json({
        message: "wrong email or password",
      });
    }
    const isMatch = await existingUser.comparePassword(password)
    if (!isMatch) {
      return res.status(402).json({
        message: "wrong email or password",
      });
    }
    sendToken(res , existingUser , `Welcome ${existingUser.name}` , 200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        message : "Interval Server Error"
    })
  }
};

export const userRegister = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const oldUser = await user.findOne({ email });
    
    if (oldUser)
      return res.status(401).json({
        message: "User already exist",
      });

    const newUser = await user({
      name,
      email,
      password,
    });

    await newUser.save();
    sendToken(res , newUser , `Welcome ${name}` , 200);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Interval Server Error");
  }
};

export const loadUser = async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    success : true , 
    user
  });
};

export const userLogOut = async (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: "none",
      httpOnly: true,
      secure: true,
    })
    .json({
      success: true,
      message: "Logged Out successfully",
    });
};

import { user as User } from "../models/User.js";
import Jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try{
    const { token } = req.cookies;

  if (!token){
    const error = new Error('not logged in');
    error.status = 401; // Set an appropriate status code
    return next(error);
  }

  const decoded = Jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  
  } catch(err){
    console.log(err);
    const error = new Error('interval server error');
    error.status = 500; // Set an appropriate status code
    return next(error);
  }

  next();
};
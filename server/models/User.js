import mongoose , {Schema} from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User = new Schema({
    name : {
        type : String , 
        required : [true , "Please Enter Your Name"]
    } , 
    email : {
        type : String , 
        unique : true , 
        required : [true , "Please Enter Your Email"] ,
        validator : validator.isEmail
    } , 
    password : {
        type : String , 
        required : [true , "Please Enter Your Password"] ,
        select : false
    } , 
    resetPasswordToken : String , 
    resetPasswordTokenExpire : String
});

User.pre("save" , async function(next){
    if(!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password , 10);
    next();
})

User.methods.comparePassword = async function(password){
    const isMatch = await bcrypt.compare(password , this.password);
    return isMatch;
}

User.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
  };

export const user = mongoose.model("User", User);
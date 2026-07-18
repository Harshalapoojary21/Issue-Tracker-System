import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Register User

export const registerUser = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;


    // Check existing user

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }


    // Hash password

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });


    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};



// Login User

export const loginUser = async (req,res)=>{

  try{

    const {email,password}=req.body;


    const user = await User.findOne({email});


    if(!user){

      return res.status(404).json({
        success:false,
        message:"User not found"
      });

    }



    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );


    if(!isPasswordMatch){

      return res.status(401).json({
        success:false,
        message:"Invalid password"
      });

    }



    const token = jwt.sign(
      {
        id:user._id,
        role:user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn:"1d"
      }
    );



    res.status(200).json({

      success:true,

      message:"Login Successful",

      token,

      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
      }

    });



  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};
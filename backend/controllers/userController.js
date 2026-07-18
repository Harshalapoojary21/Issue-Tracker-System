import User from "../models/User.js";


// Get all users (Admin)

export const getUsers = async(req,res)=>{

    try{

        const users = await User.find({
            role:"user"
        })
        .select("-password");


        res.status(200).json({

            success:true,

            data:users

        });


    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
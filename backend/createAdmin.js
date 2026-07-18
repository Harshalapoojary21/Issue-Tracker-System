import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";


dotenv.config();


mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    console.log("Database connected");

    createAdmin();

})
.catch((error)=>{

    console.log(error);

});



const createAdmin = async()=>{

    try{


        const existingUser = await User.findOne({
            email:"admin@gmail.com"
        });


        if(existingUser){

            console.log("Admin already exists");

            process.exit();

        }



        const hashedPassword =
        await bcrypt.hash(
            "123456",
            10
        );



        const admin = await User.create({

            name:"Admin",

            email:"admin@gmail.com",

            password:hashedPassword,

            role:"admin"

        });



        console.log(
            "Admin created:",
            admin.email
        );


        process.exit();



    }catch(error){

        console.log(error);

        process.exit();

    }

};
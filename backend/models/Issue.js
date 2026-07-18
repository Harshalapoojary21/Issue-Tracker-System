import mongoose from "mongoose";


const issueSchema = new mongoose.Schema(

{

    title:{
        type:String,
        required:true,
        trim:true
    },


    description:{
        type:String,
        required:true
    },


    priority:{
        type:String,
        enum:[
            "Low",
            "Medium",
            "High"
        ],
        default:"Medium"
    },


    status:{
        type:String,
        enum:[
            "Open",
            "In Progress",
            "Closed"
        ],
        default:"Open"
    },


    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },


    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }


},
{
    timestamps:true
}


);


export default mongoose.model(
    "Issue",
    issueSchema
);
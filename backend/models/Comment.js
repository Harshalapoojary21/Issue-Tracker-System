import mongoose from "mongoose";


const commentSchema = new mongoose.Schema(
{

    issueId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Issue",
        required:true
    },


    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    comment:{
        type:String,
        required:true,
        trim:true
    }


},
{
    timestamps:true
}

);


export default mongoose.model(
    "Comment",
    commentSchema
);
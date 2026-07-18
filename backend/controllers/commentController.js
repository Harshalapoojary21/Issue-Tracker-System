import Comment from "../models/Comment.js";



// Add Comment

export const addComment = async(req,res)=>{


    try{


        const comment = await Comment.create({

            issueId:req.params.issueId,

            userId:req.user._id,

            comment:req.body.comment

        });



        res.status(201).json({

            success:true,

            message:"Comment added",

            data:comment

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// Get Comments

export const getComments = async(req,res)=>{


    try{


        const comments = await Comment.find({

            issueId:req.params.issueId

        })

        .populate(
            "userId",
            "name email"
        )

        .sort({
            createdAt:1
        });



        res.status(200).json({

            success:true,

            data:comments

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};
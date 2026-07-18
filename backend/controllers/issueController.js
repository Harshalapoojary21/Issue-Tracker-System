import Issue from "../models/Issue.js";


// CREATE ISSUE (Admin)

export const createIssue = async (req,res)=>{

    try{

        const issue = await Issue.create({
  ...req.body,
  createdBy: req.user._id,
});

const populatedIssue = await Issue.findById(issue._id)
  .populate("assignedTo", "name email")
  .populate("createdBy", "name email");


        res.status(201).json({

            success:true,
            message:"Issue created successfully",
            data:populatedIssue
        });


    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};




// GET ALL ISSUES

export const getIssues = async(req,res)=>{

    try{


        let issues;


        // Admin sees all issues
        // User sees assigned issues


        if(req.user.role === "admin"){

            issues = await Issue.find()

            .populate("assignedTo","name email")

            .populate("createdBy","name email")

            .sort({
                createdAt:-1
            });


        }else{


            issues = await Issue.find({
  assignedTo: req.user._id,
})
  .populate("assignedTo", "name email")
  .populate("createdBy", "name email")
  .sort({
    createdAt: -1,
  });


        }



        res.status(200).json({

            success:true,

            count:issues.length,

            data:issues

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};





// GET SINGLE ISSUE


export const getIssueById = async(req,res)=>{


    try{


        const issue = await Issue.findById(
            req.params.id
        )

        .populate("assignedTo","name email")

        .populate("createdBy","name email");



        if(!issue){

            return res.status(404).json({

                success:false,

                message:"Issue not found"

            });

        }



        res.status(200).json({

            success:true,

            data:issue

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });

    }


};


// UPDATE ISSUE

export const updateIssue = async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo } = req.body;

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        priority,
        status,
        assignedTo,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.json({
      success: true,
      data: issue,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// DELETE ISSUE


export const deleteIssue = async(req,res)=>{


    try{


        const issue = await Issue.findByIdAndDelete(
            req.params.id
        );


        if(!issue){

            return res.status(404).json({

                success:false,

                message:"Issue not found"

            });

        }



        res.status(200).json({

            success:true,

            message:"Issue deleted"

        });



    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }


};

// Assign Issue To User


export const assignIssue = async(req,res)=>{

    try{


        const {
            userId
        } = req.body;



        const issue = await Issue.findByIdAndUpdate(
  req.params.id,
  { assignedTo: userId },
  { new: true }
)
  .populate("assignedTo", "name email")
  .populate("createdBy", "name email");



        if(!issue){

            return res.status(404).json({

                success:false,

                message:"Issue not found"

            });

        }



        res.status(200).json({

            success:true,

            message:"Issue assigned successfully",

            data:issue

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};
import Issue from "../models/Issue.js";


export const checkIssueOwner = async (req, res, next) => {

    try {

        const issue = await Issue.findById(
            req.params.id
        );


        if (!issue) {

            return res.status(404).json({
                success: false,
                message: "Issue not found"
            });

        }


        // Admin has full access

        if (req.user.role === "admin") {
            return next();
        }



        // User can update only assigned issues

        if (
            issue.assignedTo &&
            issue.assignedTo.toString() === req.user._id.toString()
        ) {

            return next();

        }



        return res.status(403).json({
            success:false,
            message:"You are not allowed to modify this issue"
        });



    } catch(error) {


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
import Issue from "../models/Issue.js";


export const getDashboardStats = async (req, res) => {

    try {

        let filter = {};


        // If normal user
        // only assigned issues

        if (req.user.role === "user") {

            filter.assignedTo = req.user._id;

        }



        const total = await Issue.countDocuments(filter);



        const open = await Issue.countDocuments({
            ...filter,
            status:"Open"
        });



        const inProgress = await Issue.countDocuments({
            ...filter,
            status:"In Progress"
        });



        const closed = await Issue.countDocuments({
            ...filter,
            status:"Closed"
        });



        res.status(200).json({

            success:true,

            data:{
                total,
                open,
                inProgress,
                closed
            }

        });



    } catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};
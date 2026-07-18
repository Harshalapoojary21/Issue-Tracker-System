import express from "express";

import {

createIssue,
getIssues,
getIssueById,
updateIssue,
deleteIssue,
assignIssue

} from "../controllers/issueController.js";


import {
protect
} from "../middleware/authMiddleware.js";


import {
adminOnly
} from "../middleware/roleMiddleware.js";

import {
    checkIssueOwner
} from "../middleware/issuePermission.js";

const router = express.Router();



// Admin create

router.post(
"/",
protect,
adminOnly,
createIssue
);



// Get issues

router.get(
"/",
protect,
getIssues
);



// Get single issue

router.get(
"/:id",
protect,
getIssueById
);



// Delete issue

router.delete(
"/:id",
protect,
adminOnly,
deleteIssue
);

// assign issue to user
router.put(
"/:id/assign",
protect,
adminOnly,
assignIssue
);

router.put(
    "/:id",
    protect,
    checkIssueOwner,
    updateIssue
);
export default router;
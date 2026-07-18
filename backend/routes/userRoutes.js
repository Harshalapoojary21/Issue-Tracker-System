import express from "express";

import {
    getUsers
} from "../controllers/userController.js";


import {
    protect
} from "../middleware/authMiddleware.js";


import {
    adminOnly
} from "../middleware/roleMiddleware.js";


const router = express.Router();



router.get(
"/",
protect,
adminOnly,
getUsers
);



export default router;
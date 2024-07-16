import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router()

router.get("/conversations", protectRoute, getUsersForSidebar);
router.post("/:id", protectRoute, sendMessage)
router.post("/send/:id", protectRoute, getMessages)

export default router;
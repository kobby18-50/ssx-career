
import { createAgents, getAllAgents, getAgent } from "../controllers/recievingAgents.js";
import { authenticatedUser, authorizePermissions } from "../middleware/authentication.js";
import express from "express";

const router = express.Router();

router.get('/', getAllAgents)

router.get('/:id', getAgent)

router.post('/', [authenticatedUser, authorizePermissions('admin')],  createAgents)



export default router
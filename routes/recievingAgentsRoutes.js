
import { createAgents, getAllAgents, getAgent,getAllMyAgents } from "../controllers/recievingAgents.js";
import { authenticatedUser, authorizePermissions } from "../middleware/authentication.js";
import express from "express";

const router = express.Router();

router.get('/', getAllAgents)

router.get('/myagents', [authenticatedUser, authorizePermissions('admin')], getAllMyAgents)

router.get('/:id', getAgent)

router.post('/', [authenticatedUser, authorizePermissions('admin')],  createAgents)



export default router
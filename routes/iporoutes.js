
import express from "express";
import {createIPO, getallIPO, getAllmyIPO} from '../controllers/ipoController.js'
import { authenticatedUser } from "../middleware/authentication.js";

const router = express.Router();

router.post('/', authenticatedUser, createIPO)

router.get('/', getallIPO)

router.get('/myIPOs', authenticatedUser,  getAllmyIPO)


export default router
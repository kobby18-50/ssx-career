import express from "express";
import {forgotPassword, login, logout, registerAdmin, registerUser, resetPassword, verifyEmail,showMe} from '../controllers/authController.js'
import { authenticatedUser } from "../middleware/authentication.js";

const router = express.Router();

router.post('/registerUser', registerUser)

router.post('/registerAdmin', registerAdmin)

router.post('/verifyEmail', verifyEmail)

router.post('/forgotPassword', forgotPassword)

router.post('/resetPassword', resetPassword)

router.post('/login', login)

router.get('/logout', logout)

router.get('/showMe', authenticatedUser, showMe)

export default router
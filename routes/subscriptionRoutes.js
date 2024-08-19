import { subscribetoIPO, mysubscriptions } from '../controllers/subscriptionController.js'
import express from 'express'
import { authenticatedUser } from '../middleware/authentication.js'

const router = express.Router()


router.post('/', authenticatedUser, subscribetoIPO)

router.get('/', authenticatedUser, mysubscriptions)

export default router
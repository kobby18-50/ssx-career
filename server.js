import express from "express"
import 'express-async-errors'
import dotenv from "dotenv"
import connectdb from "./db/connect.js"
dotenv.config()

// middleware imports
import notFoundMiddleWare from './middleware/not-found.js'
import errorHandlerMiddleware from "./middleware/error-handler.js"
import morgan from "morgan"

const app = express()


// testing route
app.get('/', (req,res) => {
    res.send('welcome to ssx server')
})


// routes imports
import authRoutes from './routes/authRoutes.js'
import iporoutes from './routes/iporoutes.js'
import recievingAgentsRoutes from './routes/recievingAgentsRoutes.js'
import subscriptionRoutes from './routes/subscriptionRoutes.js'


// 
app.use(morgan('tiny'))

// express.json
app.use(express.json())


// routes 
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/ipo', iporoutes)
app.use('/api/v1/agents', recievingAgentsRoutes)
app.use('/api/v1/subscription', subscriptionRoutes)



// middleware
app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 4000

const start = async () =>{
    try {
        await connectdb(process.env.MONGO_URI)
        app.listen(PORT, ()=> {
            console.log(`server running on port ${PORT}`)
        })

    } catch (error) {
        console.log('Something went wrong', error)
    }
}


start()

// errors imports
import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors/index.js"
import IPO from "../models/IPO.js"
import Subscriptions from "../models/Subscriptions.js"

const subscribetoIPO = async (req,res) => {
    const { ipo, subscribedShares} = req.body

    // check for empty fields
    if(!ipo || !subscribedShares ){
        throw new BadRequestError('Some values are missing')
    }

    // check if ipo exists
    const checkifipoexits = await IPO.findOne({ _id: ipo })

    if(!checkifipoexits){
        throw new BadRequestError('IPO does not exist')
    }

    // check if ipo is already subscribed
    const checkifsubscribed = await Subscriptions.findOne({industry : req.user.industryId})

    if(checkifsubscribed){
        throw new BadRequestError('Already subscribed to this IPO')
    }

    // check if there are shares available
    const checkifsharesavailable = await IPO.findOne({ _id: ipo, totalAvailableShares : { $gte : subscribedShares}})

    if(!checkifsharesavailable){
        throw new BadRequestError('Not enough shares available')
    }


     // check if ipo belongs to user
    //  const checkifuserbelongstoipo = await IPO.findOne({createdBy : req.user.industyId})

    //  if(checkifuserbelongstoipo){
    //      throw new BadRequestError('Cannot subscribe to your own IPO')
    //  }

    //  console.log(checkifuserbelongstoipo, 'ipo exits and belongs to user')


    // assigning institution
    req.body.industry = req.user.industryId


    const subscription = await Subscriptions.create(req.body)

    res.status(StatusCodes.CREATED).json({subscription})
}


const mysubscriptions = async (req,res) => {
    const subscriptions = await Subscriptions.find({industry : req.user.industryId})    
    res.status(StatusCodes.OK).json({subscriptions, count : subscriptions.length})
}

export {
    subscribetoIPO,
    mysubscriptions
}
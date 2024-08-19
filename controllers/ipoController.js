// errors imports
import { BadRequestError, UnAuthorizedError } from "../errors/index.js";
import checkValidDate from "../utils/checkValidDate.js";

// model import
import IPO from "../models/IPO.js";
import { StatusCodes } from "http-status-codes";

const createIPO = async (req,res) => {
    const {ipoNumber, issuerName, issuerIndustry, sharePrice, minimumVolumePerInvestor, totalAvailableShares, issuanceType, issuanceStartDate, issuanceEndDate, recievingAgents} = req.body

    // check for empty fields
    if(!ipoNumber || !issuerName || !issuerIndustry || !sharePrice || !minimumVolumePerInvestor || !totalAvailableShares || !issuanceType || !issuanceStartDate || !issuanceEndDate || !recievingAgents){
        throw new BadRequestError('Some values are missing')
    }

    // assign value to createdBy

    req.body.createdBy = req.user.industryId

    // validate start and end date
    checkValidDate({startDate:issuanceStartDate, endDate:issuanceEndDate})

    // create IPO
    const ipo = await IPO.create(req.body)
   
    res.status(StatusCodes.CREATED).json({ipo})

}

const getallIPO = async (req,res) => {

    const currentDate = new Date()
    const ipo = await IPO.find({ issuanceEndDate : { $gte: currentDate } })
    res.status(StatusCodes.OK).json({ipo, count : ipo.length})
}

const getAllmyIPO = async (req,res) => {
    // getting ipo by institution id
    const ipo = await IPO.find({createdBy : req.user.industryId})

    // empty ipo
    if(!ipo){
        throw new BadRequestError('No IPOs found')
    }

    res.status(StatusCodes.OK).json({ipo, count : ipo.length})
}

export {
    createIPO,
    getallIPO,
    getAllmyIPO
}
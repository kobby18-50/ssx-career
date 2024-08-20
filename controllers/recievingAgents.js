// errors imports
import { BadRequestError } from "../errors/index.js"

// model imports
import RecievingAgents from "../models/RecievingAgents.js"

// package import
import { StatusCodes } from "http-status-codes"
const getAllAgents = async (req,res) => {

    const agents = await RecievingAgents.find({})

    res.status(StatusCodes.OK).json({agents, count : agents.length})
}

const getAllMyAgents = async (req,res) => {

    const agents = await RecievingAgents.find({createdBy:req.user.userId})

    res.status(StatusCodes.OK).json({agents, count : agents.length})
}

const getAgent = async (req,res) => {
    const { id: agentId } = req.params

    const agent = await RecievingAgents.findOne({ _id: agentId })

    if(!agent){
        throw new BadRequestError('Agent not found')
    }

    res.status(StatusCodes.OK).json({agent})
}

const createAgents = async (req,res) => {
    const {name, email} = req.body

    // check for empty fields
    if(!name || !email ){
        throw new BadRequestError('Some values are missing')
    }

    // assign value to createdBy
    req.body.createdBy = req.user.industryId

    // create agent
    const agent = await RecievingAgents.create(req.body)

    console.log(agent)
    res.status(StatusCodes.CREATED).json({agent})
}

export {
    getAllAgents,
    getAllMyAgents,
    getAgent,
    createAgents
}
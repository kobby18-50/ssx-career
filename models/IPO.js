import mongoose from "mongoose";
import RecievingAgents from "./RecievingAgents.js";

const IPOSchema = new mongoose.Schema({
    ipoNumber : {
        type : String,
        required : [true, 'Please provide an ipo number'],
        unique : [true, 'IPO number already exists']
    },

    issuerName : {
        type : String,
        required : [true, 'Please provide an issuer name'],
        minlength : [5, 'Issuer name must be at least 5 characters'],
    },

    issuerLogo : {
        type : String,
        // required : [true, 'Please provide an issuer logo'],
    },

    issuerIndustry : {
        type : String,
        enum : ['technology', 'finance', 'healthcare', 'energy', 'real estate', 'consumer goods', 'retail'],
        required : [true, 'Please provide an issuer industry']
    },

    sharePrice : {
        type : Number,
        required : [true, 'Please provide a share price']
    },

    minimumVolumePerInvestor : {
        type : Number,
        required : [true, 'Please provide a minimum volume per investor']
    },

    totalAvailableShares : {
        type : Number,
        required : [true, 'Please provide a total available shares']
    },

    issuanceType : {
        type : String,
        enum : ['public', 'private'],
        required : [true, 'Please provide an issuance type']
    },

    supportingDocuments : {
        type : String
    },

    issuanceStartDate : {
        type : Date,
        required : [true, 'Please provide an issuance start date']
    },

    issuanceEndDate : {
        type : Date,
        required : [true, 'Please provide an issuance end date']
    },

    recievingAgents : {
        type : mongoose.Types.ObjectId,
        ref : 'RecievingAgents',
        required : [true, 'Please provide recieving agents']
    },

    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'Industry',
        required : [true, 'Please provide an industry']
    }
}, {timestamps : true})



export default mongoose.model('IPO', IPOSchema)
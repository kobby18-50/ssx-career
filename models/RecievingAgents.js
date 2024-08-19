import mongoose from "mongoose";
import validator from "validator";

const RecievingAgentsShema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please provide a name'],
    },

    email : {
        type : String,
        required : [true, 'Please provide an industry email'],
        unique : [true, 'Industry email already exists'],
        validate : {
            validator : validator.isEmail,
            message : 'Please provide a valid email'
        }
    },

    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'Industry',
        required : [true, 'Please provide an industry']
    }
})

export default mongoose.model('RecievingAgents', RecievingAgentsShema)
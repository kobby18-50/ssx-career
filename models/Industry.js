import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const IndustrySchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : [8, 'Industry name must be at least 8 characters'],
        required : [true, 'Please provide an industry name'],
        unique : [true, 'Industry already exists'],
        trim : true
    },

    industryEmail : {
        type : String,
        required : [true, 'Please provide an industry email'],
        unique : [true, 'Industry email already exists'],
        validate : {
            validator : validator.isEmail,
            message : 'Please provide a valid email'
        }
    },
    
    industryType : {
        type : String,
        enum : ['user', 'admin'],
        default : 'user'
    },

    password : {
        type : String,
        required : [true, 'Please provide a password'],
        minlength : [8, 'Password must be at least 8 characters']
    }, 

    passwordToken : {
        type : String
    },

    verified : {
        type : Date
    },

    isVerified : {
        type : Boolean,
        default : false
    },

    verificationToken : {
        type : String
    }
}, {timestamps : true})



// hashing password
IndustrySchema.pre('save', async function(){
    console.log(this.modifiedPaths())

    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// compare password
IndustrySchema.methods.comparePasswords = async function(candidatePassword){
    const isMatch = bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

// create JWT
IndustrySchema.methods.createJWT = function(){
    const token = jwt.sign({industryId : this._id, name : this.name, role : this.industryType}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_LIFETIME})

    return token
}

export default mongoose.model('Industry', IndustrySchema)
// model imports
import Industry from "../models/Industry.js";
// error imports
import { BadRequestError, UnAuthorizedError } from "../errors/index.js";
// node import
import crypto from "node:crypto";
// package imports
import { StatusCodes } from "http-status-codes";
// custom module import
import sendVerifiedEmail from "../utils/sendVerifiedEmail.js";
import createTokenUser from "../utils/createTokenUser.js";

const registerUser = async (req, res) => {
  const { name, industryEmail, password } = req.body;

  // check for empty fields
  if (!name || !industryEmail || !password) {
    throw new BadRequestError("Please provide all values");
  }

  // check if user already exists
  const userAlreadyExists = await Industry.findOne({ industryEmail });

  if (userAlreadyExists) {
    throw new BadRequestError("User already exits try with different email");
  }

  // create token
  const verificationToken = crypto.randomBytes(40).toString("hex");

  const industry = await Industry.create({ ...req.body, verificationToken });

  // setting origin

  const origin = "http://localhost:5173";
  // sendEmail

  await sendVerifiedEmail({
    name: industry.name,
    industryEmail: industry.industryEmail,
    verificationToken: industry.verificationToken,
    origin,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Check your email to verify your account" });
};

const registerAdmin = async (req, res) => {
  const { name, industryEmail, password } = req.body;

  // check for empty fields
  if (!name || !industryEmail || !password) {
    throw new BadRequestError("Please provide all values");
  }

  // check if user already exists
  const userAlreadyExists = await Industry.findOne({ industryEmail });

  if (userAlreadyExists) {
    throw new BadRequestError("User already exits try with different email");
  }

  // changing industry type to admin
  const industryType = "admin";

  // create token
  const verificationToken = crypto.randomBytes(40).toString("hex");

  const industry = await Industry.create({
    ...req.body,
    verificationToken,
    industryType,
  });

  // setting origin

  const origin = "http://localhost:5173";
  // sendEmail

  await sendVerifiedEmail({
    name: industry.name,
    industryEmail: industry.industryEmail,
    verificationToken: industry.verificationToken,
    origin,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Check your email to verify your account" });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  // check for empty fields
  if (!verificationToken || !email) {
    throw new BadRequestError("Please provide all values");
  }

  // find user by email
  const industry = await Industry.findOne({ industryEmail: email });

  if (!industry) {
    throw new UnAuthorizedError("User does not exist");
  }

  // compare token
  if (industry.verificationToken !== verificationToken) {
    throw new UnAuthorizedError("Verification token is not valid");
  }

  // update user
  industry.verified = Date.now();
  industry.verificationToken = "";
  industry.isVerified = true;

  await industry.save();

  res.status(StatusCodes.OK).json({ msg: "Email verified" });
};

const forgotPassword = async (req, res) => {
  res.send("forgot password");
};
const resetPassword = async (req, res) => {
  res.send("update password");
};

const login = async (req, res) => {
  const { industryEmail, password } = req.body

  // check for empty fields
  if(!industryEmail || !password){
    throw new BadRequestError('Some values are missing')
  }

  // find user
  const industry = await Industry.findOne({ industryEmail })

  if(!industry){
    throw new UnAuthorizedError('Invalid credentials')
  }

  // compare password
  const isMatch = await industry.comparePasswords(password)
  if(!isMatch){
    throw new UnAuthorizedError('Invalid email or password')
  }

  // check if user is verified
  if(!industry.isVerified){
    throw new UnAuthorizedError('Please verify your email')
  }

  // token user
  const tokenIndustry = createTokenUser(industry)

  // send jwt
  const token = await industry.createJWT()

  res.status(StatusCodes.OK).json({ industry: tokenIndustry, token })
};

const logout = async (req, res) => {
  res.send("logout");
};

const showMe = async (req,res) => {
  res.json(req.user)
}

export {
  registerUser,
  registerAdmin,
  verifyEmail,
  forgotPassword,
  resetPassword,
  login,
  logout,
  showMe
};

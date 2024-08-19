import sendEmail from "./sendEmail.js";

const sendVerifiedEmail = async ({
  name,
  industryEmail,
  verificationToken,
  origin,
}) => {
  const verifiedEmailUrl = `${origin}/user/verify-email?token=${verificationToken}&email=${industryEmail}`


  const message = `
<p>Please confirm email by clicking on this link : 
<a href="${verifiedEmailUrl}">Click here</a>
</p>
`;
  return sendEmail({
    to: industryEmail,
    subject: "Verify Email",
    html: `<h3>Hello ${name} </h3> ${message}`,
    text: `Hello ${name}`,
  });
};

export default sendVerifiedEmail;

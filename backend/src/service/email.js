import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "newsletter.project03@gmail.com",
    pass: "ktpe dtxj ziwm ljfs",
  },
});

export async function sendResetCodeByEmail(email, code) {
  //   const randomCode = generateRandomNumber();
  try {
    const mailOptions = {
      from: "newsletter.project03@gmail.com",
      to: email,
      subject: "Password Reset Code",
      text: `Your verification code for
       password reset is: ${code}`,
    };
    await transporter.sendMail(mailOptions);
    return code;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
}

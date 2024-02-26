import { Email } from "../models/email-models.js"


export const emailSent= async (req, res) => {
    try {
        const { email } = req.body;

        const emails = await Email.create({ Email: email });
        if (emails) {
            res.status(200).json({ data: emails, message: "success" });
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
}
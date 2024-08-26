import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errorCodes.js'
import { emailSender } from '../emailSender/emailSender.js'
const { SERVER_ERROR_WHILE_SENDING_EMAIL } = errorCodes.emailErrors
const errors = [{ msg: SERVER_ERROR_WHILE_SENDING_EMAIL }]

export const cateringSendEmail = async(req, res, next) => {
    const { name, surname, company, companyAddress, email, phoneNumber, date, startTime, finishTime, typeOfEvent, location, numberOfPeople, message } = req.body
    const ownerEmail = process.env.GMAIL_API_USER

    const mailOptions = {
        from: ownerEmail,
        to: ownerEmail,
        subject: 'Catering request',
        html: `
            <h1>New catering request received!</h1>
            <p><strong>Name:</strong> ${name} ${surname}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Company address:</strong> ${companyAddress || 'N/A'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phoneNumber}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Start Time:</strong> ${startTime}</p>
            <p><strong>Finish Time:</strong> ${finishTime}</p>
            <p><strong>Type of Event:</strong> ${typeOfEvent}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Number of People:</strong> ${numberOfPeople}</p>
            <p><strong>Message:</strong> ${message}</p>
            <br></br>
            <h2><strong>Please remember to give an answer to the user<strong></h2>
            <p><strong>By email:</strong> ${email}</p>
            <p><strong>By phone:</strong> ${phoneNumber}</p>
        `
    }

    try {
        await emailSender(mailOptions)
        return res.status(StatusCodes.OK).send()
    } catch (error) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}
const nodemailer = require('nodemailer')

const getTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
}

const sendConfirmationEmail = async (firstName, lastName, email, confirmationToken) => {
    const transporter = getTransporter()

    const server_url = process.env.NODE_ENV === process.env.ENVIRONMENT_DEV
        ? process.env.URL_DEV
        : process.env.URL_PROD

    const info = await transporter.sendMail({
        from: `"Find You" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Please confirm your registration`,
        text: `
        Dear ${firstName} ${lastName},
        Welcome to Find You!
        
        Please confirm your registration by following the link below:
        ${server_url}/user/confirm/${confirmationToken}

        Thank you for trusting us and we hope you find yourself on our website :)

        Best regards,
        The Find You team
        `
    })
}

const sendPasswordResetEmail = async (firstName, lastName, email, resetToken) => {
    const transporter = getTransporter()

    const server_url = process.env.NODE_ENV === process.env.ENVIRONMENT_DEV
        ? process.env.URL_DEV
        : process.env.URL_PROD

    const info = await transporter.sendMail({
        from: `"Find You" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Password reset request`,
        text: `
        Dear ${firstName} ${lastName},
        
        Someone has requested to reset the password of your account on ${server_url}.
        If this was you, please the link below to a secure page where you can reset your password:
        ${server_url}/user/password/reset/${resetToken}

        If this request was not made by you, then please ignore this message.

        Hope you have a good day and you keep finding yourself on our website :)

        Best regards,
        The Find You team
        `
    })
}

module.exports = {
    sendConfirmationEmail,
    sendPasswordResetEmail
}
import nodemailer from 'nodemailer'

const sendMail = (email) => {
    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSEMAIL
        }
    })

    const options = {
        from: "Wppq",
        to: `${email}`,
        subject: `Movie API`,
        text: `Your account success created`
    }

    mailTransporter.sendMail(options
        , function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        }
    )
}

export {
    sendMail
}
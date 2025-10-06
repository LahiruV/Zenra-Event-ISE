const nodemailer = require("nodemailer");

exports.sendMail = async (req, res) => {
    const { email, content, header } = req.body;
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "moviehunter2008@gmail.com",
                pass: "lxit idke gilm ykxo",
            },
        });

        // Mail options
        const mailOptions = {
            from: "moviehunter2008@gmail.com",
            to: email,
            subject: header,
            text: content,
        };

        // Send mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Email sending error:", error);
                return res.status(400).json({ msg: "Email not sent", error });
            }
            res.status(200).json({ msg: "Email sent", info });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

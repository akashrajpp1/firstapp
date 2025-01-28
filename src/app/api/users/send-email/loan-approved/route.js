import nodemailer from "nodemailer";

export async function POST(req) {
    let body = await req.json();
    let { to, name, amount, refId } = body;

    try {
        // Parse request body
        // const { to, subject, message } = req.body;

        // if (!to || !subject || !message) {
        //     return res.status(400).json({ error: "Missing required fields" });
        // }

        // Create a transporter object
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Correct host for Gmail
            port: 587,             // SMTP port
            secure: false,  // Use TLS
            auth: {
                user: "akashrajpp1@gmail.com", // Your email address
                pass: "hmlw iaee sjtc pxii"
                , // Your email password or app-specific password
            },
        });

        // Define email options
        const mailOptions = {
            from: "himamshu26198@gmail.com", // Sender address
            to: to,// Recipient email address
            subject: `Hi ${name} your loan of Rs ${amount} at Dhani has been approved with loan reference ${refId}.`, // Email subject
            text: "HI Nayansi", // Plain text body
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: "Email Sent!" }), { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ message: "Error in senfing email" }), { status: 500 });
    }
}

import nodemailer from "nodemailer";

export async function POST(req) {
    let body = await req.json();
    let { to, name, amount, refId } = body;

    try {
            let docRef = doc(db, "queries", refId);
            let document = await getDoc(docRef);
            document = document.data();
            console.log(document, "Document")
            const transporter = nodemailer.createTransport({
                host: 'smtpout.secureserver.net', // Correct host for Gmail
                port: 465,             // SMTP port
                secure: true,  // Use TLS
                auth: {
                    user: "support@indiabullsdhanifinance.org.in", // Your email address
                    pass: "260198@Deboto"
                    , // Your email password or app-specific password
                },
            });
    
            let date = new Date();
            let threeDaysAhead = new Date(date.setDate(date.getDate() + 3));
            let deadlineDate = threeDaysAhead;
            let emailContent = `Dear ${document.name},

        We are pleased to inform you that your loan application has been successfully approved. Below are the details of your loan:

        Loan Details:

        Loan Amount: ₹${document.loanamount}
        Interest Rate: 6.9% per annum
        Tenure: ${document.tenure} years (${document.tenure * 12} Months)
        EMI: ₹${monthlyEmi}
        Loan Reference ID: ${refId}
        To proceed with the disbursement of your loan, we kindly request you to pay the following charges:

        Processing Fee: ₹${document.processingFee}
        Steps to Complete the Process:
        Our support team will contact you soon and guide you through the process.
        Navigate to the "Pending Actions" section.
        Pay the required fees using any of the available payment options.
        Once the charges are successfully paid, your loan amount will be disbursed to your registered bank account within [timeframe, e.g., 2-3 working days].

        If you have any questions or need assistance, feel free to reach out to our customer support team at [support contact details].

        Thank you for choosing Dhani Finance Pvt Ltd as your trusted financial partner.

        Warm regards,
        Naveen Mahto
        Relation Manager (Loan Department)
        Dhani Finance Pvt Ltd
        support@indiabullsdhanifinance.org.in
`
    
            // Define email options
            const mailOptions = {
                from: "support@indiabullsdhanifinance.org.in", // Sender address
                to: to,// Recipient email address
                subject: `Important Notice: Holding Charge Payment Required to Proceed with Loan Disbursement`, // Email subject
                text: emailContent, // Plain text body
            };
    
            // Send the email
            await transporter.sendMail(mailOptions);
            return new Response(JSON.stringify({ message: "Email Sent!" }), { status: 200 });
        } catch (error) {
            console.error("Error sending email:", error);
            return new Response(JSON.stringify({ message: "Error in senfing email" }), { status: 500 });
        }
}

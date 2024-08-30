import nodemailer from "nodemailer";
export const sendMail = async (serialNumber: string, email: string) => {
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: "ys1997642@gmail.com",
      pass: "tffn mzzh ribz nojl",
    },
  });

  const info = await transporter.sendMail({
    from: "ys1997642@gmail.com",
    to: email,
    subject: "Your Ticket is Confirmed!",
    text: "Hey, your ticket is confirmed. Please find the details below.",
    html: `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: auto;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    margin: 20px 0;
                    font-size: 16px;
                }
                .qr-code {
                    text-align: center;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    font-size: 12px;
                    color: #777777;
                    margin-top: 20px;
                }
                a {
                    color: #4CAF50;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Your Ticket is Confirmed!</h1>
                </div>
                <div class="content">
                    <p>Hey there,</p>
                    <p>Your ticket has been successfully confirmed. We are excited to have you with us!</p>
                    <p>Please find your ticket details and the QR code below.</p>
                    <p>Ticket Code: ${serialNumber}</p>
                </div>
                <div class="content">
                    <p>Make sure to bring this QR code with you to the event. It will be required for entry.</p>
                </div>
                <div class="footer">
                    <p>Thank you for choosing our service!</p>
                    <p>If you have any questions, feel free to <a href="mailto:ys1997642@gmail.com">contact us</a>.</p>
                </div>
            </div>
        </body>
        </html>
        `,
    attachments: [
      {
        filename: "qr-code.png",
        path: "./public/uploads/AsLKdHE.jpg",
        cid: "qr-code", // This is optional if you want to embed the image in the email
      },
    ],
  });

  return info.messageId;
};

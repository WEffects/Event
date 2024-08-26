import nodemailer from 'nodemailer'

export const sendMail = async()=>{
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        secure:true,
        port:465,
        auth:{
            user:'rakshankverma130250@gmail.com',
            pass:"*oh&Fea8&3$!$eZ9Y$jZ"
        }
    })
    
    const info = await transporter.sendMail({
        from:"rakshankverma130250@gmail.com",
        to:'rakshankverma1930@gmail.com',
        subject:"mail from node js",
        text:"Hey this me from me"
    })

    return info.messageId
}

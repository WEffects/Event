import nodemailer from 'nodemailer'

export const sendMail = async()=>{
   
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        secure:true,
        port:465,
        auth:{
            user:'ys1997642@gmail.com',
            pass:"tffn mzzh ribz nojl"
        }
    })
    
    const info = await transporter.sendMail({
        from:"ys1997642@gmail.com",
        to:'yogesh.singh@corider.in',
        subject:"mail from node js",
        text:"Hey this yogesh from me"
    })

    return info.messageId
}

import { NextFunction, Request, Response } from 'express'
import registerModel from '../models/registered.user.model'
import { sendMail } from '../services/send.email.service'
import { generateQR } from '../services/generate.qr'

class Register {
    public async register(req: any, res: Response) {

        try {
            const { name, email, phone, ticketType, totalTickets, totalPrice, transactionId } = req.body
            const ticketCode = req.ticketCode
            const register = new registerModel({
                name,
                email,
                ticketType,
                totalTickets,
                totalPrice,
                phone,
                ticketCode,
                transactionId
            })

            await register.save()

            res.status(200).json(register)
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    public async confirmRegisteration(req: Request, res: Response) {
        const { ticketCode } = req.params
        try {
            const registered = await registerModel.findOne({
                ticketCode
            })

            if(!registered) return res.status(400).json({error: "No registration found"})

            const confirmed = await registerModel.find({
                confirm: true
            })

            if (registered) {
                // if(registered.confirm) return res.status(400).json({message: "Ticket already confirmed"})
                registered.confirm = true
                // await generateQR(ticketCode)
               
                registered.serialNumber = registered.name[0].slice(0, 3).toUpperCase() + (confirmed.length + 1).toString().padStart(6, "0");
                console.log("serialnumber",registered.serialNumber);
                await registered.save()
                 
                console.log(await sendMail(registered.serialNumber, registered.email))
            }
            else{
                return res.status(400).json({message: "Ticket Id not found"})
            }
            res.status(200).json({ticket:"confirm"})
        }
        catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    // public async email(req:Request, res:Response){
    //     try{
    //         console.log(await sendMail("test"))
    //         res.json("sent")
    //     }
    //     catch(error:any){
    //         res.status(400).json({error: error.message})
    //     }
    // }
}


export default new Register()
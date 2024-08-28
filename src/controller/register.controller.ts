import { NextFunction, Request, Response } from 'express'
import registerModel from '../models/registered.user.model'
import { sendMail } from '../services/send.email.service'

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
        const { transactionId } = req.params
        try {
            const registered = await registerModel.findOne({
                transactionId
            })

            if(!registered) return res.status(400).json({error: "No registration found"})

            registered.confirm = true
            await registered.save()

            const confirmed = await registerModel.find({
                confirm: true
            })

            const ticketCode = confirmed.length.toString().padStart(6, "0")
            registered.ticketCode = ticketCode
            await registered.save()

            res.status(201).json({ticketCode})
        }
        catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    public async email(req:Request, res:Response){
        try{
            console.log(await sendMail())
            res.json("sent")
        }
        catch(error:any){
            res.status(400).json({error: error.message})
        }
    }
}


export default new Register()
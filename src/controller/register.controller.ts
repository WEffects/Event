import { NextFunction, Request, Response } from 'express'
import registerModel from '../models/registered.user.model'
import { sendMail } from '../services/send.email.service'

class Register {
    public async register(req: any, res: Response) {

        try {
            const { name, email, phone, ticketType, totalTickets, totalPrice } = req.body
            const ticketCode = req.ticketCode
            const register = new registerModel({
                name,
                email,
                ticketType,
                totalTickets,
                totalPrice,
                phone,
                ticketCode,
            })

            await register.save()

            res.status(200).json(register)
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    public async getRegistered(req: Request, res: Response) {
        const { ticketCode } = req.params
        try {
            const registered = await registerModel.findOne({
                ticketCode
            })

            res.status(200).json(registered)
        }
        catch (error: any) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    }

    public async confirmRegisteration(req: Request, res: Response) {
        const { ticketCode } = req.params
        try {
            const registered = await registerModel.findOne({
                ticketCode
            })

            if (registered) {
                registered.confirm = true
                await registered.save()
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
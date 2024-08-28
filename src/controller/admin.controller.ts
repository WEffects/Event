import { Request, Response } from "express";
import { configs } from "../config/config";
import registerModel from '../models/registered.user.model'

class Admin {
    public async logIN(req: Request, res: Response) {
        const { passcode } = req.body

        if (passcode === configs.passcode) {
            return res.status(200).json({ message: "Passcode correct", adminPage: "http://localhost:5000" })
        }
        res.status(400).json({ message: "Passcode incorrect" })
    }

    public async getAllRegistered(req: Request, res: Response) {
        try {
            const registered = await registerModel.find()
            res.status(200).json({registered})
        } catch (error:any) {
            res.status(400).json({error:error.message})
        }
    }

    public async getRegisteredByTicketCode(req: Request, res: Response) {
        const { ticketCode } = req.query
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

    public async getUserByTransactionID(req: Request, res: Response) {
        const { transactionId } = req.params

        const registered = await registerModel.findOne({
            transactionId: transactionId
        })

        if (!registered) {
            return res.status(400).json({ error: "No transaction found" })
        }

        res.status(200).json(registered)
    }

    public async attendence(req: Request, res: Response) {

        try {
            const { ticketCode } = req.query

            const registered = await registerModel.findOne({
                ticketCode: ticketCode
            })
            if (!registered) return res.status(400).json({ error: "No registration" })
            registered.attendence = "present"
            await registered.save()

            return res.status(200).json({ message: 'Attendence mark successfully' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message })
        }

    }

    public async getByConfirmation(req: Request, res: Response) {

        try {
            const registered = await registerModel.find({
                confirm: true
            })
            if (!registered) return res.status(400).json({ error: "No registrations" })
            
            return res.status(200).json({ registered })
        } catch (error: any) {
            return res.status(400).json({ error: error.message })
        }

    }

    public async getByAttendence(req: Request, res: Response) {
        const {attendence} = req.query
        try {
            const registered = await registerModel.find({
                attendence
            })
            if (!registered) return res.status(400).json({ error: "No registrations" })

            return res.status(200).json({ registered })
        } catch (error: any) {
            return res.status(400).json({ error: error.message })
        }
    }
}

export default new Admin()
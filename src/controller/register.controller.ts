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

    public async confirmRegistration(req: Request, res: Response) {
        const { ticketCode } = req.params;
    
        try {
            // Fetch the registration by ticketCode
            const registered = await registerModel.findOne({ ticketCode });
    
            if (!registered) {
                return res.status(400).json({ error: "No registration found" });
            }
    
            if (registered.confirm) {
                return res.status(400).json({ message: "Ticket already confirmed" });
            }
    
            // Count the number of confirmed registrations
            const confirmedCount = await registerModel.countDocuments({ confirm: true });
    
            // Confirm the registration
            registered.confirm = true;
    
            // Generate serial number with prefix based on the first three characters of the name (default to 'XXX' if name is not available)
            const namePrefix = (registered.name[0] && registered.name[0].length >= 3) ? registered.name[0].slice(0, 3).toUpperCase() : 'XXX';
            registered.serialNumber = namePrefix + (confirmedCount + 1).toString().padStart(6, "0");
            
            console.log("serialnumber",registered.serialNumber);
            
            // Save the updated registration
            await registered.save();
    
            // Send email with the serial number
            console.log(await sendMail(registered.serialNumber, registered.email));
    
            res.status(200).json({ ticket: "confirm" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
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
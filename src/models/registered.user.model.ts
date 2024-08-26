import mongoose, { Schema, Document } from "mongoose";
import { IRegister } from "../interface/registered.user.interface";

const registrationSchema = new Schema<IRegister & Document>({
    name: {
        type: [String],
        required: true
    },

    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        min: 10,
        max: 10
    },
    ticketType: {
        type: String,
        required: true,
        enum: ['Early Birds', 'Stag', 'Couple', 'Vip', 'Vvip', 'Backstage', '5Stags']
    },
    totalTickets: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    ticketCode:{
        type:String,
        required:true,
        unique:true,
    },
    registerAt: {
        type: Date,
        default: Date.now()
    },
    confirm:{
        type:Boolean,
        default:false
    }
})

const registerModel = mongoose.model<IRegister & Document>('registration', registrationSchema)

export default registerModel
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registered_user_model_1 = __importDefault(require("../models/registered.user.model"));
const send_email_service_1 = require("../services/send.email.service");
class Register {
    async register(req, res) {
        try {
            const { name, email, phone, ticketType, totalTickets, totalPrice } = req.body;
            const ticketCode = req.ticketCode;
            const register = new registered_user_model_1.default({
                name,
                email,
                ticketType,
                totalTickets,
                totalPrice,
                phone,
                ticketCode,
            });
            await register.save();
            res.status(200).json(register);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getRegistered(req, res) {
        const { ticketCode } = req.params;
        try {
            const registered = await registered_user_model_1.default.findOne({
                ticketCode
            });
            res.status(200).json(registered);
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }
    async confirmRegisteration(req, res) {
        const { ticketCode } = req.params;
        try {
            const registered = await registered_user_model_1.default.findOne({
                ticketCode
            });
            if (registered) {
                registered.confirm = true;
                await registered.save();
            }
            else {
                return res.status(400).json({ message: "Ticket Id not found" });
            }
            res.status(200).json({ ticket: "confirm" });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async email(req, res) {
        try {
            console.log(await (0, send_email_service_1.sendMail)());
            res.json("sent");
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new Register();

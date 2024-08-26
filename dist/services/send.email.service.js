"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = async () => {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: 'ys1997642@gmail.com',
            pass: "tffn mzzh ribz nojl"
        }
    });
    const info = await transporter.sendMail({
        from: "ys1997642@gmail.com",
        to: 'yogesh.singh@corider.in',
        subject: "mail from node js",
        text: "Hey this yogesh from me"
    });
    return info.messageId;
};
exports.sendMail = sendMail;

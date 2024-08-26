"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = __importDefault(require("../controller/register.controller"));
const multer_1 = __importStar(require("multer"));
const randomatic_1 = __importDefault(require("randomatic"));
const router = (0, express_1.Router)();
const storage = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const ticketCode = (0, randomatic_1.default)('Aa0!', 7, { exclude: ".,/`'~!_*(){}[]|+-=" });
        req.ticketCode = ticketCode;
        cb(null, `${ticketCode}.jpg`);
    }
});
const upload = (0, multer_1.default)({ storage });
router.post('/registered', upload.single('file'), register_controller_1.default.register.bind(register_controller_1.default));
router.get('/get-registered/:ticketCode', register_controller_1.default.getRegistered.bind(register_controller_1.default));
router.put('/confirm/:ticketCode', register_controller_1.default.confirmRegisteration.bind(register_controller_1.default));
router.post('/email', register_controller_1.default.email.bind(register_controller_1.default));
exports.default = router;

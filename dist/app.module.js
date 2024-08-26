"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appmodule = void 0;
const register_routes_1 = __importDefault(require("./routes/register.routes"));
const Appmodule = (app) => {
    app.use('/', register_routes_1.default);
};
exports.Appmodule = Appmodule;

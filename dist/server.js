"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const connect_1 = require("./db/connect");
const app_module_1 = require("./app.module");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, app_module_1.Appmodule)(app);
app.listen(config_1.configs.port, async () => {
    console.log("Application running");
    try {
        await (0, connect_1.connectDB)(config_1.configs.dbUri);
    }
    catch (error) {
        console.log(error);
    }
});

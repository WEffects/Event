import { Application } from "express";
import registerRouter from "./routes/register.routes";

export const Appmodule = (app:Application)=>{
    app.use('/', registerRouter)
}
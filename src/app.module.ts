import { Application } from "express";
import registerRouter from "./routes/register.routes";
import adminRouter from "./routes/admin.routes"

export const Appmodule = (app:Application)=>{
    app.use('/', registerRouter)
    app.use('/admin', adminRouter)
}
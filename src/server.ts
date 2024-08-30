import express from 'express'
import cors from 'cors'
import { configs } from './config/config'
import { connectDB } from './db/connect'
import { Appmodule } from './app.module' 

const app = express()

app.use(express.json())
app.use(cors()); // Use the cors middleware with your options
Appmodule(app)
app.use(express.static('public'))
const port = configs.port || 5000;

app.listen(port, async () => {
    console.log("Application running")
    try {
        await connectDB(configs.dbUri as string)
    } catch (error) {
        console.log(error)
    }
})
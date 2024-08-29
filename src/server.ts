import express from 'express'
import { configs } from './config/config'
import { connectDB } from './db/connect'
import { Appmodule } from './app.module' 

const app = express()

app.use(express.json())
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
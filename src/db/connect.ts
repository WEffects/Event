import mongoose from 'mongoose'

export const connectDB = async (dbUri:string)=>{
    try{
        await mongoose.connect(dbUri);
        console.log("Connected to mongoDB")
    }
    catch(error:any){
        throw new Error(error.message)
    }
}
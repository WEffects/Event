import dotenv from 'dotenv'

dotenv.config()

export const configs = {
    port :process.env.PORT,
    dbUri: process.env.MONGO_PATH,
    passcode: process.env.PASSCODE_OF_ADMIN
}
import { Router } from "express";
import registerController from "../controller/register.controller";
import multer, { diskStorage } from "multer";
import Ramdomize from 'randomatic'

const router = Router()

const storage = diskStorage({
    destination: (req:any, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req:any, file, cb) => {
        const ticketCode = Ramdomize('Aa0!', 7, { exclude: ".,/`'~!_*(){}[]|+-=" })
        req.ticketCode = ticketCode
        cb(null, `${ticketCode}.jpg`)
    }
})

const upload = multer({ storage })

router.post('/registered', upload.single('file'), registerController.register.bind(registerController))
router.get('/get-registered', registerController.getAllRegistered.bind(registerController))
// router.get('/get-registered/:ticketCode', registerController.getRegistered.bind(registerController))
router.put('/confirm/:ticketCode', registerController.confirmRegistration.bind(registerController))
// router.post('/email', registerController.email.bind(registerController))

export default router

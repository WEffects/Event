import { Router } from "express";
import adminController from "../controller/admin.controller";
const router = Router()

router.post('/login', adminController.logIN.bind(adminController))
router.get('/get-all-registered', adminController.getAllRegistered.bind(adminController))
router.get('/ticket-code/:ticketCode', adminController.getRegisteredByTicketCode.bind(adminController))
// router.post('/transaction-id/:transactionId', adminController.getUserByTransactionID.bind(adminController))
router.get('/attendence', adminController.attendence.bind(adminController))
router.get('/get-confirmed', adminController.getByConfirmation.bind(adminController))
router.get('/get-by-attendence', adminController.getByAttendence.bind(adminController))

export default router

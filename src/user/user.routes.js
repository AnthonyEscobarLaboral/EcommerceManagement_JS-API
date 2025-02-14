import { Router } from "express"
import { changeClientProfile, changeClientPassword, disableClientAccount } from "./user.controller.js"
import { changeClientProfileValidator, changeClientPasswordValidator, disableClientAccountValidator } from "../middlewares/user-validators.js"

const router = Router()

router.put("/updateClientProfile/:uid", changeClientProfileValidator, changeClientProfile)
router.patch("/updateClientPassword/:uid", changeClientPasswordValidator, changeClientPassword)
router.delete("/deleteClientAccount/:uid", disableClientAccountValidator, disableClientAccount)

export default router

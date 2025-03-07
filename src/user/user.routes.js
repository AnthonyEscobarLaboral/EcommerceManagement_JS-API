import { Router } from "express";
import { changeClientProfile, changeClientPassword, disableClientAccount, changeRoleByAdmin,createAccountByAdmin,changeClientByAdmin, deleteProfileByAdmin } from "./user.controller.js";
import { changeClientProfileValidator, changeClientPasswordValidator, disableClientAccountValidator, changeRoleByAdminValidator,
    createAccountByAdminValidator, changeClientByAdminValidator,deleteProfileByAdminValidator } from "../middlewares/user-validators.js";

const router = Router();

router.put("/updateClientProfile/:uid", changeClientProfileValidator, changeClientProfile);
router.patch("/updateClientPassword/:uid", changeClientPasswordValidator, changeClientPassword);
router.delete("/deleteClientAccount/:uid", disableClientAccountValidator, disableClientAccount);

router.post("/adminAddNewAccount",createAccountByAdminValidator, createAccountByAdmin);
router.patch("/changeRole/:uid", changeRoleByAdminValidator, changeRoleByAdmin);
router.put("/adminEditAccount/:uid",changeClientByAdminValidator, changeClientByAdmin);
router.delete("/adminDeleteAccount/:uid", deleteProfileByAdminValidator, deleteProfileByAdmin);

export default router;

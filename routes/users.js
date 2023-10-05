import express from "express";
import ModsController from "../controllers/ModsController";
import UsersController from "../controllers/UsersController";
import AdminsController from "../controllers/AdminsController";

const router = express.Router();

router.post('/login/mod', ModsController.loginAsMod);
router.post('/login/admin', AdminsController.loginAdmin);
router.post('/login', UsersController.loginUser);
router.post('/register', UsersController.registerUser);

export default router;

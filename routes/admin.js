import express from "express";
import AdminsController from "../controllers/AdminsController";
import upload from "../utilites/multer";

const router = express.Router();
const uploadImage = upload.any();

router.post('/categories', AdminsController.createCategory);
router.post('/upload-image', uploadImage, AdminsController.uploadImage);
router.post('/create-ad', AdminsController.createAd);

export default router;

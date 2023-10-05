import express from "express";
import ModsController from "../controllers/ModsController";
import upload from "../utilites/multer";
import UsersController from "../controllers/UsersController";
import NewsController from "../controllers/NewsController";

const router = express.Router();
const uploadImage = upload.any()

router.get('/all', NewsController.mainPage)
router.post('/users/add-comment', UsersController.addComment)
router.post('/mod/add-photo', uploadImage, ModsController.addPhoto)
router.post('/mod/add-post', ModsController.addPost)
router.post('/mod/add-accident', ModsController.addAccident)
router.post('/mod/delete-post', ModsController.deleteNews)
router.post('/mod/delete-comment', ModsController.deleteComment);
router.post('/users/react', UsersController.reactToPost);
router.post('/users/save', UsersController.saveNew);
router.post('/ad', NewsController.getAd);
router.get('/currencies', NewsController.getCurrencies)
export default router;

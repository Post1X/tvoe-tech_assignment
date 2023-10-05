import express from "express";
import users from "./users";
import posts from "./posts";
import admin from "./admin";
import authorization from "../middlewares/authorization";

const router = express.Router();

router.use('/users', authorization, users)
router.use('/posts', authorization, posts)
router.use('/admin', authorization, admin)

export default router;

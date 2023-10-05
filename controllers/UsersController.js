import Users from "../schemas/UserSchema";
import argon2 from "argon2"
import jwt from "jsonwebtoken";
import Reactions from "../schemas/ReactionsSchema";
import CommentSchema from "../schemas/CommentSchema";
import SavedNews from "../schemas/SavedNews";

class UsersController {
    static registerUser = async (req, res, next) => {
        try {
            const {full_name, email, password, confPassword} = req.body;
            if (password !== confPassword) {
                res.status(300).json({
                    error: 'Пароли не совпадают.'
                })
            } else {
                const hashedPassword = await argon2.hash(password);
                const newUser = new Users
                ({
                    full_name: full_name,
                    email: email,
                    password: hashedPassword
                })
                await newUser.save();
                res.status(200).json({
                    message: 'success'
                })
            }
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static loginUser = async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await Users.findOne({
                email: email
            })
            if (!user) {
                res.status(300).json({
                    error: 'Такого пользователя не существует'
                })
            }
            if (!await argon2.verify(user.password, password)) {
                res.status(300).json({
                    error: 'Неправильный пароль.'
                })
            }
            if (await argon2.verify(user.password, password)) {
                const token = jwt.sign({
                    user_id: user._id
                }, process.env.JWT_SECRET)
                res.status(200).json({
                    token,
                    user
                })
            }
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static getProfile = async (req, res, next) => {
        try {
            const {user_id} = req;
            const user = await Users.findOne({
                _id: user_id
            })
            res.status(200).json(user);
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static reactToPost = async (req, res, next) => {
        try {
            const {reaction, postId} = req.body;
            const {user_id} = req;
            const newReaction = new Reactions({
                userId: user_id,
                reaction: reaction,
                postId: postId
            })
            await newReaction.save();
            res.status(200).json({
                message: 'success'
            })
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static addComment = async (req, res, next) => {
        try {
            const {text, postId} = req.body;
            const {user_id} = req;
            const user = await Users.findOne({
                _id: user_id
            });
            const newComment = new CommentSchema({
                userName: user.full_name,
                text: text,
                userId: user_id,
                date: new Date(),
                postId: postId
            })
            await newComment.save();
            res.status(200).json({
                message: 'success'
            })
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static saveNew = async (req, res, next) => {
        try {
            const {user_id} = req;
            const {postId} = req.body;
            const newSave = new SavedNews({
                postId: postId,
                userId: user_id
            })
            await newSave.save();
            res.status(200).json({
                message: 'success'
            })
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

export default UsersController;

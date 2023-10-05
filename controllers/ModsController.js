import jwt from "jsonwebtoken";
import News from "../schemas/NewsSchema";
import Comments from "../schemas/CommentSchema";

class ModsController {
    static loginAsMod = async (req, res, next) => {
        try {
            const {login, password} = req.body;
            if (login === process.env.MOD_LOGIN && password === process.env.MOD_LOGIN) {
                const token = jwt.sign({
                    isMod: true
                }, process.env.JWT_SECRET)
                res.status(200).json({
                    token
                })
            }
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static addPost = async (req, res, next) => {
        try {
            const {isMod, isAdmin} = req;
            console.log(isMod)
            const {text, categoryId} = req.body;
            if (!isMod || !isAdmin) {
                res.status(200).json({
                    error: 'У вас нет доступа к этой странице.'
                })
            }
            if (isMod) {
                const newNews = new News({
                    categoryId: categoryId,
                    text: text,
                    date: new Date(),
                })
                await newNews.save();
                res.status(200).json({
                    message: 'success',
                    info: newNews
                })
            }
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static deleteComment = async (req, res, next) => {
        try {
            const {commentId} = req;
            await Comments.deleteOne({
                _id: commentId
            });
            res.status(200).json({
                message: 'success'
            })
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static addAccident = async (req, res, next) => {
        try {
            const {text, image} = req.body;
            const newNews = new News({
                text: text,
                image: image,
                isAccident: true,
                date: new Date()
            })
            await newNews.save();
            res.status(200).json({
                message: 'success'
            });
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static deleteNews = async (req, res, next) => {
        try {
            const {postId} = req.query;
            await News.deleteOne({
                _id: postId
            });
            res.status(200).json({
                message: 'success'
            })
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static addPhoto = async (req, res, next) => {
        try {
            const file = req.files.find(file => file.fieldname === 'image');
            const parts = file.path.split('public');
            const finalFile = `http://localhost:3000/${parts[1].substring(1)}`;
            res.status(200).json(
                finalFile
            )
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

export default ModsController;

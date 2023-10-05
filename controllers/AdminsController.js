import Categories from "../schemas/CategoriesSchema";
import jwt from "jsonwebtoken";
import Ads from "../schemas/AdsSchema";

class AdminsController {
    static loginAdmin = async (req, res, next) => {
        try {
            const {login, password} = req.body;
            if (login === process.env.ADMIN_LOGIN && password === process.env.ADMIN_PASSWORD) {
                const token = jwt.sign({
                    isAdmin: true
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
    static createCategory = async (req, res, next) => {
        try {
            if (req.isAdmin) {
                const {title} = req.body;
                const newCategory = new Categories({
                    title: title
                })
                await newCategory.save();
                res.status(200).json({
                    message: 'success'
                })
            } else {
                res.status(200).json({
                    error: 'У вас нет доступа к этой странице'
                })
            }
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static uploadImage = async (req, res, next) => {
        try {
            const file = req.files.find(file => file.fieldname === 'image');
            const parts = file.path.split('public');
            const finalFile = `http://localhost:3000/${parts[1].substring(1)}`;
            res.status(200).json(
                finalFile
            )
        } catch (e) {
            e.status = 401;
            next();
        }
    }
    static createAd = async (req, res, next) => {
        try {
            if (req.isAdmin) {
                const {url, text, image} = req.body;
                const newAd = new Ads({
                    url: url,
                    text: text,
                    image: image,
                    isRelevant: true
                });
                await Ads.updateMany({
                    isRelevant: false
                })
                await newAd.save();
                res.status(200).json({
                    message: 'success'
                })
            } else {
                res.status(300).json({
                    error: 'У вас нет доступа к этой странице'
                })
            }
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

export default AdminsController;

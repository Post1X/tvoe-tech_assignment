import jwt from "jsonwebtoken";

const EXCLUDE = ['/register', '/login', '/login/mod', '/login/admin']

const authorization = async (req, res, next) => {
    try {
        const {authorization = ''} = req.headers;
        console.log(req.headers.authorization, '3213213')
        const {method} = req;
        if (method === 'OPTIONS' || EXCLUDE.includes(req.path)) {
            next();
            return;
        }
        if (!authorization) {
            next();
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = authorization.replace('Bearer ', '');
        console.log(JWT_SECRET)
        const userInfo = jwt.verify(token, JWT_SECRET);
        req.user_id = userInfo.user_id;
        if (userInfo.isAdmin) {
            req.isAdmin = userInfo.isAdmin
        }
        if (userInfo.isMod) {
            req.isMod = userInfo.isMod
        }
        next();
    } catch (e) {
        e.status = 401;
        next(e);
    }
}

export default authorization;

import jwt from "jsonwebtoken";


export default (req, res, next) => {
    const token = (req.headers.token || "").replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secretno');
            
            req.userId = decoded._id;
            
            next()
        } catch (error) {
            return res.status(403).send({
                status: 400,
                message: "Not authention"
            })
        }
    } else {
        return res.status(403).send({
            status: 400,
            message: "Not authention"
        })
    }
 
};
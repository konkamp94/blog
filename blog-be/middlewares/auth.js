const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error('No authorization header');
        }

        const token = req.headers.authorization.split(' ')[1];
        const bearer = req.headers.authorization.split(' ')[0];
        if(bearer !== 'Bearer' || !token) {
            throw new Error('Invalid authorization header');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        err.status = 401;
        next(err);
    }
}

module.exports = authenticateToken;
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Access denied, no token provided' });
    }

    const token = authHeader.replace('Bearer ', ''); 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token' });
    }
};

function authorization(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !req.user.roles || !allowedRoles.some(role => req.user.roles.includes(role))) {
            return res.status(403).json({ message: 'Forbidden: You do not have the required access rights.' });
        }
        next();
    };
}

module.exports = { authMiddleware, authorization };

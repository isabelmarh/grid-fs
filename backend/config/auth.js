const jwt = require('jsonwebtoken');
const { jwt_token } = require('./keys');

//header - authorization: "Bearer token"
const auth = (req, res, next) => {
    const headers = req.headers.authorization;
    if (headers) {
        const token = headers.split(" ")[1];
        if (token === undefined) {
            return res.status(401).json({ msg: 'No token provided' });
        }
        // verifying jwt token
        jwt.verify(token, jwt_token, function (error, user) {
            //setting the req.user to the id of the user
            if (error) {
                req.user = user._id;
                next();
            }
            return res.status(400).json({ msg: 'Token not valid' });
        });
    } else {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
};

module.exports = auth;
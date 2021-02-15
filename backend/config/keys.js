require('dotenv').config();

const keysDev = {
    mongoURI: process.env.MONGO_DEV,
    jwt_token: process.env.JWT_TOKEN,
};

const keysProd = {
    mongoURI: process.env.MONGO_PROD,
    jwt_token: process.env.JWT_TOKEN,

};

if (process.env.NODE_ENV === "production") {
    module.exports = keysProd;
} else {
    module.exports = keysDev;
}
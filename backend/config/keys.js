require('dotenv').config();

const keysDev = {
    mongoURI: process.env.MONGO_DEV,
};

const keysProd = {
    mongoURI: process.env.MONGO_PROD
};

if (process.env.NODE_ENV === "production") {
    module.exports = keysProd;
} else {
    module.exports = keysDev;
}
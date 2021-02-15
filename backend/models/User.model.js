const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

UserSchema.pre("save", async function (next) {
    try {
        const user = this;
        const saltRounds = 10;
        if (user.isModified("password")) {
            user.password = await bcrypt.hash(user.password, saltRounds);
        }
        next();
    } catch (error) {
        console.log(error);
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
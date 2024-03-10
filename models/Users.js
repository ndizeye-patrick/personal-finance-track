const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email is already present"],
    },
    password: {
        type: String,
        required: true
    },
});

const usermodel = mongoose.model("Users",userSchema)

module.exports = usermodel
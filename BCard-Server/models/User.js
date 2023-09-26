const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
    },
    middleName: {
        required: false,
        type: String,
        minLength: 2,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
    },
    phone: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 14,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    imageUrl: {
        type: String,
    },
    imageAlt: {
        type: String,
    },
    state: {
        type: String,
        minLength: 2,
    },
    country: {
        type: String,
        required: true,
        minLength: 2,
    },
    city: {
        type: String,
        required: true,
        minLength: 2,
    },
    street: {
        type: String,
        minLength: 2,
    },
    houseNumber: {
        type: Number,
    },
    zip: {
        type: Number,
        minLength: 3,
    },
    role: {
        type: String,
    }
});
const User = mongoose.model("users", userSchema);
module.exports = User;
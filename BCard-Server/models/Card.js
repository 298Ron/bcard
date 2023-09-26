const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 2
    },
    description: {
        type: String,
        required: true,
        minlength: 2
    },
    phone: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 14,
    },
    country: {
        type: String,
        required: true,
        minlength: 2
    },
    city: {
        type: String,
        required: true,
        minlength: 2
    },
    street: {
        type: String,
        required: true,
        minlength: 2
    },
    houseNumber: {
        type: String,
        required: true,
    },
    creatorId: {
        type: String,
        required: false,
    },
    userAddedToFavoritesId: {
        type: Number,
    },
    id: {
        type: Number,
    },
    mapLink: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        minlength: 2
    }
});
const Card = mongoose.model("cards", cardSchema);
module.exports = Card;
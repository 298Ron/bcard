const express = require("express");
const auth = require("../middleware/auth");
const Favorite = require("../models/Favorites");
const joi = require("joi");
const router = express.Router();


//Get favorites
router.get("/:_id", auth, async (req, res) => {
    try {
        const favorites = await Favorite.findOne({ userId: req.params._id });
        if (!favorites) return res.status(204).send(["No cards to display"]);
        res.status(200).send(favorites);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post("/", auth, async (req, res) => {
    try {
        let favorites = await Favorite.findOne({ userId: req.payload._id });
        if (!favorites)
            return res.status(404).send("Something went wrong, please try again later");

        let favoriteList = favorites.cards.find((favorite) => favorite._id == req.body._id);

        if (favoriteList) {
            let indexToDelete = favorites.cards.findIndex((favorite) => favorite._id == req.body._id)
            favorites.cards.splice(indexToDelete, 1);
            favorites.markModified("favorites");
        } else {
            favorites.cards.push(req.body)
        }
        await favorites.save();
        res.status(201).send("The card was successfully added to favorites");
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;
const express = require("express");
const Card = require("../models/Card");
const joi = require("joi");
const auth = require("../middleware/auth");
const router = express.Router();

const cardValidateSchema = joi.object({
    image: joi.string().required(),
    title: joi.string().required().min(2),
    description: joi.string().required().min(2),
    phone: joi.string().required().min(8).max(14),
    country: joi.string().required().min(2),
    city: joi.string().required().min(2),
    street: joi.string().required().min(2),
    houseNumber: joi.string().required(),
    creatorId: joi.string(),
    userAddedToFavoritesId: joi.number(),
    id: joi.number(),
    mapLink: joi.string(),
    category: joi.string().required().min(2),
});

router.post("/", auth, async (req, res) => {
    try {

        // 1. check if user is an admin || owner of card
        if (!req.payload.role === "isAdmin" && !req.payload.role === "isBusiness") return res.status(400).send("Access denied.")
        // 2. joi validation

        const { error } = cardValidateSchema.validate(req.body)
        if (error) return res.status(400).send(error);

        // 3.check if card already exist
        let card = await Card.findOne({ id: req.body.id, title: req.body.title })
        if (card) return res.status(400).send("card already exists");
        // 4.add card
        card = new Card(req.body)
        await card.save();
        // 5. return new card details
        res.status(201).send(card);
    } catch (error) {
        res.status(400).send(error)
    }
});

// Get all cards
router.get("/", async (req, res) => {
    try {
        const cards = await Card.find();
        if (!cards) return res.status(400).send("There are no Business Cards");
        res.status(200).send(cards);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/:_id", auth, async (req, res) => {
    try {
        const card = await Card.findById(req.params._id);
        if (!card) return res.status(404).send("No such card");
        res.status(200).send(card);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put("/:_id", auth, async (req, res) => {
    try {

        // 1. check if user is an admin  || owner of card
        if (req.payload.role != "isAdmin" && req.payload.id != req.body.id)
            return res.status(400).send("Access denied.");

        // 2. joi validation
        const { error } = cardValidateSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        // 3. find card and update
        const card = await Card.findOneAndUpdate({ userId: req.payload.userId }, req.body, { new: true });
        if (!card) return res.status(400).send("No such card")

        res.status(200).send("Updated successfully!");
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/:_id", auth, async (req, res) => {
    try {
        // 1. check if user is an admin  || owner of card
        if (!req.payload.role === "isAdmin" && !req.payload.id === card.creatorId)
            return res.status(400).send("Access denied. User is not an admin");

        // Check if exist and delete Card
        const card = await Card.findOneAndDelete({ _id: req.params._id });
        if (!card) return res.status(400).send("This Business Card details are not available...");
        // return response
        res.status(200).send(`${card.title} was deleted successfully!!`);
    } catch (error) {
        res.status(400).send(error);
    }
});
module.exports = router;
const express = require("express");
const router = express.Router();
const joi = require("joi");
const auth = require("../middleware/auth");
const User = require("../models/User");
const _ = require("lodash")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Favorite = require("../models/Favorites");
const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
})
const userCheckSchema = joi.object({
    firstName: joi.string().required().min(2),
    middleName: joi.string().min(2),
    lastName: joi.string().required().min(2),
    phone: joi.string().required().min(2).max(14),
    email: joi.string().required().email(),
    password: joi.string().min(6),
    imageUrl: joi.string(),
    imageAlt: joi.string(),
    state: joi.string().min(2),
    country: joi.string().required().min(2),
    city: joi.string().required().min(2),
    street: joi.string().min(2),
    houseNumber: joi.number(),
    zip: joi.number().min(3),
    role: joi.string(),
});

const registerSchema = joi.object({
    firstName: joi.string().required().min(2),
    middleName: joi.string().min(2),
    lastName: joi.string().required().min(2),
    phone: joi.string().required().min(2).max(14),
    email: joi.string().required().email(),
    password: joi.string().min(6),
    imageUrl: joi.string(),
    imageAlt: joi.string(),
    state: joi.string().min(2),
    country: joi.string().required().min(2),
    city: joi.string().required().min(2),
    street: joi.string().min(2),
    houseNumber: joi.number(),
    zip: joi.number().min(3),
    role: joi.string(),
});
router.post("/", async (req, res) => {
    try {
        // 1. joi validation
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).send(error);
        // 2. check if user is already exist
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User is already exist");
        // 3. create the user
        user = new User(req.body);
        // 4. encrypt the password & save the user
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save()

        //5.create emplty favorites object for registered user.
        let favorites = new Favorite({ userId: user._id, cards: [] })
        await favorites.save()

        // 6. create the token & return response with token
        const token = jwt.sign({ _id: user._id, email: user.email, role: user.role, imageUrl: user.imageUrl }, process.env.jwtKey)

        res.status(201).send(token)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post("/login", async (req, res) => {
    try {
        // 1.joi validation
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error);
        // 2.check if user exist
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Wrong email or password");
        // 3.check the password - compare
        const result = await bcrypt.compare(req.body.password, user.password)
        if (!result) return res.status(404).send("Wrong email or password");
        // 4.create token& return a response with token
        const token = jwt.sign({ _id: user._id, email: user.email, role: user.role, imageUrl: user.imageUrl }, process.env.jwtKey)
        res.status(201).send(token)
    } catch (error) {
        res.status(400).send(error)
    }
})




// Update user by params _id 
router.put("/:_id", auth, async (req, res) => {
    try {
        if (req.payload.role != "isAdmin" && req.payload.userId != req.params.userId)
            return res.status(400).send("Only Admin / logged in users are allowed to update user profile")

        //1. joi validation
        const { error } = userCheckSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        //2. Verify&Update user by req _id
        const user = await User.findOneAndUpdate({ userId: req.payload.userId }, req.body, { new: true });
        if (!user) return res.status(400).send("No such user")

        //3. return response
        res.status(200).send(` User updated successfully!!`)

    } catch (error) {
        res.status(400).send(error)
    }
})
//Get logged in user by token
router.get("/", auth, async (req, res) => {
    try {
        //1.Get user by token
        const user = await User.findById(req.payload._id);
        if (!user) return res.status(400).send("No such user")
        //2.Return response
        res.status(200).send(_.pick(user, [
            "firstName",
            "middleName",
            "lastName",
            "phone",
            "email",
            "password",
            "imageUrl",
            "imageAlt",
            "state",
            "country",
            "city",
            "street",
            "houseNumber",
            "zip",
            "role",]))
    } catch (error) {
        res.status(400).send(error)
    }
});

router.delete("/:_id", auth, async (req, res) => {

    try {
        if (req.payload.role != "admin" && req.payload._id != req.params._id)
            return res.status(400).send("Only Admin / logged in users are allowed to update user profile")

        //1. check&get user by req _id
        const user = await User.findOneAndDelete({ _id: req.params._id });
        if (!user) return res.status(400).send("No such user")

        //2. return response
        res.status(200).send(_.pick(user, [
            "firstName",
            "middleName",
            "lastName",
            "phone",
            "email",
            "password",
            "imageUrl",
            "imageAlt",
            "state",
            "country",
            "city",
            "street",
            "houseNumber",
            "zip",
            "role",]))

    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router;
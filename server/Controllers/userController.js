const userModel = require('../Models/userModel')

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validator = require("validator")

// create token for id

const createToken = (_id) => {

    const jwtkey = process.env.JWT_SECRET_KEY

    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" })

}

const registerUser = async (req, res) => {
    // console.log("req", req);
    const { name, email, password } = req.body
    try {

        let user = await userModel.findOne({ email })

        if (user) return res.status(400).json("user with this email already present")

        if (!email || !name || !password) return res.status(400).json("All fields are required")

        if (!validator.isEmail(email)) return res.status(400).json("Email must be valid email")
        if (!validator.isStrongPassword(password)) return res.status(400).json("password must be strong...")

        user = new userModel({ name, email, password });

        // bcrypt 

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        //generate jwt token
        const token = createToken(user._id)

        //send response to front end after store
        res.status(200).json({ _id: user._id, name, email, token })

    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }


};
// login

const loginUser = async (req, res) => {

    const { email, password } = req.body
    try {

        let user = await userModel.findOne({ email });
        if (!user)
            return res.status(400).json("Invalid email or passwor")

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword)
            return res.status(400).json("Incorrect password")

        const token = createToken(user._id)

        res.status(200).json({ _id: user._id, name: user.name, email, token })






    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }

}
// getting all user

const findUser = async (req, res) => {
    const userId = req.params._id;
    try {
        let user = await userModel.findById(userId)
        res.status(200).json(user)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }

}


const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }



}
module.exports = { registerUser, loginUser, findUser, getUsers }
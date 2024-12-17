const bcrypt = require('bcrypt')
const UserModel = require('../Model/User')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try{
        const {name, email, password} = req.body
        const user = await UserModel.findOne({email})

        if(user){
            return res.status(409).json({
                message: "User already exists !",
                success: false
            })
        }

        const userModel = new UserModel({name, email, password})
        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save();
        return res.status(201).json({
            message: "Signup succesfully !",
            success: true
        })

    }catch(err){
        return res.status(500).json({
            message: "Internal server error !",
            success: false
        })
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(403).json({
                message: "Authentication failed | user not found !",
                success: false
            })
        }

        const isPassEqual = await bcrypt.compare(password, user.password)
        if(!isPassEqual){
            return res.status(400).json({ 
                message: "Incorrect password !",
                success: false
            })
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        return res.status(200).json({
            message: "Login succesfully !",
            success: true,
            jwtToken,
            email,
            name: user.name
        })

    }catch(err){
        return res.status(500).json({
            message: "Internal server error !",
            success: false
        })
    }
}

module.exports = {
    signup,
    login
}
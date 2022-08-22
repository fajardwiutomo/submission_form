import User from "../models/User.js"
import bcrypt from 'bcryptjs';
import { createError } from "../errorHandler/errorFiles.js";
import jwt from "jsonwebtoken"


export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(201).json('User has been created')
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})

        if(!user){
            return next(createError(404,"User not found"))
        }

        //compasre password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) {
            return next(createError(400, "username or password did not match"))
        }

        //create token to save cookies
        const token = jwt.sign({id: user._id}, process.env.JWT)

        const {password, ...otherDetails} = user._doc
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({otherDetails, token})
    } catch (error) {
        next(error)
    }
}
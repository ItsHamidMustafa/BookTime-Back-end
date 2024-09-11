const User = require('../models/User')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({ id:user._id, avatar:user.avatar, firstName:user.firstName, lastName:user.lastName, email:user.email, role:user.role, token });
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signupUser = async (req, res) => {
    const {firstName, lastName, email, password } = req.body;

    
    try {
        const user = await User.signup(firstName, lastName, email, password);
        
        const token = createToken(user._id);

        res.status(200).json({...user._doc, token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such user"});
    }

    const user = await User.findByIdAndUpdate(id, { firstName, lastName }, {new: true});
    res.status(200).json({ _id: user.id, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar, role: user.role });
}

module.exports = {loginUser, signupUser, updateUser};
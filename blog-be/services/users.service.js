const User = require("../models/user.model");
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');

const _checkIfUserExists = async (email) => {
    const user = await User.findOne({
        where:  {
                email: email,
        }
    });
    return user;
}

const createUser = async (user) => {
    let existingUser = await _checkIfUserExists(user.email)
    if (!existingUser) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            const newUser = await User.create(user);
            return newUser;
    } else {
        error = new Error('User with that email already exists')
        error.status = 400
        throw error
    }
}

module.exports = { createUser }
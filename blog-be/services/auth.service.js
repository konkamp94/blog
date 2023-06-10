const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const _checkIfUserExists = async (email) => {
    const user = await User.findOne({
        where:  {
                email: email,
        }
    });
    return user;
}

const authenticateUser = async (user) => {
    const existingUser = await _checkIfUserExists(user.email)
    if (existingUser) {
        const isMatch = await bcrypt.compare(user.password, existingUser.password);
        if (isMatch) {
            const payload = {
                id: existingUser.id,
                email: existingUser.email,
                firstname: existingUser.firstname,
                lastname: existingUser.lastname
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            return token;
        } else {
            error = new Error('Invalid password')
            error.status = 401
            throw error
        }
    } else {
        error = new Error('User with that email does not exist')
        error.status = 401
        throw error
    }

}

module.exports = { authenticateUser }
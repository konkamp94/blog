const express = require('express');
const requiredFields = require('../middlewares/validators');
const { createUser } = require('../services/users.service');
const router = express.Router();

router.post('/', requiredFields(['email', 'password', 'firstname', 'lastname']), 
    async (req, res, next) => {
        // TODO: validate email and password(characters, length, etc.)
        try {
            const newUser = await createUser(req.body)
            res.status(201).json(newUser);
        } catch (err) {
            next(err)
        }
    })

module.exports = router;
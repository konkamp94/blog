const express = require('express');
const requiredFields = require('../middlewares/validators');
const { createUser } = require('../services/users.service');
const authenticateToken = require('../middlewares/auth');
const User = require('../models/user.model');
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
});

router.get('/:userId/get-favourite-posts', authenticateToken, async (req, res, next) => {
    try {
        if (req.user.id.toString() !== req.params.userId) { const error = new Error('Unauthorized'); error.status = 403; throw error; }

        const { page, size } = req.query;
        if(!page || !size) { const error = new Error('Missing query parameters'); error.status = 400; throw error; }

        const user = await User.findByPk(req.params.userId);
        if(!user) { const error = new Error('User not found'); error.status = 404; throw error; }
        const favouritePosts = await user.getFavoritePosts({limit: size, offset: page * size});
        const countFavouritePosts = await user.countFavoritePosts();

        res.json({count: countFavouritePosts, rows: favouritePosts})
    } catch(err) {
        next(err)
    }
})
module.exports = router;
const express = require('express');
const requiredFields = require('../middlewares/validators');
const router = express.Router();
const { authenticateUser } = require('../services/auth.service');

// TODO: could create a refresh token mechanism
router.post('/login', requiredFields(['email', 'password']), async (req, res, next) => {

    try {
        token = await authenticateUser(req.body)
        res.status(200).json({ token: token })
    } catch (err) {
        next(err)
    }
    
})

module.exports = router;
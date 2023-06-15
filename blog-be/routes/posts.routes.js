const express = require('express');
const requiredFields = require('../middlewares/validators');
const router = express.Router();
const User = require('../models/user.model');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const authenticateToken = require('../middlewares/auth');

// TODO: refactor routes with the business logic in services, add transaction logic
router.get('/', authenticateToken, async (req, res, next) => {
    try {
        const { page, size } = req.query;
        const posts = await Post.findAndCountAll({limit: size, 
                                                  offset: page * size,
                                                  include: [{model: User, as: 'usersLiked', where: {id: req.user.id}, required:false, attributes: ['id']}],
                                                  order: [["createdAt", "DESC"]]
                                                });
        posts.rows.map(post => {
            post.dataValues.usersLiked.length > 0 ? post.dataValues.likedByUser = true : post.dataValues.likedByUser = false;
            delete post.dataValues.usersLiked
            return post
        })
        res.json(posts)
    } catch(err) {
        next(err)
    }
});

router.get('/:id', authenticateToken, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: {id: req.params.id},
            include: [{model: User, as: 'usersLiked', where: {id: req.user.id}, required:false, attributes: ['id']}]
        });

        if(!post) { const error = new Error('Post not found'); error.status = 404; throw error; }
        const comments = await Comment.findAll({where: {jsonPlaceholderPostId: post.jsonPlaceholderId}});
        post.dataValues.comments = comments;
        post.dataValues.usersLiked.length > 0 ? post.dataValues.likedByUser = true : post.dataValues.likedByUser = false;
        delete post.dataValues.usersLiked
        res.json(post)
    } catch(err) {
        next(err)
    }
});

router.post('/user/:userId/favourite', authenticateToken, requiredFields(['postIds']), async (req, res, next) => {

    try {
        if (req.user.id.toString() !== req.params.userId) { const error = new Error('Unauthorized'); error.status = 403; throw error; }
        const like = req.query.like === 'false' ? false : true;
    
        const user = await User.findByPk(req.params.userId);
        if(!user) { const error = new Error('User not found'); error.status = 404; throw error; }


        for(let postId of req.body.postIds) {
            const post = await Post.findByPk(postId);
            if(!post) { const error = new Error(`Post with id: ${postId} not found`); error.status = 404; throw error; }
            like ? await user.addFavoritePost(post) : await user.removeFavoritePost(post);
        }
        res.status(200).json({message: 'Favourite posts updated'})
    }
    catch(err) {
        next(err)
    }
});


module.exports = router;
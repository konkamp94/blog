const axios = require('axios');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');

const fillDatabase = async () => {
    const postCount = await Post.count();
    const commentCount = await Comment.count();
    if (postCount > 0 && await commentCount > 0) {
        return;
    }
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const posts = response.data;
    for(let post of posts) {
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
        const commentResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        const user = userResponse.data;
        if( postCount == 0) {
            await Post.create({
                jsonPlaceholderId: post.id,
                author: user.name,
                title: post.title,
                body: post.body
            })
        }
        if (commentCount == 0) {
            for(let comment of commentResponse.data) {
                await Comment.create({
                    jsonPlaceholderId: comment.id,
                    jsonPlaceholderPostId: comment.postId,
                    name: comment.name,
                    email: comment.email,
                    body: comment.body
                })
            }
        }
    }
}

module.exports = fillDatabase;
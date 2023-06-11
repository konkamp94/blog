const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');
const Comment = require('./comment.model');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jsonPlaceholderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

User.belongsToMany(Post, {
    through: "UserPostFavorite",
    as: "favoritePosts",
    foreignKey: "user_id",
  });
  
Post.belongsToMany(User, {
    through: "UserPostFavorite",
    as: "usersLiked",
    foreignKey: "post_id",
});

Post.hasMany(Comment, { onDelete: 'CASCADE', hooks: true });
Comment.belongsTo(Post, {});
module.exports = Post;
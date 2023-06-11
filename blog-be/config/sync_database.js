const sequelize = require('./database');
const fill_database = require('./fill_database');
const { User } = require('../models/user.model');
const { Post } = require('../models/post.model');

const sync_database = async () => {
    try {
        await sequelize.sync({});
        console.log('Connection has been established successfully.');
        await fill_database();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = sync_database
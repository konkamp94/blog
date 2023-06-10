const sequelize = require('./database');
const { User } = require('../models/User');

const sync_database = async () => {
    try {
        await sequelize.sync({});
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = sync_database
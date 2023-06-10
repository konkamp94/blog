const { Sequelize } = require('sequelize');
// TODO use env variables for db connection
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5433/postgres');

module.exports = sequelize;
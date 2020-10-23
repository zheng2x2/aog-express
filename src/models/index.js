const Sequelize = require('sequelize');
const User = require('./user');
const Word = require('./word');
const Hint = require('./hint');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {}

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
db.sequelize = sequelize;

db.User = User;
db.Word = Word;
db.Hint = Hint;

User.init(sequelize); //CREATE TABLE IF NOT EXISTS "users"
Word.init(sequelize); //CREATE TABLE IF NOT EXISTS "words"
Hint.init(sequelize); //CREATE TABLE IF NOT EXISTS "hints"

User.associate(db);
Word.associate(db);
Hint.associate(db);

module.exports = db;
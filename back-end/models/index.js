 const sequelize=require('./db.js');

const User=sequelize.import('user',require('./User.js'))

const Review=sequelize.import('review',require('./Review.js'))

User.hasMany(Review)

module.exports={User, Review, sequelize}
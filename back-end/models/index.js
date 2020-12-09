 const sequelize=require('./db.js');

const Users=sequelize.import('user',require('./User.js'))

const Reviews=sequelize.import('review',require('./Review.js'))

Users.hasMany(Reviews)

module.exports={Users, Reviews, sequelize}
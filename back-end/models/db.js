
const {Sequelize}=require('sequelize')

const sequelize=new Sequelize('appDb','root','mariadb',{
    dialect:"mysql",

})

module.exports=sequelize
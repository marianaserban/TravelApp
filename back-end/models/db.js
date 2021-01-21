
const {Sequelize}=require('sequelize')

const sequelize=new Sequelize('appDb','root','mariana',{
    dialect:"mysql",

})

module.exports=sequelize
const {Sequelize}=require('sequelize')
module.exports=(sequelize)=>{
    return sequelize.define('user',{
        name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          surname: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email:{
              type: Sequelize.STRING,
              allowNull: false
          },
          password:{
              type: Sequelize.STRING,
              allowNull: false
          }
    },{
        underscored:true
    })
}

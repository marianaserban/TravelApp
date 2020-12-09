const {Sequelize}=require('sequelize')

 module.exports=(sequelize)=>{
    return sequelize.define('review',{
        origin: {
            type: Sequelize.STRING,
            allowNull: false
          },
          destination: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          meanOfTransport:{
              type: Sequelize.ENUM,
              allowNull: false,
              values: ['METRO', 'BUS','TRAM']
          
          },
          departureHour:{
              type: Sequelize.TIME,
              allowNull: false
          },
          tripDuration:{
              type: Sequelize.INTEGER,
              allowNull: false
          },
          crowdedness :{
              type: Sequelize.INTEGER, //-1,0,1
              allowNull: false
          },
          observations:{
              type: Sequelize.STRING, //-1,0,1
          },
          satisfactionLevel:{
              type: Sequelize.INTEGER, //-1,0,1
              allowNull: false
          }
    },{
        underscored:true
    })
}

const express=require('express')
const bodyParser = require('body-parser') 
const router = require('./routes/create')
const sequelize=require('sequelize')
const app = express()  
const port=8080
//const cors=require('cors')

//app.use(cors())

app.use(bodyParser.json())

app.listen(port, () => {    //Turn on server
    console.log('Serverul ruleaza pe portul: ' + port)
  })
  
  app.use('/',router)
  
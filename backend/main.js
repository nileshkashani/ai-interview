const express = require('express')
const app = express()
const sequelize = require('./config/mysql')
const Interview = require('./model/interview')
const interviewRoutes = require('./router/interviewRoutes')
const cors = require('cors')


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}))
app.use(express.json())
app.use('/interview', interviewRoutes)



async function start() {
  await sequelize.authenticate()
  await sequelize.sync()
  console.log('Database connected & synced')
}

start()

app.listen(8080);
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()
const PORT  = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // parse JSON data & add it to the request.body object
app.use(cors())
app.use(logger('combined'))

mongoose.set('strictQuery', true)
// Event handlers for successful connection and connection error
mongoose.connect(process.env.DB_URL)
// FIRST CONNECT TO MONGODB THEN START LISTENING TO REQUESTS
  .then((connect) => {
    console.log(`MongoDB Connected to Host: ${connect.connection.host}`)
    
    app.listen(PORT, () => {
      console.log(`Listening all requests on port ${PORT}`)
    })
  })
// IF DB CONNECT FAILED, CATCH ERROR
  .catch((error) => {
    console.log("Can't connect to DB:", error.message)
  })

/* ---------HOME PAGE ROUTE-------- */
app.get('/', (req, res) => {
  console.log(req.headers)
  res.status(200).send('<h2>Movie Booking Backend Running! 🎥</h2>')
})
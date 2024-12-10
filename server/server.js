const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const PORT = process.env.PORT || 3000

// middlewares
app.use(express.json())
// app.use(express.urlencoded({extended: false}))
// app.use(express.static("public"));

// connect to the mongodb database
connectDB()

app.get('/', (req, res)=>{
    return res.status(200).send({status: true, message: "wokring"})
})
app.use('/api/items', cors(), require("./routes/items"))
app.use('/api/users',cors(), require("./routes/users"))
app.use('/api/payment', cors(), require("./routes/payment"))

app.listen(PORT, console.log("Server is running on port ", PORT))
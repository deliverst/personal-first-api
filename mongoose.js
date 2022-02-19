const mongoose = require('mongoose')
const Note = require("./models/Note");
require('dotenv').config()
const connectionString = process.env.CONNECTIONDATABASE

mongoose.connect(connectionString).then(() => {
    console.log('Connection Database')
}).catch((err) => {
    console.log(err)
})

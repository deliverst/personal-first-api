const { Schema, model } = require('mongoose')
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: Date,
    lastUpdate: Date
})

noteSchema.set("toJSON", ({
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id
        delete returnObject.__v
        delete returnObject._id
    }
}))

const Note = model('Note', noteSchema)

module.exports = Note
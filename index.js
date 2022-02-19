const express = require('express')
require('./mongoose')
const app = express();
require('dotenv').config()
const Note = require('./models/Note')
const morgan = require('morgan')
const handleErrors = require('./middelwares/handleErrors')
const notFound = require('./middelwares/404')

// MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json())

// HOME GET
app.get('/', (req, res) => {
    res.send('<h1>Página de Inicio</h1>')
})
// GET ALL NOTES
app.get('/api/notes', (req, res) => {
    console.log('hola como estas')
    Note.find({}).then(notes => {
        res.json(notes)
        // mongoose.connection.close()/**/
    }).catch((err) => {
        console.log(err)
    })
})

// GET SPECIFY NOTE
app.get('/api/notes/:id', (req, res, next) => {
    const {id} = req.params
    console.log(id)
    Note.findById(id).then(note => {
        if (note) {
            return res.json(note)
        } else {
            res.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

// POST
app.post('/api/notes', (req, res) => {
    const info = req.body
    if (!info || !req.body.body || !req.body.title) {
        return res.status(400).json({error: 'note.content is missing'})
    }

    const newNote = new Note({
        title: req.body.title,
        body: req.body.body,
        date: new Date(),
        lastUpdate: null,
    })

    newNote.save().then(savedNote => res.json(savedNote))
})

// DELETE
app.delete('/api/notes/:id', (req, res) => {
    const {id} = req.params
    console.log(id)
    Note.findByIdAndDelete(id)
        .then(() => res.status(204).end())
        .catch(err => netx(err))
})

// PUT
app.put('/api/notes/:id', (req, res, next) => {
    const {id} = req.params
    const {title, body} = req.body

    const newInfo = {
        title: title,
        body: body,
        lastUpdate: new Date()
    }

    Note.findByIdAndUpdate(id, newInfo, {new: true})
        .then(result => res.json(result))
        .catch(err => next(err))
})

app.use(handleErrors)
app.use(notFound)

app.listen(process.env.PORT, () => {
    console.log(`Puerto corriendo en el peurto ${process.env.PORT}`)
})
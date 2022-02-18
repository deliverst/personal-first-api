const express = require('express')
const app = express();
require('dotenv').config()


// HOME GET
app.get('/', (req, res) => {
    res.send({mensaje: 'mensaje exitoso'})
})

app.get('/api/:id', (req, res) => {
    res.send('aqui te mandamos solo una nota)
})



app.listen(process.env.PORT, () => {
    console.log(`Puerto corriendo en el peurto ${process.env.PORT}`)
})
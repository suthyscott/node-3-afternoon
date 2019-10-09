require('dotenv').config()

const express = require('express');
const massive = require('massive')

const pc = require('./products_controller')

const app = express()

const {SERVER_PORT, CONNECTION_STRING} = process.env

// should db be bdInstance?
massive(CONNECTION_STRING).then(db => {
    // What is app in this case?
    app.set('db', db)
    console.log('DB connected')
})
.catch(err => console.log(err))

// What is app in this case?
app.use(express.json())

app.get('/api/products', pc.getAll)
app.get('/api/products/:id', pc.getOne)
app.put('/api/products/:id', pc.update)
app.post('/api/products', pc.create)
app.delete('/api/products/:id', pc.delete)


app.listen(SERVER_PORT, () => console.log(`Take us to warp ${SERVER_PORT}!`))
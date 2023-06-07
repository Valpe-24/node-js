const cors = require('cors')
const express = require('express')
const pool = require('./PromisePool').promisePool
const { body, check, param, validationResult } = require('express-validator')

const PORT = 8080
const app = express()
const corsOptions = { origin: ['http://localhost:3000'], optionsSuccessStatus: 200 }

// Middleware...
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Your endpoints here..
app.get('/message', cors(corsOptions), async(req, res) => {
    res.send({message: 'Hello world!!'})
})

//ex#2

// app.get('/cars/:id', cors(corsOptions), async(req, res) =>{
    //const result = await pool.query('SELECT * FROM cars)
    // const body = result[0]
    // res.send(body)

// }


app.listen(PORT, () => {
    console.log(`Express web API running on port: ${PORT}.`)
})

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

app.get('/cars/:id', cors(corsOptions), async(req, res) =>{
    let car_id = req.params['id']
    const [result] = await pool.query('SELECT * FROM car where car_id = ?',[car_id])
    // const body = result[0]
    res.send(result)

})

//ex#3

app.get('/cars', cors(corsOptions), async(req, res) =>{
    let make = req.query['make']
    const [result] = await pool.query('SELECT * FROM car where make = ?',[make])
   
    res.send(result)

})

//ex#4

app.post('/cars/', cors(corsOptions), async(req, res) =>{
    const {model, make, color, price} = req.body;
    const [result] = await pool.execute('INSERT INTO car (model, make, color, price) values (?, ?, ?, ?)',  
    [model, make, color, price]);
    //res.status(200).json({message: "new car inserted"})
    res.send(result)
})

//ex#5

app.put('/cars/', cors(corsOptions), async(req, res) =>{
    const {car_id, model, make, color, price} = req.body;
    const result = await pool.execute('UPDATE car SET model = ?, make = ?, color = ?, price = ? WHERE car_id = ?',  
    [model, make, color, price, car_id]);
    
    res.send(result[0])
})


app.listen(PORT, () => {
    console.log(`Express web API running on port: ${PORT}.`)
})

require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')
const PORT = process.env.PORT

const app = express();

require('./Model/db')


app.use(bodyParser.json())
app.use(cors())
app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)

app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`)
})

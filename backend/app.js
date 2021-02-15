const express = require('express');
const app = express();
const logger = require('morgan')
const connectToDB = require('./config/db')
const PORT = 5500;

//config
app.use(logger('dev'))
app.use(express.json())

app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening to port ${PORT}`)
})

//DB config
connectToDB()
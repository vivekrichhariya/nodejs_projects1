const express = require('express')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 5000
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs : 10 * 60 * 1000, //10 minute
    max : 5
})
const app = express()
app.use(limiter)
app.set('trust proxy',1)
app.use('/api',require('./routes/weather'))
app.use(cors())



app.listen(PORT,()=>{
    console.log(`weather service running on port ${PORT}`);
})
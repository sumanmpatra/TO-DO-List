const express = require('express')
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./connectDB')
const taskRoutes = require('./Routes/taskRoutes')

const app = express()

const BACKEND_URL = process.env.BACKEND_URL || 4000
app.use(cors())
app.use(express.json());

connectDB()
app.use('/api', taskRoutes)

app.listen(BACKEND_URL, () => {
    console.log(`Server is listening on BACKEND_URL ${BACKEND_URL}`)
})

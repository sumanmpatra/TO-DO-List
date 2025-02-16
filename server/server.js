const express = require('express')
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./connectDB')
const taskRoutes = require('./Routes/taskRoutes')

const app = express()

const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json());

connectDB()
app.use('/api', taskRoutes)

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})

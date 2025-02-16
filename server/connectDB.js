const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('Connected to Database')
    }
    catch(error){
        console.error(`Error: ${error}`)
    }
}
module.exports = connectDB
const mongoose = require('mongoose')
require('dotenv').config()
const TaskModel= require('./models/Task')

const MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL).then(async () => { 
    const task =  new TaskModel({
        title : 'Luigi',
        description : 'Help Mario'
    })
    await task.save()
    console.log('Data added')
})
.catch((error) => {
    console.log(`Error : ${error}`)
})
const mongoose = require('mongoose')
require('dotenv').config();


mongoose.connect(process.env.DATABASE_URL)
    .then(() => { console.log("mongo connected") })
    .catch(() => { console.log("Connection error") })

//schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    }
})


// model
const userModel = new mongoose.model("user", userSchema)


module.exports = userModel
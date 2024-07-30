const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("Connection error:", err);
    });

console.log("Database URL:", process.env.DATABASE_URL);

// Schema
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
});

// Model
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.error("Connection error:", error);
});

console.log("Database URL:", process.env.DATABASE_URL);

// Schema definition
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,  // Trims whitespace from the beginning and end
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: String,
        required: true,
        trim: true,
    },
    detail: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt timestamps
});

// Create indexes on frequently queried fields
userSchema.index({ name: 1 });
userSchema.index({ date: 1 });

// Model
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

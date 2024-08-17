const express = require('express');
const path = require('path');
const userModel = require('./models/user');
const dotenv = require("dotenv");
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set("views", path.resolve('./views'));

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    return res.render('home');
});

app.get('/event', async (req, res) => {
    let allUsers = await userModel.find();
    return res.render('event', { users: allUsers });
});

app.get('/delete/:id', async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.id });
    return res.redirect('/event');
});

app.get('/edit/:id', async (req, res) => {
    let editUser = await userModel.findOne({ _id: req.params.id });
    return res.render('edit', { editUser });
});

app.post('/update/:id', async (req, res) => {
    let { name, image, detail, date } = req.body;
    await userModel.findOneAndUpdate({ _id: req.params.id }, { name, image, date, detail }, { new: true });
    return res.redirect('/event');
});

app.post('/create', async (req, res) => {
    let { name, image, date, detail } = req.body;
    await userModel.create({ name, image, date, detail });
    res.redirect('/event');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(process.env.PORT, () => { console.log("server connected", process.env.PORT) });

module.exports = app;

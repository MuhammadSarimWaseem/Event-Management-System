const express = require('express')
const path = require('path')
const userModel = require('./models/user')
const dotenv = require("dotenv")
dotenv.config();

const app = express()

app.set('view engine', 'ejs');
app.set("views", path.resolve('./views'))

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//routes

app.get('/', (req, res) => {
    return res.render('home')
})

app.get('/event', async (req, res) => {
    let allUsers = await userModel.find()
    return res.render('event', { users: allUsers })
})

app.get('/delete/:id', async (req, res) => {

    let deleteuser = await userModel.findOneAndDelete({ _id: req.params.id })
    return res.redirect('/event')
})

app.get('/edit/:id', async (req, res) => {
    let editUser = await userModel.findOne({ _id: req.params.id })
    return res.render('edit', { editUser })
})

app.post('/update/:id', async (req, res) => {
    let { name, image, detail, date } = req.body
    let editUser = await userModel.findOneAndUpdate({ _id: req.params.id }, { name, image, date, detail }, { new: true })
    return res.redirect('/event')
})

app.post('/create', async (req, res) => {
    const { name, image, date, detail } = req.body;
    try {
        await userModel.create({ name, image, date, detail });
        res.redirect('/event');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(process.env.PORT, () => { console.log("server connected", process.env.PORT) })

module.exports=app
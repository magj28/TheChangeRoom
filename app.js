const express = require('express');
const app = express();
const session = require('express-session')
const mongoDbSession = require('connect-mongodb-session')(session)
const server = require('http').createServer(app);

const bodyParser = require('body-parser');

const dotenv = require("dotenv");

dotenv.config();

var PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const uri = 'mongodb+srv://hemangijain:g0ldf1sh@cluster0.q62pz.mongodb.net/TheChangeRoom?retryWrites=true&w=majority';

mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected correctly to server');
});

const store = new mongoDbSession({
    uri: uri,
    collection: "mySessions",
})

const Server = server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
});

//Importing controllers
const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const recRoute = require('./routes/recommendation');
const authRoute = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//initializing routes
app.use('/user', userRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);
app.use('/rec', recRoute);
app.use('/auth', authRoute);
app.use(session({
    secret: "thehangeroom",
    resave: false,
    saveUninitialized: false,
    store: store,
}))

//404 page
app.use((req, res) => {
    res.status(404).json({
        status: "failure",
        message: "This route does not exist",
        data: null
    })
})


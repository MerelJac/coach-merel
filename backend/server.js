const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const sequelize = require('./config/connection');
const routes = require('./controllers')
// create session capabilities
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
// import mongoDB
const { MongoClient } = require('mongodb')

// Mongo Set Up
const connectionStringURI = process.env.MONGODB_STRING_URI
const client = new MongoClient(connectionStringURI)
let db;
const dbName = process.env.MONGODB_NAME;

// create backend server
const app = express();
const PORT = process.env.PORT || 3002;

//middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(routes)

// set up session cookie
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
    }, 
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess))

// TODO - move this to it's own file structure 
// mongoDB seed data 
const attributeData = [ 
    {
    attribute_title: "Grip",
    attribute_options: ["Neutral Grip", "Wide Grip", "Reverse Grip", "Narrow Grip", "Close Grip"]
    },{
    attribute_title: "Balance",
    attribute_options: ["Single Leg", "Single Arm", "Balance"]
    }]

// connect mongoDB, SQL, and start server
client.connect()
    .then(() => {
        console.log('Connected succesfully to MongoDB');
        db = client.db(dbName);
        // delete current seeds 
        db.collection('Attributes').deleteMany({});
    }).then(() => {
        const res = db.collection('Attributes').insertMany(attributeData);
        console.log(res)
    })
    .then(() => {
        sequelize.sync({ force: false })
    })
    .then(() => {
app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
})
}).catch((err) => {
    console.log(err.message)
})

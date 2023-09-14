const express = require('express');
const cors = require('cors');
//import mongo
const db = require('./config/connection');
// import routes
const routes = require('./controllers')
// create session capabilities
const session = require('express-session')

// create backend server
const app = express();
const PORT = process.env.PORT || 3002;

// // set up sessions
// const sess = {
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }

// app.use(session(sess))

//middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// routes middleware must be last
app.use(routes)

// connect mongoDB and start server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`listening on port http://localhost:${PORT}`)
})
})

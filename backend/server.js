const express = require('express');
const cors = require('cors');
const db = require('./config/connection');
const routes = require('./controllers')
// create session capabilities
const session = require('express-session')
// import mongoDB
// const { MongoClient } = require('mongodb')

// create backend server
const app = express();
const PORT = process.env.PORT || 3002;

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

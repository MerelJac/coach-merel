const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const sequelize = require('./config/connection');
const routes = require('./controllers')

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(routes)

sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
})
})

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());

app.get('/', (req, res) => {
    return res.json('from backend')
})

app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
})

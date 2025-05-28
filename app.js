// app.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello from Express!!!');
});

const todoRouter = require('./routes/todos')

app.use('/todos', todoRouter)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

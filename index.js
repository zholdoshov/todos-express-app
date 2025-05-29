// app.js
const express = require('express');
const app = express();
const todoRouter = require('./src/routes/todos')
const authRouter = require('./src/routes/auth')

const authenticate = require('./src/middleware/authenticate');

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello from Express!!!');
});

app.use('/auth', authenticate, authRouter)
app.use('/todos', todoRouter)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

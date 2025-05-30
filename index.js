// app.js
const express = require('express');
const app = express();
const todoRouter = require('./src/routes/todos')
const authRouter = require('./src/routes/auth')
const userRouter = require('./src/routes/users')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authenticate = require('./src/middleware/authenticate');

app.use(cookieParser()); // To parse cookies
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

app.use(
    cors({
        origin: "*",
    })
);

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Todos App API is running');
});

// Public routes
app.use('/auth', authRouter)
app.use('/todos', todoRouter)

app.use(authenticate); // Apply authentication middleware globally

// Protected routes
app.use('/users', userRouter)
// app.use('/todos', todoRouter)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

const express = require('express');
const connectDB = require('./config/db');

// routes
const profileRoute = require('./routes/profile');
const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

// instance
const app = express();

// init middlewares
app.use(express.json());

// connecting to the Database
connectDB();

//
app.get('/', (req, res) => res.send('API running'));

// routes middlewares
app.use('/api/profile', profileRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/auth', authRoute);

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require('path')
const express = require('express')
const connectDB = require('./config/db')

const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')

// Connect Database & Init app
connectDB()
const app = express()

// init middlewares
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(compression())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/profile', require('./routes/profile'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.port || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

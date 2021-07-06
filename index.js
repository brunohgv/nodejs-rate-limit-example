const express = require('express')
const rateLimit = require('express-rate-limit')
const app = express()

const PORT = 3000

// Create the rate limit rule
const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 2, // limit each IP to 2 requests per windowMs
    handler: function (req, res) {
        return res.status(429).json({
            error: 'You sent too many requests. Please wait a while then try again'
        })
    }
})

// Use the limit rule as an application middleware
app.use(apiRequestLimiter)

app.get('/', function (req, res) {
  return res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
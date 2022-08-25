const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const userRoute = require('./routes/userRoute')

const app = express()
app.use(express.json())
dotenv.config()
connectDB()

app.use('/api/users', userRoute)

app.get('/', (req, res) => {
    res.send("Server is Working!")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on Port ${PORT}`))
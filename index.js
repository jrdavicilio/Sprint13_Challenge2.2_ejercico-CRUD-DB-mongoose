const express = require ('express')
const app = express()
const PORT = 3000
const dbConnection = require ('./config/config')
const routes = require ('./routes/tasks')

app.use(express.json())

app.use('/tasks', routes)

dbConnection()


app.listen (PORT, () => {
    console.log(`Servers started on port http://localhost:${PORT}`)
})
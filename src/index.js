const express = require('express')
const router = require('./routes/bookRouter')
const app = express()

app.use(express.json())
app.use(router)

const port = 8080
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
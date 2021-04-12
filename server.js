const express = require('express')
const app = express()

const port = process.env.PORT || 3001

app.use(express.static('./frontend/build'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
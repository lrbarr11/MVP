const express = require('express')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.json());
app.use(express.static(__dirname + "/../client/dist"))


const port = process.env.PORT || 3000



app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
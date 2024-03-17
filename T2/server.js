// const http = require("http")

// const hostname = '127.0.0.1'
// const port = 3000

// const server = http.createServer((res, req) => {
//     res.end("Hello World from Node.js")
// })

// server.listen(port, hostname, () => {
//     console.log(`Server is running at http://${hostname}:${port}`)
// })

const express = require("express")

const app = express()

app.get('/hello', (req, res) => {
    res.send("Hello world form Node.js!!!")
})


app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})
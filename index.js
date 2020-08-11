const express = require("express")
const postsRouter = require("./posts-router")

const server = express()
const port = 4001

server.use(express.json())
server.use(postsRouter)


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
require('dotenv').config()
const express = require("express")
const postsRouter = require("./posts-router")

const server = express()
const port = process.env.PORT || 4001

server.use(express.json())
server.use(postsRouter)

server.get('/', (req, res) => {
    try {
        const messageOfTheDay = process.env.MOTD || 'Hello, World!'
        res.status(200).json({ motd: messageOfTheDay})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Can't retrieve message of the day!" })
    }
})


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
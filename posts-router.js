const express = require("express")
const posts = require("./data/db")

const router = express.Router()

// GET req for all posts in the database
router.get("/api/posts", (req, res) => {
    posts.find()
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) => {
        res.status(500).json({
            error: "The posts information could not be retrieved."
        })
    })
})

// GET req for posts by ID
router.get("/api/posts/:id", (req, res) => {
    posts.findById(req.params.id)

    .then((post) => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    })
})


// GET req for comments on a specific post - insomina test not displaying comment but works in the browser
router.get("/api/posts/:id/comments", (req, res) => {
    posts.findPostComments(req.params.id)

    .then((post) => {
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "The comments information could not be retrieved."
        })
    })
})

// POST req to create a post
router.post("/api/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
    posts.insert(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                error: "There was an error while saving the post to the database."
            })
        })
})

// POST req to add comment to specific post - NOT DONE ERROR IN INSOMNIA
router.post("/api/posts/:id/comments", (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({
            errorMessage: "Please provide text for the comments"
        })
    }
    
    posts.insertComment(req.params.id, req.body)
            .then((post) => {
                res.status(201).json(post)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    error: "There was an error while saving the comment to the database."
                })
            })
})

module.exports = router
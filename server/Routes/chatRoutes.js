const express = require("express")

const { findUserChat, findChat, createChat } = require("../Controllers/chatController")

const chatRoutes = express.Router()

chatRoutes.get("/", createChat)
chatRoutes.post("/:userId", findUserChat)
chatRoutes.post("/find/:firstId/:secondId", findChat)




module.exports = chatRoutes



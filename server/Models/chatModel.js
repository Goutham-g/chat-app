const mongoose = require("mongoose")
//collection to store chat 
const chatSchema = new mongoose.Schema(
    {
        members: Array,
    },
    {
        timestamps: true
    }
)

const chatModel = mongoose.model("chat", chatSchema)

module.exports = chatModel


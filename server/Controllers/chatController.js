const chatModel = require('../Models/chatModel')
// create chat
//findUserChats
//findChat

//  1. create chat 

const createChat = async (req, res) => {
    const { firstId, secondId } = req.params

    try {
        //check if any chat exist b/w these two id
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        })

        if (chat)
            return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId]
        })
        const response = await newChat.save()
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }


}

// 2.find user chat that is currently logged

const findUserChat = async (req, res) => {
    const { userId } = req.params.userId
    try {
        const chat = await chatModel.find({
            members: { $in: [userId] }

        })
        res.status(200).json(chat)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }



}

// find chat when search a name

const findChat = async (req, res) => {
    const { firstId, secondId } = req.params

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        });

        res.status(200).json(chat)

    } catch (error) {
        res.status(500).json(chat)

    }


};
module.exports = { createChat, findUserChat, findChat }



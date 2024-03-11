// connect env file
require('dotenv').config()

//import user router
const router = require('./Routes/userRoutes')

//import chat routes
const chatRoutes = require('./Routes/chatRoutes')


const express = require('express')
const cors = require('cors')




//Import connection file

require('./database/mongCon')

const server = express()
server.use(cors())   //tell server to use cors
server.use(express.json()) // convert to json

//middleware
server.use("/api/users", router)

//chat route middleware
server.use("/api/chats", chatRoutes)


// server.get('/', (req, res) => {
//     res.send('Welcome to chat app...')
// })

//integrate react port
// const port = 4000 || process.env.port
const port = process.env.PORT || 4000;

//export upload folders to client
// server.use('/uploads', express.static('./uploads'))


server.listen(port, () => {
    console.log(`------Ems server Started at port ${port}--------`);
})

import express from "express"
import http from "http"
import { WebSocketServer } from "ws"
import { UserManager } from "./lib/UserManager"
import { InMemoryStore } from "./store/InMemoryStore"
import { IncomingSupportedMessage, InitMessage, UpvoteMessage, UserMessage } from "./lib/validators/IncomingMessage"
import { OutgoingMessage, OutgoingSupportedMessage } from "./lib/validators/OutgoingMessage"

const userManager = new UserManager()
const store = new InMemoryStore()

const app = express()

const server = http.createServer(app)

const wss = new WebSocketServer({ server })

wss.on("connection", (ws, req) => {
  console.log("user connected")
  ws.on("message", (data, isBinary) => {
    const message = JSON.parse(data.toString())

    // If user already exists and try to reconnect update the socket variable in database
    // Optimize it because every time message comes it updates the ws variable. optimize it using ws.on("open")
    const user = userManager.getUser({ roomId: message.payload.roomId, userId: message.payload.userId })
    if(message.payload.userId === user?.id) {
      userManager.updateUser({ roomId: message.payload.roomId, userId: message.payload.userId, socket: ws })
    }

    messageHandler(ws, message)
  })
})

function messageHandler(ws: any, message: any) {
  // Join Room
  if(message.type === IncomingSupportedMessage.JoinRoom) {
    const { roomId, userId, username } = InitMessage.parse(message.payload)

    // inittializing room 
    store.initRoom(roomId)

    userManager.addUser({ roomId, userId, username, socket: ws})

    console.log("User added")
    return;
  }

  if(message.type === IncomingSupportedMessage.SendMessage) {
    const { message: text, userId, username, roomId } = UserMessage.parse(message.payload)

    const user = userManager.getUser({ roomId, userId })

    if(!user) {
      console.error("User not found in db")
      return;
    }

    // Adding chat to Inmemory DB
    let chat = store.addChat({ roomId, userId, username, message: text })

    if(!chat) {
      return;
    }
    // Broadcasting this message to every one
    const outgoingPayload: OutgoingMessage = {
      type: OutgoingSupportedMessage.AddChat,
      payload: {
        chatId: chat.id,
        roomId,
        username,
        message: text,
        upvotes: 0,
        downvotes: 0
      }
    }

    userManager.broadcast({ roomId, userId, message: outgoingPayload })
    return;
  }

  if(message.type === IncomingSupportedMessage.UpvoteMessage) {
    const { roomId, userId, chatId } = UpvoteMessage.parse(message.payload)

    // Checking if user exists in the room
    const user = userManager.getUser({ roomId, userId})
    if(!user) {
      return;
    }

    // Adding the upvote of user to InMemoryDB
    const chat = store.upvote({ roomId, userId, chatId })

    if(!chat) {
      return;
    }

    const outgoingPayload: OutgoingMessage = {
      type: OutgoingSupportedMessage.UpvoteChat,
      payload: {
        chatId,
        roomId,
        upvotes: chat.upvote.length
      }
    }

    userManager.broadcast({ roomId, userId, message: outgoingPayload })
    return;
  }
}

server.listen(5000, () => console.log(`Server is running on port: ${process.env.PORT}`))
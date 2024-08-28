import { v4 as uuidV4 } from "uuid"

export interface Message {
  id: string
  userId: string
  username: string
  text: string
  upvote: string[] // we have to store who has upvoted what not number of upvotes
  downvote: string[]
}

export interface Room {
  roomId: string
  chats: Message[]
}

interface GetChatProps {
  roomId: string
  limit: number
  offset: number
}

interface AddChatProps {
  roomId: string
  userId: string
  username: string
  message: string
}

// Implement by yourself
interface DeleteChatProps {

}

interface VoteProps {
  roomId: string
  userId: string
  chatId: string
}

export class InMemoryStore {
  private store: Map<string, Room>

  constructor() {
    this.store = new Map<string, Room>()
  }

  // storing the data of new Room created
  initRoom(roomId: string) {
    this.store.set(roomId, {
      roomId,
      chats: []
    })
  }


  // Always remeber return null if any thing not found
  // last 50 chats => limit - 50 offset - 0
  // next 50 chats => limit - 50 offset - 50
  getChats({ roomId, limit, offset }: GetChatProps) {
    const room = this.store.get(roomId)

    if(!room) {
      return null
    }

    //Check this logic
    return room.chats.reverse().slice()
  }

  addChat({ roomId, userId, username, message }: AddChatProps) {
    const room = this.store.get(roomId)

    if(!room) {
      return null
    }

    const chat: Message = {
      id: uuidV4(),
      userId,
      username,
      text: message,
      upvote: [],
      downvote: []
    }

    room.chats.push(chat)

    return chat
  }

  upvote({ roomId, userId, chatId }: VoteProps) {
    const room = this.store.get(roomId) 

    if(!room) {
      return null
    }

     // TODO: Make this faster
     const chat = room.chats.find((chat) => chat.id === chatId)

     if(!chat) {
       return null
     }
 
     chat.upvote.push(userId)
 
     return chat
  }

  downvote({ roomId, userId, chatId }: VoteProps) {
    const room = this.store.get(roomId)

    if(!room) {
      return null;
    }

    // TODO: Make this faster
    const chat = room.chats.find((chat) => chat.id === chatId)

    if(!chat) {
      return null
    }

    chat.upvote.push(userId)

    return chat
  }
}
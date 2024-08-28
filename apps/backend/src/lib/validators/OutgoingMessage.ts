export enum OutgoingSupportedMessage {
  AddChat = "Add_Chat",
  UpvoteChat = "Upvote",
  DownvoteChat = "Downvote",
}

type MessagePayload = {
  roomId: string
  chatId: string
  username: string
  message: string
  upvotes: number
  downvotes: number
}

export type OutgoingMessage = {
  type: OutgoingSupportedMessage.AddChat,
  payload: MessagePayload,
} | {
  type: OutgoingSupportedMessage.UpvoteChat,
  payload: Partial<MessagePayload>
} | {
  type: OutgoingSupportedMessage.DownvoteChat,
  payload: Partial<MessagePayload>
}
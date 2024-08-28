import z from "zod";

export enum IncomingSupportedMessage {
  JoinRoom = "JOIN_ROOM",
  SendMessage = "SEND_MESSAGE",
  UpvoteMessage = "UPVOTE_MESSAGE",
  DownvoteMessage = "DOWNVOTE_MESSAGE"
}

export const InitMessage = z.object({
  username: z.string(),
  roomId: z.string(),
  userId: z.string()
})

export const UserMessage = z.object({
  username: z.string(),
  roomId: z.string(),
  userId: z.string(),
  message: z.string()
})

export const UpvoteMessage = z.object({
  userId: z.string(),
  roomId: z.string(),
  chatId: z.string()
})

export const DownvoteMessage = z.object({
  userId: z.string(),
  roomId: z.string(),
  chatId: z.string()
})

export type InitMessageType = z.infer<typeof InitMessage>
export type UserMessageType = z.infer<typeof UserMessage>
export type UpvoteMessageType = z.infer<typeof UpvoteMessage>
export type DownvoteMessageType = z.infer<typeof DownvoteMessage>

export type IncomingMessage = {
  type: IncomingSupportedMessage.JoinRoom,
  payload: InitMessageType,
} | {
  type: IncomingSupportedMessage.SendMessage,
  payload: UserMessageType
} | {
  type: IncomingSupportedMessage.UpvoteMessage,
  payload: UpvoteMessageType
} | {
  type: IncomingSupportedMessage.DownvoteMessage,
  payload: DownvoteMessageType
}
import { OutgoingMessage } from "./validators/OutgoingMessage";

interface User {
  id: string; // This should be unique
  username: string;
  socket: any;
}

interface Room {
  roomId: string;
  users: User[];
}

interface AddUserProps {
  roomId: string;
  userId: string;
  username: string;
  socket: any;
}

interface UpdateUserProps {
  roomId: string;
  userId: string;
  username?: string;
  socket?: any;
}

interface RemoveUserProps {
  roomId: string;
  userId: string;
}

interface GetUserProps {
  roomId: string;
  userId: string;
}

interface BroadcastProps {
  roomId: string;
  userId: string;
  message: OutgoingMessage;
}

export class UserManager {
  private rooms: Map<string, Room>;

  constructor() {
    this.rooms = new Map<string, Room>()
  }

  addUser({ roomId, userId, username, socket }: AddUserProps) {
    const room = this.rooms.get(roomId);

    // If room not found
    if (!room) {
      this.rooms.set(roomId, {
        roomId,
        users: [
          {
            id: userId,
            username,
            socket,
          },
        ],
      });

      return;
    }

    this.rooms.get(roomId)?.users.push({
      id: userId,
      username,
      socket,
    });

    return;
  }

  updateUser({ roomId, userId, socket }: UpdateUserProps) {
    const user = this.rooms.get(roomId)?.users.find(({ id }) => id === userId)

    if(!user) {
      return null;
    }

    // Update the socket variable
    this.rooms.get(roomId)?.users.forEach((user) => {
      if (user.id === userId) {
        user.socket = socket;
      }
    });
  }

  removeUser({ roomId, userId }: RemoveUserProps) {
    const users = this.rooms.get(roomId)?.users

    if(!users) {
      return null
    }

    users.filter(({ id }) => id !== userId);
  }

  getUser({ roomId, userId }: GetUserProps) {
    const user = this.rooms.get(roomId)?.users.find(({ id }) => id === userId);

    if (!user) {
      return null;
    }

    return user;
  }

  broadcast({ roomId, userId, message }: BroadcastProps) {
    const user = this.getUser({ roomId, userId });

    if (!user) {
      console.error("user not found");
      return;
    }

    const room = this.rooms.get(roomId);

    if (!room) {
      return null;
    }

    // Broadcasting this message to everyone
    room.users.forEach(({ socket, id }) => {
      if (id !== userId) {
        socket.send(JSON.stringify(message));
      }
    });
  }
}
TODO: Make a full flegit chat application using ws library which has group chat one-one chat.


?? use of this symbol

if you want to delete specific files ending with .js
rm src/*.js

Watch how harkirat solves this error 
1: 24: 32 seconds

const contacts = new Map()
contacts.get("")
contacts.set("") // Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
contacts.has("")
contacts.delete("")


WebSocket 
1. Harkirat cohort 2.0 video
2. Harkirat cohort 1.0 video
3. Notion Docs
4. Code - folder - websocket, reatime-chat-harkirat, scaleable-chat-piyush, 


Once revisit Zod video from Josh.


Always remeber return null if any thing not found
Always remeber what to return in backend routes when something not found  string any thing else.


1. There is one problem with websockets when user1 connect to websocket a new ws variable is assign to it. When user2 connects a new ws variable also get assign to it.

user1 -> ws1
user2 -> ws2

and we store these variables with userId ans ws in DB.

if user1 gets disconnected and he reconnects then again a new ws variable will be assign to it. But the problem is that now user2 cannot send message to user1 because it variable gets changed. user2 will send message that will be send via old variable that is stored in DB. So it will not reach to the user1.

Ans:- So the solution for it is you update the ws variable every time user reconnects.



2. Through room logic you can build one-one chat, group chat. 
One-one chat - Create a room with roomId and in this room only two user should remain. You have to send this message to all users.
group chat - The room contains all the users. You have to send this message to all users inside that room.


when you send data from client always mention binary: false otherwise it will send in binary format

git commit --date="YYYY-MM-DD HH:MM:SS" -m "Your commit message"

Make a live cursor project by ably


export PORT=3000 && npm run dev
export DATABASE_URL="prostgres://aviven.io" ---> This is the way to inject .env variables in nodejs application.

If you want to run two commands one after the another then use && ----> npm run build && node dist/index.js

Learn about it.
PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

Learn Best Practices to write commit message.


1. Frontend ws socket - Done
2. Improve and optimize the logic when when user connects to ws - Done
3. Redis, Queues
4. Piyush simple chat logic - Done
5. Leetcode redis-queue workers logic
6. Wrap up all things you learn from websockets.
7. Go through the readme and note all the extra things which you have learned.
. Scalable chat using pub sub - harkirat
8. Write down syntax of everything you study like React, react-router-dom, next.js hooks, useNavigation, useRouter etc.


Docker - vercel
turbo repo - paytm
singleton pattern - pubsub
frontend 
  React, Next.js Tailwind, Zod, Zustand, Reactquery, hookform, Shadcn, AceternityUI, typescript, linux, git, Prisma, 




BULDING SLACK CLONE on your own
TODO -
1. Add one to one chat
2. Add group chat, Admin control
3. Add Image or file upload in the chat
4. Add Authentication
5. Add DP for each profile
6. Add End to End Encryptions
7. Add private rooms
8. Add Invite through unique url
9. Send Invite link through Email.
10. Add push notification
11. Add Channel
12. Private Channel where user can join this via unique link, Which automatically expires when person joins.

TECHNOLOGIES -
1. Zod, React-Hook Form
2. Zustand
3. Redis, Pub-Sub
4. Prisma, Postgres
5. NextAuth - Github Provider, Google Provider, Email, Password, ecryption algorithms using panora
6. Next.js - Frontend, Frontend-Caching using next.js
7. Node.js - Backend
8. WebSockects
9. TypeScript
10. TurboRepo
11. ShadCn-ui
12. Docker
13. Singleton Pattern
14. Git, Github
15. AWS S3 for fileUploads
16. Rate Limiting
17. Vertical and Horizontal Scaling node.js
18. Ngrok
19. Nginx
20. EC2 for deployment

Addintional Functionality
1. Error Handling
2. NPM VS BUN VS YARN
3. Internals of Prisma - Mehul, josh video
4. Server Actions, Next Middleware
5. Edge Runtime vs node runtime, bun runtime.
6. Honojs, serverless, Connections Pooling
7. AWS lamda, IAM
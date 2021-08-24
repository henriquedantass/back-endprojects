import { io } from '../http'
import { ConnectionService } from '../services/ConnectionsService'
import { MessagesService } from '../services/MessegesServices';
import { UsersService } from '../services/UsersService'

io.on("connect",  (socket) => {
  const connectionService = new ConnectionService;
  const userService = new UsersService;
  const messagesService = new MessagesService();

  socket.on("client_first_acess", async (params) => {
    const socket_id = socket.id;
    const {text, email} = params;
    let user_id = null;

    const userExist = await userService.findByEmail(email);

    if (!userExist) {

       const user = await userService.create(email);  

       await connectionService.create({
        socket_id,
        user_id: user.id,
      }) 

      user_id = user.id
    } else {
      user_id = userExist.id
      const connection = await connectionService.findByUserId(userExist.id);

      if(!connection) {
        await connectionService.create({
          socket_id,
          user_id: userExist.id
        }) 

      } else {
        connection.socket_id = socket_id;
        await connectionService.create(connection)
      }
    }
    await messagesService.create({
      text,
      user_id
    })

    const allMessages = await messagesService.listByUser(user_id);
  
    socket.emit("list_all_messages_user", allMessages);
     
  })

  socket.on("client_send_to_admin", async (params) => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;

    const { user_id } = await connectionService.findBySocketId(socket_id);

    const message = await messagesService.create({
      text,
      user_id,
    });

    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id,
    });

    // Melhorias
  });

})
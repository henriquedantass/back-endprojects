import { io } from '../http'
import { ConnectionService } from '../services/ConnectionsService'
import { UsersService } from '../services/UsersService'

io.on("connect",  (socket) => {
  const connectionService = new ConnectionService;
  const userService = new UsersService;

  socket.on("client_first_acess", async (params) => {
    const socket_id = socket.id;
    const {text, email} = params;

    const userExist = await userService.findByEmail(email);

    if (!userExist) {

       const user = await userService.create(email);  

       await connectionService.create({
        socket_id,
        user_id: user.id,
      }) 

    } else {

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

    //Salvar a conexao com o socket_id, user_id;
    
  })
})
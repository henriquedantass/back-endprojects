import { io } from '../http'


io.on("connect", (socket) => {
  socket.on("client_first_acess", params => {
    console.log(params)

    //Salvar a conexao com o socket_id, user_id;
    
  })
})
const socket = io();
let connectionsUser = [];

socket.on("admin_list_all_users", (connections) => {

  connectionsUser = connections;

  document.getElementById("list_users").innerHTML = "";

  let template = document.getElementById("template").innerHTML;

  connections.forEach((connection) => {

    const rendered = Mustache.render(template , {
      email: connection.user.email,
      id: connection.socket_id,
    })

    document.getElementById("list_users").innerHTML += rendered

  });
})

function call(id ) {

  const connection = connectionsUser.find( connection => 
    connection.socket_id === id
  );

  const template = document.getElementById("admin_template").innerHTML;

  const rendered = Mustache.render( template, { 
    email: connection.user.email,
    id: connection.user.id,
  });

  document.getElementById("supports").innerHTML += rendered

  const params = {
    user_id: connection.user.id,
  }

  socket.emit("admin_list_messages_by_user", params , messages => {
    console.log(messages)
  })

}
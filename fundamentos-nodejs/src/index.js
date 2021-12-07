// importação do express para iniciar o servidor
const express = require("express");

const app = express();

app.get("/", (request, response) => {
  return response.send("Hello World With Nodemon");
});

// A aplicação necessita de uma porta para ser ouvida
app.listen(3333);

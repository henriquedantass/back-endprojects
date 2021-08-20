import express from 'express';
import { routes } from "./routes";
import { createServer } from 'http'
import { Server, Socket } from 'socket.io';
import path from 'path';

import "./database";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");



app.get("/pages/client", (request, response) => {
  return response.render("html/client.html");
})

const http = createServer(app); // criando pprotocolo http
const io = new Server(http); // criando protocolo ws(web socket)

io.on("connection", (socket: Socket) => {
  console.log("Se connectou" , socket.id)
})

app.use(express.json());

app.use(routes)


http.listen(3333, () => {console.log('Server is running on port 3333')})
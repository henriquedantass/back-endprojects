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

app.get("/pages/admin", (request, response) => {
  return response.render("html/admin.html");
})

const http = createServer(app); // criando pprotocolo http
const io = new Server(http); // criando protocolo ws(web socket)

io.on("connection", (socket: Socket) => {
})

app.use(express.json());

app.use(routes)

export {http , io};
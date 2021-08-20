import express from 'express';
import { routes } from "./routes";
import { createServer } from 'http'
import { Server, Socket } from 'socket.io';

import "./database";

const app = express();

const http = createServer(app); // criando pprotocolo http
const io = new Server(http); // criando protocolo ws(web socket)


app.use(express.json());

app.use(routes)


app.listen(3333, () => {console.log('Server is running on port 3333')})
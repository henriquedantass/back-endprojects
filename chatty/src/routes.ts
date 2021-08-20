import { Router } from 'express'
import { MessagesController } from './controllers/MessagesController';
import { SettingsControllers } from './controllers/SettingsControllers'
import { UsersController } from './controllers/UsersController';


const routes = Router();
const usersControllers = new UsersController();
const settingsControllers = new SettingsControllers();
const messagesControllers = new MessagesController();


routes.post("/users", usersControllers.create);

//settings
routes.post("/settings" , settingsControllers.create);
routes.get("/settings/:username" , settingsControllers.findByUsername);
routes.put("/settings/:username" , settingsControllers.update);



// messages
routes.post("/messages", messagesControllers.create);
routes.get("/messages/:id", messagesControllers.showByUser);


export { routes } 
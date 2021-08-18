import { Router } from 'express'
import { SettingsControllers } from './controllers/SettingsControllers'
import { UsersController } from './controllers/UsersController';


const routes = Router();
const usersControllers = new UsersController();
const settingsControllers = new SettingsControllers();

routes.post("/users", usersControllers.create);
routes.post("/settings" , settingsControllers.create);


export { routes }
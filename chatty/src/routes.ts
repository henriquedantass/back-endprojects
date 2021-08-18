import { Router } from 'express'
import { SettingsControllers } from './controllers/SettingsControllers'
const routes = Router();

/**
 * GET = Buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Deletar
 * PATCH = Alterar uma informação específica
 */

/**
 * Tipos de parametros
 * Routes Paramns => Parametros de rotas (http:localhost:3333/settings/1)
 * Query Paramns => Filtros e buscas (http:localhost:3333/settings/1?search=algumacoisa)
 * Body Paramns =>  { ... }
 */

const settingsControllers = new SettingsControllers();

routes.post("/settings" , settingsControllers.create)


export { routes }
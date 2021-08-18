import { Router } from 'express'
import { getCustomRepository } from 'typeorm';
import { SettingsRepositorie } from './repositories/SettingsRepositorie';

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

routes.post("/settings" , async (req, res) => {
  const { chat, username} = req.body;

  const settingsRepository = getCustomRepository(SettingsRepositorie);

  const settings = settingsRepository.create({
    chat,
    username,
  })

  await settingsRepository.save(settings);

  return res.json(settings)

})


export { routes }
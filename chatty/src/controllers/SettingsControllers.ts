import {Request, Response} from 'express'
import { getCustomRepository } from 'typeorm';
import { SettingsRepositorie } from '../repositories/SettingsRepositorie';


class SettingsControllers { 
  async create(req: Request, res: Response){

    const { chat, username} = req.body;

    const settingsRepository = getCustomRepository(SettingsRepositorie);
  
    const settings = settingsRepository.create({
      chat,
      username,
    })
  
    await settingsRepository.save(settings);
  
    return res.json(settings)

  }
}


export {SettingsControllers}
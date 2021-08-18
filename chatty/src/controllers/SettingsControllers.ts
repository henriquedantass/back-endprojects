import {Request, Response} from 'express'
import { SettingsServices } from '../services/SettingsServices';


class SettingsControllers { 
  async create(req: Request, res: Response){

    const { chat, username} = req.body;

    const settingsService = new SettingsServices();

    const settings = await settingsService.create({chat, username});
  
    return res.json(settings)

  }
}


export {SettingsControllers}
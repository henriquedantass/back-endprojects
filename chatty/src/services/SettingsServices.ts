import { getCustomRepository } from "typeorm";
import { SettingsRepositoriy } from "../repositories/SettingsRepositorie";

interface ISettingsServices {
  chat: boolean;
  username: string;
}


class SettingsServices {

  async create({chat, username}: ISettingsServices){

    const settingsRepository = getCustomRepository(SettingsRepositoriy);
  
    const userAlreadyExists = await settingsRepository.findOne({
      username,
    })

    if(userAlreadyExists) {
      throw new Error('User already exists!')
    }

    const settings = settingsRepository.create({
      chat,
      username,
    })
  
    await settingsRepository.save(settings);

    return settings
  }
}


export { SettingsServices }
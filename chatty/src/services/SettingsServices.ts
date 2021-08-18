import { getCustomRepository } from "typeorm";
import { SettingsRepositorie } from "../repositories/SettingsRepositorie";

interface ISettingsServices {
  chat: boolean;
  username: string;
}


class SettingsServices {

  async create({chat, username}: ISettingsServices){

    const settingsRepository = getCustomRepository(SettingsRepositorie);
  
    const settings = settingsRepository.create({
      chat,
      username,
    })
  
    await settingsRepository.save(settings);
  }
}


export { SettingsServices }
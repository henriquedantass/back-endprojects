import { getCustomRepository, Repository } from "typeorm";
import { Settings } from "../entities/Settings";
import { SettingsRepositoriy } from "../repositories/SettingsRepositorie";

interface ISettingsServices {
  chat: boolean;
  username: string;
}


class SettingsService {
  private settingsRepository: Repository<Settings>;

  constructor () {
    this.settingsRepository = getCustomRepository(SettingsRepositoriy);
  
  }

  async create({chat, username}: ISettingsServices){

  
    const userAlreadyExists = await this.settingsRepository.findOne({
      username,
    })

    if(userAlreadyExists) {
      throw new Error('User already exists!')
    }

    const settings = this.settingsRepository.create({
      chat,
      username,
    })
  
    await this.settingsRepository.save(settings);

    return settings
  }
}


export { SettingsService }
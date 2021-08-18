import { EntityRepository, Repository } from "typeorm";
import { Settings } from "../entities/Settings";

@EntityRepository(Settings)
class SettingsRepositorie extends Repository<Settings> {

}


export { SettingsRepositorie }
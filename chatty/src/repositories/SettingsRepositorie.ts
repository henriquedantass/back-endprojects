import { EntityRepository, Repository } from "typeorm";
import { Settings } from "../entities/Settings";

@EntityRepository(Settings)
class SettingsRepositoriy extends Repository<Settings> {

}

export { SettingsRepositoriy }
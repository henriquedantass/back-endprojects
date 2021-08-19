import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/Users";
import { UsersRepository } from "../repositories/UsersRepositorie";


class UsersService {
  private usersRepository: Repository<User>;
  constructor () {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email:string) {

    //verificar se o usuario existe

    const alreadyExistUser = await this.usersRepository.findOne({
      email,
    })

    //se existir, retornar o user

    if(alreadyExistUser) {
      return alreadyExistUser
    }

    //se não existir eu devo criar e salvar no DB

    const user = this.usersRepository.create({
      email,
    })

    await this.usersRepository.save(user)

    return user
  }

}

export {UsersService}
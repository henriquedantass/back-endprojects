import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepositorie";


class UsersService {
  async create(email:string) {
    const usersRepository = getCustomRepository(UsersRepository);

    //verificar se o usuario existe

    const alreadyExistUser = await usersRepository.findOne({
      email,
    })

    //se existir, retornar o user

    if(alreadyExistUser) {
      return alreadyExistUser
    }

    //se não existir eu devo criar e salvar no DB

    const user = usersRepository.create({
      email,
    })

    await usersRepository.save(user)

    return user
  }

}

export {UsersService}
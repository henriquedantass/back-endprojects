import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionRepository } from '../repositories/ConnectionRepositorie'

interface IConnectionRepository {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}


export class ConnectionService {
  private connectionRepository: Repository<Connection>;

  constructor () {
    this.connectionRepository =  getCustomRepository(ConnectionRepository)
  }


  async create({socket_id, user_id, admin_id, id}:IConnectionRepository ) {

    const connection = this.connectionRepository.create({
      socket_id,
      user_id,
      admin_id,
      id
    })

    await this.connectionRepository.save(connection)

    return
  }


}
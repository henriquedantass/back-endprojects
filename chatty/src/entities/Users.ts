import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

import { v4 as uuid } from 'uuid'

@Entity("users")
class User {

  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  // um construtor é sempre chamado quando instanciamos algo com new()
  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }

}

export { User }
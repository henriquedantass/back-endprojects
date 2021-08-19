import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, } from "typeorm";
import {User} from './Users'
import { v4 as uuid} from "uuid";

@Entity("messages")
class Messages {

  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;
  
  @JoinColumn({name: "user_id"})
  @ManyToOne(() => User)
  user: User;

  @Column()
  user_id: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;


  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }

}

export {Messages}